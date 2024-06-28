<template>

    <Form
      :formTitle="formTitle"
      :formFields="formFields"
      :formData="formData"
      @submit="handleFormSubmit"
      @cancel="handleFormCancel"
    />
</template>

<script>
import Form from '@/components/Form.vue';

export default {
  name: 'App',
  components: {
    Form,
  },
  data() {
    return {
      formTitle: "标题",
      formData: {
        username: '',
        email: '',
        password: '',
        gender: '',
        hobbies: [],
        country: '',
        images: [], // 新增的字段
      },
      formFields: [
        { name: 'username', label: 'Username', type: 'text', placeholder: 'Enter your username', rules: 'required' },
        { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email', rules: 'required|email' },
        { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password', rules: 'required' },
        {
          name: 'gender',
          label: 'Gender',
          type: 'radio',
          options: [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
          ],
          rules: 'required|one_of:male,female',
        },
        {
          name: 'hobbies',
          label: 'Hobbies',
          type: 'checkbox',
          options: [
            { value: 'reading', label: 'Reading' },
            { value: 'sports', label: 'Sports' },
            { value: 'music', label: 'Music' },
          ],
          rules: 'required',
        },
        {
          name: 'country',
          label: 'Country',
          type: 'select',
          options: [
            { value: '', label: 'Select your country' },
            { value: 'usa', label: 'USA' },
            { value: 'canada', label: 'Canada' },
            { value: 'uk', label: 'UK' },
          ],
          rules: 'required',
        },
        {
          name: 'images',
          label: 'Upload Images',
          type: 'upload',
          maxFileSize: 2 * 1024 * 1024, // 2MB
          maxFiles: 3,
          uploadEndpoint: '/upload', // 示例上传端点
          rules: 'required',
        },
      ],
    };
  },
  methods: {
    handleFormSubmit(values) {
      console.log('Form submitted:', values);
    },
    handleFormCancel() {
      console.log('Form cancelled');
    },
  },
};
</script>
