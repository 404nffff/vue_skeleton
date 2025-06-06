import { get } from './axios';


import routes from './routes.json';

export const fetchRoutes = () => {


  return routes

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
