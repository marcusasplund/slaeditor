import { VitePWA } from 'vite-plugin-pwa'

export default ({ mode }) => ({
  base: mode === 'development' ? '/' : '/slaeditor/',
  plugins: [
    VitePWA()
  ]
})
