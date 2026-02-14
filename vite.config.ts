import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import { fileURLToPath, URL } from 'node:url'
// 💡 修改這行引入，使用 v4 專用的 postcss 插件
import tailwindcss from '@tailwindcss/postcss' 
import autoprefixer from 'autoprefixer'

export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    quasar({
      importStrategy: 'auto',
      components: [
        'QAvatar', 'QBadge', 'QBtn', 'QCard', 'QCardSection', 'QCardActions', 
        'QDialog', 'QDrawer', 'QHeader', 'QIcon', 'QInput', 'QItem', 
        'QItemSection', 'QItemLabel', 'QLayout', 'QPageContainer', 'QPage', 
        'QScrollArea', 'QSeparator', 'QSpace', 'QToolbar', 'QToolbarTitle', 
        'QTable', 'QTh', 'QTr', 'QTd'
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '#': fileURLToPath(new URL('./src/assets', import.meta.url))
    }
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss(), // 💡 這裡已經修正為調用 v4 插件
        autoprefixer(),
      ]
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
