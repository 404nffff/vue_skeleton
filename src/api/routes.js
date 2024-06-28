import { get } from './axios';

export const fetchRoutes = () => {
  return get('/api/routes')
    .then(data => {
      console.log('Fetched routes:', data); // 调试信息
      return data;
    })
    .catch(error => {
      console.error('Error fetching routes:', error);
      return [];
    });
};

export default {
  fetchRoutes
};
