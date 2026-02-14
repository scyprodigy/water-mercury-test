<script setup lang="ts">
import { computed } from 'vue';

// 接收外部傳入的帳號資料
const props = defineProps<{ accounts: any[] }>();

// 💡 邏輯：動態計算統計數值
const stats = computed(() => {
  const total = props.accounts.length;
  const active = props.accounts.filter((a: any) => a.status === 'active').length;
  const inactive = total - active;
  
  return [
    { label: '總帳號數', value: total },
    { label: '啟用中', value: active },
    { label: '已停用', value: inactive }
  ];
});
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
    <div 
      v-for="item in stats" 
      :key="item.label" 
      class="bg-white p-6 rounded-lg border border-gray-100 shadow-sm flex flex-col justify-between h-32"
    >
      <div class="text-sm text-gray-500 font-medium">{{ item.label }}</div>
      <div class="text-3xl font-bold text-gray-800">{{ item.value }}</div>
    </div>
  </div>
</template>
