<template>
  <div class="flex flex-col justify-center">
    <div class="grid grid-flow-col auto-cols-max gap-2">
      <div
        v-for="(preview, index) in limitedPreviews"
        :key="index"
        class="relative w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden"
      >
        <img 
          :src="preview" 
          alt="Image Preview" 
          class="object-cover w-full h-full cursor-pointer"
          @click="showPreview(index)" 
        />
        <button
          class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
          @click="removeLimitedImage(index)"
        >
          ✕
        </button>
      </div>
      <label v-if="limitedPreviews.length < maxFiles" class="flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer">
        <span class="text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </span>
        <input
          type="file"
          class="hidden"
          accept="image/*"
          @change="handleLimitedFileChange"
        />
      </label>
    </div>
    <div v-if="previewIndex !== null" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div class="relative bg-white p-4 rounded-lg shadow-lg">
        <img :src="limitedPreviews[previewIndex]" alt="Full Image Preview" class="max-w-full max-h-screen" />
        <button class="absolute top-2 right-2 btn btn-circle btn-sm btn-outline" @click="closePreview">✕</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { showToast } from '@/utils/toast';

// 模拟接口调用
const mockUploadEndpoint = async (formData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          message: 'Upload successful',
          files: Array.from(formData.getAll('images')).map((file, index) => ({
            id: index + 1,
            name: file.name,
            url: URL.createObjectURL(file),
          })),
        },
      });
    }, 1000);
  });
};

export default {
  name: 'UploadImage',
  props: {
    maxFileSize: {
      type: Number,
      default: 2 * 1024 * 1024, // 默认最大文件大小为2MB
    },
    maxFiles: {
      type: Number,
      default: 3, // 默认最多上传3个文件
    },
    uploadEndpoint: {
      type: String,
      default: '', // 上传接口地址，默认空字符串
    },
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const selectedFiles = ref([]); // 选择的文件
    const limitedPreviews = ref([]); // 限制数量的预览图片
    const previewIndex = ref(null); // 当前预览的图片索引

    watch(selectedFiles, () => {
      emit('update:modelValue', selectedFiles.value);
    });

    // 处理有限制数量的文件变更
    const handleLimitedFileChange = (event) => {
      if (limitedPreviews.value.length >= props.maxFiles) return;
      const files = Array.from(event.target.files).slice(0, props.maxFiles - limitedPreviews.value.length);
      const validFiles = validateFiles(files);

      validFiles.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          limitedPreviews.value.push(reader.result);
          selectedFiles.value.push(file);
          emit('update:modelValue', selectedFiles.value);
        };
        reader.readAsDataURL(file);
      });
    };

    // 验证文件格式和大小
    const validateFiles = (files) => {
      return files.filter(file => {
        if (!file.type.startsWith('image/')) {
          showToast('文件格式不支持', 'error');
          return false;
        }
        if (file.size > props.maxFileSize) {
          showToast(`文件大小不能超过 ${props.maxFileSize / 1024 / 1024} MB`, 'error');
          return false;
        }
        return true;
      });
    };

    // 移除限制数量的图片
    const removeLimitedImage = (index) => {
      selectedFiles.value.splice(index, 1);
      limitedPreviews.value.splice(index, 1);
      emit('update:modelValue', selectedFiles.value);
    };

    // 上传图片
    const uploadImages = async () => {
      const formData = new FormData();
      selectedFiles.value.forEach(file => {
        formData.append('images', file);
      });

      try {
        selectedFiles.value.forEach(file => file.status = '上传中...');
        
        // 模拟接口调用
        const response = await mockUploadEndpoint(formData);
        
        selectedFiles.value.forEach(file => file.status = '上传成功');
        showToast('上传成功', 'success');
        console.log('上传成功:', response.data);
          
        // 更新 modelValue
        emit('update:modelValue', response.data.files);

      } catch (error) {
        selectedFiles.value.forEach(file => file.status = '上传失败');
        showToast('上传失败', 'error');
        console.error('上传失败:', error);
      }
    };

    // 显示预览
    const showPreview = (index) => {
      previewIndex.value = index;
    };

    // 关闭预览
    const closePreview = () => {
      previewIndex.value = null;
    };

    // 暴露方法
    const test2 = () => {
      console.log('子组件的方法被调用');
    };

    return {
      selectedFiles,
      limitedPreviews,
      previewIndex,
      handleLimitedFileChange,
      removeLimitedImage,
      uploadImages,
      showPreview,
      closePreview,
      test2, // 确保方法在组件实例中
    };
  }
};
</script>

<style scoped>
/* 你可以在这里添加组件特定的样式 */
</style>
