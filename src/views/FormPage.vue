<template>
    <div class="p-4">
      <Form
        :formTitle="formTitle"
        :formFields="formFields"
        :formData="formData"
        @submit="handleFormSubmit"
        @cancel="handleFormCancel"
      />
    </div>
  </template>
  
  <script>
  import Form from '@/components/Form.vue';
  
  export default {
    name: 'FormPage',
    components: {
      Form,
    },
    data() {
      return {
        formTitle: 'Add New Entry',
        formFields: [
          { name: 'Name', label: 'Name', type: 'text', placeholder: 'Enter name', rules: 'required' },
          { name: 'Age', label: 'Age', type: 'number', placeholder: 'Enter age', rules: 'required|min:1' },
          { name: 'Country', label: 'Country', type: 'text', placeholder: 'Enter country', rules: 'required' },
        ],
        formData: {
          Name: '',
          Age: '',
          Country: '',
        },
      };
    },
    methods: {
      handleFormSubmit(data) {
        this.$emit('submit', data);
        this.$router.push('/');
      },
      handleFormCancel() {
        this.$router.push('/');
      },
    },
    created() {
      if (this.$route.query.edit === 'true') {
        this.formTitle = 'Edit Entry';
        try {
          const formData = JSON.parse(this.$route.query.data);
          this.formData = formData;
        } catch (error) {
          console.error('Invalid JSON data:', error);
          this.formData = {
            Name: '',
            Age: '',
            Country: '',
          };
        }
      }
    },
  };
  </script>
  