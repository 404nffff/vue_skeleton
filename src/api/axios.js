import axios from 'axios';
import { showToast } from '@/plugins/ToastPlugin'; // 确保路径正确
import { clearUserPermissions } from './permissions';
import router from '../router'; // 导入路由实例

// 创建 Axios 实例
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/', // 使用 import.meta.env 读取环境变量
  timeout: 10000,
});

// 从环境变量中读取权限配置
const PERMISSIONS = import.meta.env.VITE_IGNORE_PERMISSIONS.split(',') || [];

console.log('PERMISSIONS:', PERMISSIONS);

// 统一处理错误响应
const handleErrorResponse = (error) => {
  console.log('Error:', error.message);
  if (error.response) {
    if (error.response.data !== undefined) {
      //console.error('Response error:', error.response.data.message);
      showToast({ type: 'error', message: `Error: ${error.response.data.message || 'Request failed'}` });
    } else {
      //console.error('Response error:', error.message);
      showToast({ type: 'error', message: `Error: ${error.message || 'Request failed'}` });
    }

    // 如果错误码是 401（未授权），抛出特定错误
    if (error.response.status === 401) {
      clearUserPermissions(); // 清除权限缓存
      router.push('/login'); // 跳转到登录页面
    }
  } else if (error.request) {
    // 请求已发出但没有收到响应
    //console.error('No response:', error.request);
    showToast({ type: 'error', message: 'Error: No response from server' });
  } else {
    // 在设置请求时触发错误
    //console.error('Request error:', error.message);
    showToast({ type: 'error', message: `Error: ${error.message}` });
  }
  return Promise.reject(error);
};

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    const url = config.url.startsWith('/') ? config.url : `/${config.url}`;
    const userPermissions = JSON.parse(sessionStorage.getItem('user_permissions')) || [];
    // 排除对 /api/permissions 请求的权限检查
    if (
      !PERMISSIONS.includes(url) &&
      !userPermissions.includes(url)) {
      return Promise.reject(new Error('Permission denied'));
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => handleErrorResponse(error)
);

// 封装 GET 请求
export const get = (url, params = {}) => {
  return axiosInstance.get(url, { params })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

// 封装 POST 请求
export const post = (url, data = {}) => {
  return axiosInstance.post(url, data)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export default axiosInstance;
