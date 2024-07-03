import { createApp, reactive } from 'vue';
import Toast from '@/components/Toast.vue';

const toasts = reactive([]);

const showToast = ({ type = 'success', message, duration = 3000 }) => {
  const toast = { type, message, visible: true, id: Date.now() };
  toasts.push(toast);

  setTimeout(() => {
    toast.visible = false;
    setTimeout(() => {
      const index = toasts.indexOf(toast);
      if (index !== -1) {
        toasts.splice(index, 1);
      }
    }, 500); // Wait for the transition to finish
  }, duration);
};

const ToastPlugin = {
  install(app) {
    const ToastComponent = createApp({
      data() {
        return { toasts };
      },
      template: `
        <div class="fixed top-4 right-4 space-y-4">
          <transition-group name="slide-fade" tag="div">
            <Toast v-for="toast in toasts" :key="toast.id" :type="toast.type" :message="toast.message" :visible="toast.visible" />
          </transition-group>
        </div>
      `,
      components: { Toast },
    });

    const toastInstance = ToastComponent.mount(document.createElement('div'));
    document.body.appendChild(toastInstance.$el);

    app.config.globalProperties.$toast = showToast;
    app.provide('toast', showToast);
  },
};

export { showToast };
export default ToastPlugin;
