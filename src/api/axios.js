import axios from 'axios';
import { showToast } from '../utils/toast';
import { getUserPermissions, clearUserPermissions } from './permissions';

// 创建 Axios 实例
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/', // 使用 import.meta.env 读取环境变量
  timeout: 10000,
});

// 缓存用户权限
let userPermissions = [];

// 获取用户权限并缓存
const fetchUserPermissions = async () => {
  try {
    userPermissions = await getUserPermissions();
  } catch (error) {
    console.error('Failed to fetch user permissions:', error);
  }
};

// 统一处理错误响应
const handleErrorResponse = (error) => {
  console.log('Error:', error.message);
  if (error.response) {
    if (error.response.data !== undefined) {
      console.error('Response error:', error.response.data.message);
      showToast(`Error: ${error.response.data.message || 'Request failed'}`);
    } else {
      console.error('Response error:', error.message);
      showToast(`Error: ${error.message || 'Request failed'}`);
    }

    // 如果错误码是 401（未授权），抛出特定错误
    if (error.response.status === 401) {
      clearUserPermissions(); // 清除权限缓存
      error.message = 'Unauthorized';
    }
  } else if (error.request) {
    // 请求已发出但没有收到响应
    console.error('No response:', error.request);
    showToast('Error: No response from server');
  } else {
    // 在设置请求时触发错误
    console.error('Request error:', error.message);
    showToast(`Error: ${error.message}`);
  }
  return Promise.reject(error);
};

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    const url = config.url.startsWith('/') ? config.url : `/${config.url}`;

    console.log('Checking permission for:', url);
    // 排除对 /api/permissions、/api/routes 请求的权限检查
    if (
      url !== '/api/permissions' && 
      url != '/api/routes' &&
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

// 初始化时获取用户权限
fetchUserPermissions();
