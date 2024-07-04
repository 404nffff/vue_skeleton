import $ from 'jquery';

// 获取背景颜色类
const getBackgroundColorClass = (type) => {
  switch (type) {
    case 'success':
      return 'alert-success bg-green-100 border border-green-400 text-green-700';
    case 'error':
      return 'alert-error bg-red-100 border border-red-400 text-red-700';
    case 'warning':
      return 'alert-warning bg-yellow-100 border border-yellow-400 text-yellow-700';
    case 'info':
      return 'alert-info bg-blue-100 border border-blue-400 text-blue-700';
    default:
      return '';
  }
};

// 创建 Toast HTML 结构
const createToastHTML = ({ message, type = 'info' }) => `
  <div class="toast-box" style="opacity: 0; transform: translateX(100%); transition: transform 0.5s ease, opacity 0.5s ease; position: fixed; right: 16px;">
    <div class="alert ${getBackgroundColorClass(type)} flex items-center p-4 mb-2 rounded-lg shadow-lg">
      <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-times-circle' : type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle'} ml-2"></i>
      <span class="text-base ml-2">${message}</span>
    </div>
  </div>
`;

// 创建 Toast 显示函数
const showToast = ({ type = 'info', message, duration = 3000 }) => {
  const toastHTML = createToastHTML({ type, message });
  const $toast = $(toastHTML);

  // 计算新的 Toast 位置
  let lastTop = 16; // 初始 top 值
  $('.toast-box').each((i, v) => {
    lastTop += $(v).outerHeight() + 10; // 计算每个 Toast 的高度和间距
  });

  $toast.css('top', `${lastTop}px`);

  $('body').append($toast);

  // 添加滑入效果
  setTimeout(() => {
    $toast.css({ opacity: 1, transform: 'translateX(0)' });
  }, 100);

  setTimeout(() => {
    // 添加滑出效果
    $toast.css({ opacity: 0, transform: 'translateX(100%)' });
    setTimeout(() => {
      $toast.remove();
    }, 500); // 等待滑出动画完成后移除
  }, duration);
};

// 创建 Vue 插件
const ToastPlugin = {
  install(app) {
    app.config.globalProperties.$toast = showToast;
    app.provide('toast', showToast);
  },
};

export { showToast };
export default ToastPlugin;
