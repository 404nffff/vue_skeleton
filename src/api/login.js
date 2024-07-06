import { post } from './axios';
import Cookies from 'js-cookie';

// 登录函数
export const login = (username, password) => {

    let params = {
        data: {
            username: username,
            password: password
        },
        success: (data) => {
            console.log('Login success:', data);
        },
        error: (error) => {
            console.error('Login error:', error);
        }
    }

    post('/api/login', params);
    // 设置 JWT token 到 cookie 中
    Cookies.set('jwt-token', response.token, { expires: 1 }); // token 有效期为 1 天
};

// 检查是否已登录
export const isLoggedIn = () => {
  return !!Cookies.get('jwt-token');
};

// 登出函数
export const logout = () => {
  Cookies.remove('jwt-token');
};
