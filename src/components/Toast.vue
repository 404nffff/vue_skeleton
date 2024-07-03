<template>
    <div
      v-if="visible"
      :class="['alert', alertTypeClass, 'w-full flex items-center p-2 rounded-lg shadow-lg mb-2 slide-fade']"
    >
      <i v-if="type === 'success'" class="fas fa-check-circle ml-2" style="margin-right: -6px;"></i>
      <i v-if="type === 'error'" class="fas fa-times-circle ml-2" style="margin-right: -6px;"></i>
      <i v-if="type === 'warning'" class="fas fa-exclamation-triangle ml-2" style="margin-right: -6px;"></i>
      <span class="text-base mr-2">{{ message }}</span>
    </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    alertTypeClass() {
      switch (this.type) {
        case 'success':
          return 'alert-success bg-green-100 border border-green-400 text-green-700';
        case 'error':
          return 'alert-error bg-red-100 border border-red-400 text-red-700';
        case 'warning':
          return 'alert-warning bg-yellow-100 border border-yellow-400 text-yellow-700';
        default:
          return '';
      }
    },
  },
};
</script>

<style scoped>
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}
.slide-fade-enter-from, .slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.slide-fade-enter-to, .slide-fade-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>
