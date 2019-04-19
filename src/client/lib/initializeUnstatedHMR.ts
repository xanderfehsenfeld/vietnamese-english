import HMR from 'unstated-hmr'

export default () => {
  if (process) {
    HMR.isEnabled = process && process.env.NODE_ENV !== 'production'
  }
}
