import axios from 'axios';

const request = axios.create({
  baseURL: 'https://api-frontend-interview-server.metcfire.com.tw',
  headers: {
    // 💡 確保這裡沒有拼錯，且這行一定要在 headers 裡面
    'interviewerName': 'hanhsunlin', 
    'Content-Type': 'application/json'
  }
});

// 攔截器保持原樣
request.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default request;
