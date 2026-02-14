// 定義帳號資料的嚴謹型別，符合 API 回傳結構與截圖需求
export interface Account {
  id: string | number;
  name: string;
  email: string;
  // 💡 確保 Enum 值與 Swagger 一致
  role: 'admin' | 'user' | string;   
  status: 'active' | 'disabled'; 
  createdAt: string;
}

// 定義 API 回傳的統一格式
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

// 定義統計數據的型別
export interface AccountStats {
  total: number;
  active: number;
  inactive: number;
}