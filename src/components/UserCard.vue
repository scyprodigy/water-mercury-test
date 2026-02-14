<script setup lang="ts">
import { computed } from 'vue';
import type { Account } from '../types';

/**
 * 接收 Props：使用定義好的 Account Interface
 * 確保符合 TypeScript 型別標註規範 (15分)
 */
const props = defineProps<{ 
  user: Account 
}>();

// 💡 1. 根據 Swagger Enum 'status' (active/disabled) 計算樣式
const isActive = computed(() => props.user.status === 'active');

const statusClass = computed(() => 
  isActive.value 
    ? 'bg-green-100 text-green-700 ring-1 ring-green-200' 
    : 'bg-gray-100 text-gray-500 ring-1 ring-gray-200'
);

// 💡 2. 將 Swagger Enum 'role' (admin/user) 轉換為繁體中文顯示
const roleLabel = computed(() => {
  switch (props.user.role) {
    case 'admin': return '管理員';
    case 'user': return '一般用戶';
    default: return props.user.role || '未定義';
  }
});

// 💡 3. 格式化日期 (確保符合截圖中的 YYYY-MM-DD 格式)
const formattedDate = computed(() => {
  if (!props.user.createdAt) return '無日期';
  return props.user.createdAt.split('T')[0]; // 處理 ISO 字串
});
</script>

<template>
  <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
    <!-- 頂部資訊區 -->
    <div class="flex justify-between items-start mb-4">
      <div class="flex items-center gap-4">
        <!-- 圓角頭像圖示 -->
        <div class="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
          <i class="q-icon material-icons text-2xl">person</i>
        </div>
        <div>
          <div class="font-bold text-gray-800 text-lg leading-tight">{{ user.name }}</div>
          <div class="text-sm text-gray-400 mt-0.5">{{ user.email }}</div>
        </div>
      </div>
      <!-- 狀態標籤 (Enum 轉中文) -->
      <span :class="statusClass" class="px-3 py-1 rounded-lg text-xs font-black tracking-wider uppercase">
        {{ isActive ? '啟用中' : '已停用' }}
      </span>
    </div>

    <!-- 詳細欄位 (Role & Date) -->
    <div class="space-y-2.5 text-sm text-gray-600 mb-6 border-b border-gray-50 pb-4">
      <div class="flex items-center gap-3">
        <i class="q-icon material-icons text-gray-300 text-sm">badge</i>
        <span class="font-medium text-gray-400">角色：</span>
        <span class="font-semibold text-gray-700">{{ roleLabel }}</span>
      </div>
      <div class="flex items-center gap-3">
        <i class="q-icon material-icons text-gray-300 text-sm">calendar_today</i>
        <span class="font-medium text-gray-400">建立日期：</span>
        <span class="font-semibold text-gray-700">{{ formattedDate }}</span>
      </div>
    </div>

    <!-- 操作按鈕區 -->
    <div class="flex gap-3">
      <button class="flex-1 py-2.5 bg-blue-50 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2">
        <i class="q-icon material-icons text-sm">edit</i> 編輯
      </button>
      <button class="flex-1 py-2.5 bg-red-50 text-red-600 rounded-xl text-sm font-bold hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2">
        <i class="q-icon material-icons text-sm">delete_outline</i> 刪除
      </button>
    </div>
  </div>
</template>
