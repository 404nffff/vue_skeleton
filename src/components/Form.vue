<template>
    <div class="form-container bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 class="text-2xl font-semibold mb-6 text-center">{{ formTitle }}</h2>
      <VForm @submit="handleSubmit">
        <div v-for="(field, index) in formFields" :key="index">
          <label :for="field.name" class="block text-sm font-medium text-gray-700 mb-1">{{ field.label }}</label>
          <VField
            v-model="formData[field.name]"
            :name="field.name"
            :type="field.type"
            :placeholder="field.placeholder"
            :rules="field.rules"
            class="input input-bordered w-full"
          />
          <ErrorMessage :name="field.name" class="text-red-500 text-sm mt-1" />
        </div>
        <div class="flex justify-end space-x-4">
          <button type="submit" class="btn btn-primary">Submit</button>
          <button type="button" @click="handleCancel" class="btn btn-secondary">Cancel</button>
        </div>
      </VForm>
    </div>
  </template>

  <script>

import {
Field as VField, Form as VForm, ErrorMessage} from 'vee-validate';

import { setupVeeValidate } from '@/utils/vee-validate';

setupVeeValidate();

  export default {
    name: 'Form',
    components: {
      VForm,
      VField,
      ErrorMessage,
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
    methods: {
      handleSubmit(values) {
        this.$emit('submit', values);
      },
      handleCancel() {
        this.$emit('cancel');
      },
    },
  };
  </script>
  
  <style scoped>
  .form-container {
    background-color: #fff;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    max-width: 30rem;
    margin: auto;
  }
  </style>
  