<template>
  <div class="form-container bg-white p-6">
    <h2 class="text-2xl font-semibold mb-6">{{ formTitle }}</h2>
    <VForm @submit="handleSubmit">
      <div v-for="(field, index) in formFields" :key="index" class="mb-4">
        <div class="flex items-start">
          <label :for="field.name" class="block text-sm font-medium text-gray-700 w-1/6 pt-2 text-right mr-4">
            {{ field.label }}
            <span v-if="field.rules && field.rules.includes('required')" class="text-red-500">*</span>
          </label>
          <div class="w-3/4 mt-1">
            <template v-if="field.type === 'text' || field.type === 'email' || field.type === 'password'">
              <VField
                v-model="formData[field.name]"
                :name="field.name"
                :type="field.type"
                :placeholder="field.placeholder"
                :rules="field.rules"
                class="input input-bordered w-full input-md"
              />
            </template>
            <template v-else-if="field.type === 'select'">
              <VField as="select" v-model="formData[field.name]" :name="field.name" :rules="field.rules" class="select select-bordered w-full text-sm select-md">
                <option v-for="(option, idx) in field.options" :key="idx" :value="option.value">{{ option.label }}</option>
              </VField>
            </template>
            <template v-else-if="field.type === 'radio'">
              <div class="flex space-x-4">
                <label v-for="(option, idx) in field.options" :key="idx" class="inline-flex items-center">
                  <VField 
                    type="radio"
                    :name="field.name"
                    :value="option.value"
                    v-model="formData[field.name]"
                    :rules="field.rules"
                    class="radio radio-primary radio-md"
                  />
                  <span class="ml-2 text-sm">{{ option.label }}</span>
                </label>
              </div>
            </template>
            <template v-else-if="field.type === 'checkbox'">
              <div class="flex flex-col space-y-2">
                <label v-for="(option, idx) in field.options" :key="idx" class="inline-flex items-center">
                  <VField
                    type="checkbox"
                    :name="field.name"
                    :value="option.value"
                    v-model="formData[field.name]"
                    class="checkbox checkbox-primary"
                    :rules="field.rules"
                  />
                  <span class="ml-2 text-sm">{{ option.label }}</span>
                </label>
              </div>
            </template>
            <template v-else-if="field.type === 'upload'">
              <VField v-model="formData[field.name]" :name="field.name" :rules="field.rules">
                <template #default="{ field, meta }">
                  <UploadImage
                    ref="uploadRefs"
                    v-bind="field"
                    :maxFileSize="field.maxFileSize"
                    :maxFiles="field.maxFiles"
                    :uploadEndpoint="field.uploadEndpoint"
                    @update:modelValue="updateFormData(field.name, $event)"
                    class="w-full"
                  />
                </template>
              </VField>
            </template>
            <template v-else-if="field.type === 'ckeditor'">
              <VField v-model="formData[field.name]" :name="field.name" :rules="field.rules">
                <template #default="{ field, meta }">
                 <Ckeditor v-model="formData[field.name]" />
              </template>
              </VField>
            </template>
            <div class="fixed-height">
              <ErrorMessage :name="field.name" class="text-red-500 text-sm mt-1" />
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center space-x-4">
        <button type="submit" class="btn btn-primary btn-block w-1/2">提交</button>
        <button type="button" @click="handleCancel" class="btn w-1/2">取消</button>
      </div>
    </VForm>
  </div>
</template>

<script>
import { ref } from 'vue';
import { Field as VField, Form as VForm, ErrorMessage } from 'vee-validate';
import { setupVeeValidate } from '@/utils/vee-validate';
import UploadImage from './UploadImage.vue'; // 导入 UploadImage 组件
import Ckeditor from './Ckeditor.vue'; // 导入 CKEditor 组件

setupVeeValidate();

export default {
  name: 'Form',
  components: {
    VForm,
    VField,
    ErrorMessage,
    UploadImage, // 注册 UploadImage 组件
    Ckeditor, // 注册 CKEditor 组件
  },
  props: {
    formTitle: {
      type: String,
      default: 'Form',  
    },
    formFields: {
      type: Array,
      required: true,
    },
    formData: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    const uploadRefs = ref([]);
    
    return {
      uploadRefs,
    };
  },
  methods: {
    async handleSubmit(values) {
      console.log('Form submitted:', values);
      if (this.uploadRefs && this.uploadRefs.length > 0) {
        // 遍历每个上传组件，调用其 uploadImages 方法
        for (const uploadRef of this.uploadRefs) {
          if (uploadRef && typeof uploadRef.uploadImages === 'function') {
            await uploadRef.uploadImages();
          }
        }
      }
     
      console.log(values);
    },
    handleCancel() {
      console.log('Form cancelled');
    },
    updateFormData(name, value) {
      this.formData[name] = value;
    },
    callChildMethod() {
      console.log(this.uploadRefs);
      this.uploadRefs.forEach((uploadRef, index) => {
        if (uploadRef && typeof uploadRef.test2 === 'function') {
          console.log(`调用子组件 ${index} 的方法`);
          uploadRef.test2();
        } else {
          console.error(`子组件 ${index} 的方法不存在`);
        }
      });
    }
  },
};
</script>

<style scoped>
.form-container {
  background-color: #fff;
  border-radius: 0.5rem;
}
.fixed-height {
  min-height: 1.5rem; /* 根据需要设置高度 */
}
</style>
