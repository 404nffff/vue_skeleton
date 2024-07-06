import Mock from 'mockjs';

export const generateData = () => {
  return Mock.mock({
    'list|10': [{
      'id|+1': 1,
      'name': '@name',
      'age|18-60': 1,
      'city': '@city'
    }]
  });
};
