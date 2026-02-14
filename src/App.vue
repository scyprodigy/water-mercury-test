<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <!-- 💡 核心功能：根據路由設定顯示對應的頁面 (Login 或 Dashboard) -->
  <RouterView />
</template>

<style>
/* 全域樣式設定 */
body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #f9fafb; /* 淺灰色底，符合設計稿規範 */
}

/* 確保全螢幕高度 */
#app {
  min-height: 100vh;
}
</style>
