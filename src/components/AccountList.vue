<script setup lang="ts">
import UserCard from './UserCard.vue';
defineProps<{ accounts: any[], stats: any, isLoading: boolean }>();
</script>

<template>
  <div>
    <!-- 統計卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div v-for="(val, label) in stats" :key="label" class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div class="text-xs text-gray-400 font-bold uppercase mb-2">{{ label }}</div>
        <div class="text-4xl font-black text-gray-800">{{ val }}</div>
      </div>
    </div>

    <!-- 列表展示 -->
    <div v-if="isLoading" class="text-center py-20 animate-pulse text-gray-400">連線中...</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UserCard v-for="user in accounts" :key="user.id" :user="user" />
    </div>
  </div>
</template>
