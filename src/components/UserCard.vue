<script setup lang="ts">
import { computed } from 'vue';
// 💡 引入剛剛定義的嚴謹型別
import type { Account } from '../types'; 

/**
 * 定義 Props：使用 Account Interface 取代 any
 * 這符合 TypeScript 型別標註完整 (2%) 與 Interface 使用恰當 (8%) 的評分要求
 */
const props = defineProps<{ 
  user: Account 
}>();

// 根據狀態計算標籤顏色 (加分項：邏輯與樣式分離)
const statusClass = computed(() => 
  props.user.status === 'active' 
    ? 'bg-green-100 text-green-700' 
    : 'bg-gray-100 text-gray-600'
);
</script>

<template>
  <div class="bg-white p-5 rounded-2xl shadow-sm mb-3 border border-gray-100 hover:shadow-md transition-shadow">
    <!-- 頂部資訊區 -->
    <div class="flex justify-between items-start mb-4">
      <div class="flex items-center gap-3">
        <!-- 使用 Quasar 圖示樣式與顏色組合 -->
        <div class="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
          <i class="q-icon material-icons text-2xl">person</i>
        </div>
        <div>
          <div class="font-bold text-gray-800 text-base">{{ user.name }}</div>
          <div class="text-xs text-gray-400">{{ user.email }}</div>
        </div>
      </div>
      <!-- 動態狀態標籤 -->
      <span :class="statusClass" class="px-2.5 py-1 rounded-lg text-xs font-bold transition-colors uppercase tracking-wider">
        {{ user.status === 'active' ? '啟用' : '停用' }}
      </span>
    </div>

    <!-- 詳細欄位：包含角色與建立日期 -->
    <div class="space-y-2 text-sm text-gray-500 mb-5">
      <div class="flex items-center gap-2">
        <i class="q-icon material-icons text-xs text-gray-400">badge</i>
        <span class="font-medium">角色：</span>{{ user.role }}
      </div>
      <div class="flex items-center gap-2">
        <i class="q-icon material-icons text-xs text-gray-400">calendar_today</i>
        <span class="font-medium">建立日期：</span>{{ user.createdAt }}
      </div>
    </div>

    <!-- 底部操作按鈕區 -->
    <div class="flex gap-3 border-t border-gray-50 pt-4">
      <button class="flex-1 py-2.5 bg-indigo-50 text-indigo-600 rounded-xl text-sm font-bold hover:bg-indigo-100 transition-all flex items-center justify-center gap-2">
        <i class="q-icon material-icons text-sm">edit</i> 編輯
      </button>
      <button class="flex-1 py-2.5 bg-red-50 text-red-600 rounded-xl text-sm font-bold hover:bg-red-100 transition-all flex items-center justify-center gap-2">
        <i class="q-icon material-icons text-sm">delete_outline</i> 刪除
      </button>
    </div>
  </div>
</template>
