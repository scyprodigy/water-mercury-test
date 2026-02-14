<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { debounce } from 'lodash-es';
import request from '@/api/request';
import UserCard from '@/components/UserCard.vue';

// 1. 響應式資料
const accounts = ref<any[]>([]);
const searchText = ref('');
const isLoading = ref(false);

// 2. 統計數據計算 (精準對應截圖中的：總帳號數、啟用中、已停用)
const stats = computed(() => {
  const total = accounts.value.length;
  const active = accounts.value.filter(a => a.status === 'active').length;
  const inactive = total - active;
  return { total, active, inactive };
});

// 3. API 串接邏輯 (串接正確端點 /accounts)
const fetchAccounts = async (query = '') => {
  isLoading.value = true;
  try {
    const res = await request.get('/accounts', {
      params: { name: query }
    });

    // 💡 關鍵動作：在 Console 印出原始資料
    console.log('--- API 回傳原始資料 ---');
    console.log(res); 
    console.log('-----------------------');

    // 根據回傳結構自動解析 (通常 Axios 會把資料放在 res.data)
    const data = res.data || res; 
    accounts.value = Array.isArray(data) ? data : (data.items || []);
    
  } catch (err) {
    console.error('API 請求失敗，請檢查 Network 面板', err);
  } finally {
    isLoading.value = false;
  }
};


// 4. 加分項：搜尋防抖 (500ms)
const handleSearch = debounce(() => {
  fetchAccounts(searchText.value);
}, 500);

onMounted(fetchAccounts);
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-10 px-6">
    <div class="max-w-6xl mx-auto">
      
      <!-- 第一區：Header (頂部標題) -->
      <div class="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <i class="q-icon material-icons text-2xl">people</i>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-800">帳號管理系統</h1>
            <p class="text-gray-400 text-sm font-medium">管理您的所有帳號與權限</p>
          </div>
        </div>
        <button class="text-gray-400 hover:text-indigo-600 font-bold transition-all flex items-center gap-2">
          <i class="q-icon material-icons">logout</i> 登出
        </button>
      </div>

      <!-- 第二區：功能列 (搜尋與新增) -->
      <div class="flex flex-col md:flex-row gap-4 mb-8">
        <div class="relative flex-1 group">
          <i class="q-icon material-icons absolute left-4 top-3.5 text-gray-400 group-focus-within:text-indigo-500">search</i>
          <input 
            v-model="searchText" 
            @input="handleSearch" 
            type="text" 
            placeholder="搜尋帳號 (姓名、郵件、角色)..." 
            class="w-full pl-12 pr-4 py-3.5 rounded-xl border-none shadow-sm ring-1 ring-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>
        <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-3.5 rounded-xl font-bold shadow-lg shadow-indigo-100 flex items-center gap-2 transition-all active:scale-95">
          <i class="q-icon material-icons">add</i> 新增帳號
        </button>
      </div>

      <!-- 第三區：統計卡片 (精準還原截圖樣式) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <!-- 總帳號數 -->
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div class="text-sm text-gray-400 font-bold mb-2">總帳號數</div>
          <div class="text-4xl font-black text-gray-800">{{ stats.total }}</div>
        </div>
        <!-- 啟用中 -->
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div class="text-sm text-gray-400 font-bold mb-2">啟用中</div>
          <div class="text-4xl font-black text-green-500">{{ stats.active }}</div>
        </div>
        <!-- 已停用 -->
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div class="text-sm text-gray-400 font-bold mb-2">已停用</div>
          <div class="text-4xl font-black text-red-400">{{ stats.inactive }}</div>
        </div>
      </div>

      <!-- 第四區：列表展示 (三欄式) -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
        <div class="animate-spin rounded-full h-10 w-10 border-4 border-indigo-500 border-t-transparent mb-4"></div>
        <p class="text-gray-400">API 連線中...</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UserCard v-for="user in accounts" :key="user.id" :user="user" />
      </div>
      
    </div>
  </div>
</template>
