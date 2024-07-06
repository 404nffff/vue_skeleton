import MockAdapter from 'axios-mock-adapter';
import axiosInstance from '../api/axios';
import routes from './routes.json';
import permissions from './permission.json';
import Cookies from 'js-cookie';

export const setupMock = () => {
  if (import.meta.env.USE_AXIOS_MOCK === 'true') {
    console.log('Mock enabled');
    const mock = new MockAdapter(axiosInstance, { delayResponse: 500 });

    // 模拟 GET /api/routes 请求
    mock.onGet('/api/routes').reply(200, routes);

    // 模拟成功请求
    mock.onGet('/api/success').reply(200, {
      message: 'This is a success response'
    });

    // 模拟错误请求
    mock.onGet('/api/error').reply(500, {
      message: 'This is an error response'
    });

    // 模拟登录接口
    mock.onPost('/api/login').reply(config => {
      const { username, password } = JSON.parse(config.data);
      if (username === 'admin' && password === '1234') {
        // 设置 JWT token 到 cookie 中
        Cookies.set('jwt-token', 'fake-jwt-token', { expires: 1 }); // token 有效期为 1 天
        return [200, { token: 'fake-jwt-token' }];
      } else {
        return [400, { message: 'Invalid username or password' }];
      }
    });

    // 模拟受保护的 API 请求
    mock.onGet('/api/protected').reply(config => {
      const token = Cookies.get('jwt-token');
      if (token === 'fake-jwt-token') {
        return [200, { data: 'Protected data' }];
      } else {
        return [401, { message: 'Unauthorized' }];
      }
    });

    // 模拟 GET /api/permissions 请求
    mock.onGet('/api/permissions').reply(200, permissions);

    // 模拟上传接口
    mock.onPost('/api/upload').reply(config => {
      // 解析请求体
      const formData = config.data;
      
      console.log(config)
      // 在这里可以进行模拟的逻辑处理，比如验证文件类型、大小等
      // 这里直接返回成功的响应
      return [200, {
          url: 'https://pss.bdstatic.com/static/superman/img/logo/logo_white-d0c9fe2af5.png', // 模拟返回的文件URL
          message: '文件上传成功',
      }];
    });

  }
};
