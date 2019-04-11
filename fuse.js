const {
  FuseBox,
  Sparky,
  WebIndexPlugin,
  SassPlugin,
  CSSResourcePlugin,
  CSSPlugin,
  CSSModules,
  QuantumPlugin,
  JSONPlugin,
  EnvPlugin,
} = require('fuse-box')
const { context, task, src } = require('fuse-box/sparky')
const fs = require('fs')
const { definitions } = require('@vntk/dictionary')

const distFolderName = (isProduction) => {
  if (isProduction) {
    return 'dist-prod'
  }
  return 'dist-dev'
}

context(
  class {
    getConfigForServer() {
      return FuseBox.init({
        tsConfig: './tsconfig.json',
        homeDir: 'src/server/',
        output: `${distFolderName(this.isProduction)}/$name.js`,
        target: 'server@es7',
        plugins: [
          EnvPlugin({
            GOOGLE_CLOUD_PROJECT: 'vietnamese-english',
            NODE_ENV: this.isProduction ? 'production' : 'development',
          }),
          ['node_modules/**.json', JSONPlugin()],
        ],
      })
    }

    createBundleForServer(fuse, entry = 'app.ts') {
      const app = fuse.bundle('server/bundle')
      const vendor = fuse.bundle('server/vendor')
      app.instructions(`> [${entry}]`)
      vendor.instructions(`~ ${entry}`)

      if (!this.noWatch) {
        app.watch('src/**')
        vendor.watch()
      }

      if (!this.noServer) {
        app.completed((proc) => {
          proc.start()
        })
      }
    }
    getConfigForClient() {
      return FuseBox.init({
        log: {
          showBundledFiles: false,
          clearTerminalOnBundle: true,
        },
        homeDir: 'src/client',
        output: `${distFolderName(this.isProduction)}/client/$name.js`,
        target: 'browser@es5',
        sourceMaps: !this.isProduction,
        cache: true,
        useTypescriptCompiler: true,
        allowSyntheticDefaultImports: true,
        plugins: [
          EnvPlugin({
            NODE_ENV: this.isProduction ? 'production' : 'development',
          }),
          cssModulesHandler,
          sassHandler,
          cssHandler,
          nodeModulesCSSHandler,
          JSONPlugin(),
          WebIndexPlugin({
            template: 'src/client/index.html',
            path: '.',
          }),
          this.isProduction &&
            QuantumPlugin({
              bakeApiIntoBundle: true,
              manifest: true,
              uglify: true,
              minify: true,
              treeshake: true,
              extendServerImport: true,
              ensureES5: true,
              replaceProcessEnv: true,
            }),
        ],
      })
    }

    createBundleForClient(fuse) {
      const entryName = 'index.tsx'
      fuse.bundle('vendor').instructions(`~ ${entryName}`)
      const app = fuse.bundle('app')
      if (!this.isProduction) {
        app.hmr()
        app.watch()
        app.sourceMaps(true)
        app.completed((proc) => {
          console.log('\x1b[36m%s\x1b[0m', 'client bundled')
          // run the type checking
          typeHelper.runSync()
        })
      } else {
        app.splitConfig({
          browser: '/',
        })
      }
      app.instructions(`> [${entryName}]`)
    }
  },
)

task('set-prod-env', (context) => {
  context.noServer = true
  context.noWatch = true
  context.isProduction = true
})

task('build-server', ['set-prod-env'], async (context) => {
  const fuse = context.getConfigForServer()
  context.createBundleForServer(fuse)
  await fuse.run()
})

task('watch-server', async (context) => {
  const fuse = context.getConfigForServer()
  context.createBundleForServer(fuse)
  await fuse.run()
})

//react

const TypeHelper = require('fuse-box-typechecker').TypeHelper

const typeHelper = TypeHelper({
  tsConfig: './tsconfig.json',
  basePath: './',
  name: 'App typechecker',
})

const cssHandler = [CSSPlugin()]

const sassHandler = [
  SassPlugin({
    indentedSyntax: false,
    importer: true,
    sourceMap: !this.isProduction,
  }),
  ...cssHandler,
]

const cssModulesHandler = [
  /.+Styles.scss/,
  SassPlugin({
    indentedSyntax: false,
    importer: true,
    sourceMap: !this.isProduction,
  }),
  CSSModules(),
  ...cssHandler,
]

const nodeModulesCSSHandler = [
  /node_modules.*\.css$/,
  CSSResourcePlugin(),
  ...cssHandler,
]

task('clean', (context) =>
  src(distFolderName(context.isProduction))
    .clean(distFolderName(context.isProduction))
    .exec(),
)

task('copy:definitions', async (context) => {
  fs.writeFileSync('./definitions.json', JSON.stringify(definitions), 'utf-8')

  await src('definitions.json', { base: '/' })
    .dest(`${distFolderName(context.isProduction)}/client`)
    .exec()
})

task('copy:favicon', async (context) => {
  await src('favicon/*', { base: '/' })
    .dest(`${distFolderName(context.isProduction)}/client`)
    .exec()
})

task('copy-assets', ['&copy:favicon', '&copy:definitions'])

task('watch:html', (context) => {
  const fuse = context.getConfigForClient()
  return Sparky.watch(['src/client/index.html']).completed(() => {
    src('index.html', { base: './src/client/' })
      .dest(`${distFolderName(context.isProduction)}/client`)
      .exec()

    fuse.sendPageReload()
  })
})

task('watch-client', ['copy-assets', 'watch:html'], async (context) => {
  const fuse = context.getConfigForClient()
  fuse.dev({
    port: 4444,
  })
  context.createBundleForClient(fuse)
  await fuse.run()
})

task('build-client', ['set-prod-env', 'copy-assets'], async (context) => {
  const fuse = context.getConfigForClient()
  context.createBundleForClient(fuse)
  await fuse.run()
})

task('default', ['&watch-server', '&watch-client'])
task('build', ['clean', 'build-server', 'build-client'])
