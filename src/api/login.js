import { post } from './axios';
import Cookies from 'js-cookie';
import { showToast } from '../utils/toast';

// 登录函数
export const login = async (username, password) => {
  try {
    const response = await post('/api/login', { username, password });
    // 设置 JWT token 到 cookie 中
    Cookies.set('jwt-token', response.token, { expires: 1 }); // token 有效期为 1 天
    return response;
  } catch (error) {
    showToast(`Error: ${error.response?.data.message || 'Login failed'}`);
    throw error;
  }
};

// 检查是否已登录
export const isLoggedIn = () => {
  return !!Cookies.get('jwt-token');
};

// 登出函数
export const logout = () => {
  Cookies.remove('jwt-token');
};
