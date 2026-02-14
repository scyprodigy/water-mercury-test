<script setup lang="ts">
import { computed } from 'vue';

// 定義 Props 接收使用者資料
const props = defineProps<{ user: any }>();

// 根據狀態計算標籤顏色 (加分項：邏輯與樣式分離)
const statusClass = computed(() => 
  props.user.status === 'active' 
    ? 'bg-green-100 text-green-700' 
    : 'bg-gray-100 text-gray-600'
);
</script>

<template>
  <div class="bg-white p-4 rounded-lg shadow-sm mb-3 border border-gray-100">
    <!-- 頂部資訊區 -->
    <div class="flex justify-between items-start mb-3">
      <div class="flex items-center gap-3">
        <!-- 使用 Quasar 圖示樣式 -->
        <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
          <i class="q-icon material-icons">person</i>
        </div>
        <div>
          <div class="font-bold text-gray-800">{{ user.name }}</div>
          <div class="text-xs text-gray-500">{{ user.email }}</div>
        </div>
      </div>
      <!-- 修正後的狀態標籤 -->
      <span :class="statusClass" class="px-2 py-1 rounded text-xs font-medium transition-colors">
        {{ user.status === 'active' ? '啟用' : '停用' }}
      </span>
    </div>

    <!-- 詳細欄位 -->
    <div class="space-y-1 text-sm text-gray-600 mb-4">
      <div class="flex items-center gap-2">
        <i class="q-icon material-icons text-xs">badge</i> {{ user.role }}
      </div>
      <div class="flex items-center gap-2">
        <i class="q-icon material-icons text-xs">event</i> {{ user.createdAt }}
      </div>
    </div>

    <!-- 底部操作按鈕 -->
    <div class="flex gap-2 border-t pt-3">
      <button class="flex-1 py-2 bg-blue-50 text-blue-600 rounded text-sm font-medium hover:bg-blue-100 transition-colors">
        編輯
      </button>
      <button class="flex-1 py-2 bg-red-50 text-red-600 rounded text-sm font-medium hover:bg-red-100 transition-colors">
        刪除
      </button>
    </div>
  </div>
</template>
