<script setup lang="ts">
import { defineModel } from 'vue'; // 使用加分項語法
const searchText = defineModel<string>();
const emit = defineEmits(['search', 'add']);
</script>

<template>
  <div class="flex flex-col md:flex-row gap-4 mb-6">
    <div class="relative flex-1 group">
      <i class="q-icon material-icons absolute left-4 top-3.5 text-gray-400 group-focus-within:text-indigo-500">search</i>
      <input 
        v-model="searchText"
        @input="emit('search')"
        type="text" 
        placeholder="搜尋帳號 (姓名、郵件、角色)..." 
        class="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
      />
    </div>
    <button 
      @click="emit('add')"
      class="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95"
    >
      <i class="q-icon material-icons">add</i> 新增帳號
    </button>
  </div>
</template>
