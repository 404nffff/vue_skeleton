<template>
    <div>
      <h1>我是父组件</h1>
      <button @click="callChildMethod">调用子组件方法</button>
      <ChildComponent ref="childComponentRef" />
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import ChildComponent from '@/components/ChildComponent.vue';
  
  export default {
    name: 'ParentComponent',
    components: {
      ChildComponent
    },
    setup() {
      const childComponentRef = ref(null);
  
      const callChildMethod = () => {
        if (childComponentRef.value) {
          childComponentRef.value.childMethod();
        }
      };
  
      return {
        childComponentRef,
        callChildMethod
      };
    }
  };
  </script>
  