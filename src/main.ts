import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'

// 💡 引入路由配置
import router from "./router";

// 💡 必須引入 Quasar 的核心樣式與圖標，否則組件會沒樣式
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

// 💡 引入 Tailwind 與自定義樣式
import './style.css'

import App from './App.vue'

const app = createApp(App)

// 1. 使用 Pinia 狀態管理
app.use(createPinia())

// 2. 使用 Vue Router 路由系統 (這是切換 LoginPage 與 Dashboard 的關鍵)
app.use(router)

// 3. 使用 Quasar 框架並設定品牌色
app.use(Quasar, {
  plugins: {}, 
  config: {
    brand: {
      primary: '#6366F1', // 設定與設計稿一致的紫色主色
    }
  }
})

// 4. 掛載到 DOM
app.mount('#app')
