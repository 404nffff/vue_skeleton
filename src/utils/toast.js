import $ from 'jquery';

// 创建 Toast HTML 结构
const createToastHTML = (message, type = 'error') => `
  <div class="alert alert-${type} fixed top-4 left-1/2 transform -translate-x-1/2 z-50 shadow-lg" style="z-index: 9999;background-color: ${getBackgroundColor(type)};" role="alert">
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span>${message}</span>
  </div>
`;

// 获取背景颜色
const getBackgroundColor = (type) => {
  switch (type) {
    case 'success':
      return '#00A96E'; // 绿色
    case 'warning':
      return '#FFBE00'; // 黄色
    case 'info':
      return '#00B5FF'; // 蓝色
    case 'error':
    default:
      return '#FF5861'; // 红色
  }
};

// 创建 Toast 显示函数
export const showToast = (message, type = 'error') => {
  const toastHTML = createToastHTML(message, type);
  const $toast = $(toastHTML);

  $('body').append($toast);

  setTimeout(() => {
    $toast.fadeOut(300, () => $toast.remove());
  }, 3000);
};
