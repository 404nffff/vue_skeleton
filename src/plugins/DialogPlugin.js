import { createApp, reactive } from 'vue';
import Dialog from '@/components/Dialog.vue';

const DialogPlugin = {
  install(app) {
    const state = reactive({
      visible: false,
      title: '',
      content: null,
      onConfirm: null,
    });

    const showDialog = ({ title, content, onConfirm }) => {
      state.title = title;
      state.content = content;
      state.onConfirm = onConfirm;
      state.visible = true;
    };

    const DialogComponent = createApp(Dialog, {
      state,
      onClose: () => {
        state.visible = false;
      },
      onConfirm: () => {
        state.onConfirm && state.onConfirm();
        state.visible = false;
      },
    });

    const dialogInstance = DialogComponent.mount(document.createElement('div'));
    document.body.appendChild(dialogInstance.$el);

    app.config.globalProperties.$dialog = showDialog;
  },
};

export default DialogPlugin;
