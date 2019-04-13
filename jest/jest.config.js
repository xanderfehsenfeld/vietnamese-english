module.exports = {
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    transformIgnorePatterns: [
        'node_modules/(?!react-native|my-linked-module)/',
    ],
    transform: {
        '\\.(ts|tsx)$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js|jsx)$',
    testPathIgnorePatterns: ['\\.snap$', '<rootDir>/node_modules/'],
    cacheDirectory: './jest/.jest/cache',
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!**/*styles.ts',
        '!**/node_modules/**',
        '!**/coverage/**',
        '!**/jest/**',
        '!rn-cli.config.js',
        '!**/*.d.ts',
        '!*.js',
    ],
    rootDir: '..',
    testURL: 'http://localhost/',
}
