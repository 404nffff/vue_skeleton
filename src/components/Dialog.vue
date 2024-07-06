<template>
 <dialog class="modal" :class="state.visible?'modal-open':''">
  <div class="modal-box">
    <h3 class="text-lg font-bold">{{ state.title }}</h3>
    <p class="py-4">{{ state.content }}</p>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button @click="confirm" class="btn btn-primary mr-2">确定</button>
        <button @click="close" class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
</template>

<script>
export default {
  props: {
    state: {
      type: Object,
      required: true,
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
    confirm() {
      this.$emit('confirm');
    },
  },
};
</script>

<style scoped>
/* 添加必要的样式 */
</style>
