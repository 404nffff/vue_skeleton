<template>
    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"  @ready="onEditorReady"></ckeditor>
</template>

<script>
import {
	ClassicEditor,
	AccessibilityHelp,
	Autoformat,
	AutoImage,
	AutoLink,
	Autosave,
	Bold,
	CKBox,
	CKBoxImageEdit,
	CloudServices,
	Code,
	CodeBlock,
	Essentials,
	FindAndReplace,
	GeneralHtmlSupport,
	Heading,
	HtmlComment,
	HtmlEmbed,
	ImageBlock,
	ImageCaption,
	ImageInsert,
	ImageInsertViaUrl,
	ImageResize,
	ImageStyle,
	ImageTextAlternative,
	ImageToolbar,
	ImageUpload,
	Italic,
	Link,
	LinkImage,
	List,
	Paragraph,
	PasteFromOffice,
	PictureEditing,
	SelectAll,
	ShowBlocks,
	SourceEditing,
	Table,
	TableToolbar,
	TextTransformation,
	Undo,
    SimpleUploadAdapter 
} from 'ckeditor5';
import CKEditor from '@ckeditor/ckeditor5-vue';

import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

import translations from 'ckeditor5/translations/zh-cn.js';
import premiumFeaturesTranslations from 'ckeditor5-premium-features/translations/zh-cn.js';

import {post} from '@/api/axios';


// 创建自定义上传适配器类
class CustomUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }

    // 启动上传进程
    upload() {
        return this.loader.file
            .then(file => new Promise((resolve, reject) => {
                this._uploadFile(file, resolve, reject);
            }));
    }

    // 中断上传
    abort() {
        // 可以实现中断功能
    }

    // 私有方法，上传文件到服务器
    _uploadFile(file, resolve, reject) {
        let formData = new FormData();
		console.log(file.file);
        formData.append('upload', file);
        post('/api/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
			console.log(response)
            resolve({
                default: response.url // 返回文件的URL
            });
        })
        .catch(error => {
            reject(error);
        });
    }
}

export default {
    name: 'app',
    components: {
        ckeditor: CKEditor.component
    },
    props: {
        modelValue: {
        type: String,
        default: ''
        }
    },
    data() {
        return {
            editor: ClassicEditor,
            editorData: '',
            editorConfig: {
                plugins: [ 
				AccessibilityHelp,
				Autoformat,
				AutoImage,
				AutoLink,
				Autosave,
				Bold,
				CKBox,
				CKBoxImageEdit,
				CloudServices,
				Code,
				CodeBlock,
				Essentials,
				FindAndReplace,
				GeneralHtmlSupport,
				Heading,
				HtmlComment,
				HtmlEmbed,
				ImageBlock,
				ImageCaption,
				ImageInsert,
				ImageInsertViaUrl,
				ImageResize,
				ImageStyle,
				ImageTextAlternative,
				ImageToolbar,
				ImageUpload,
				Italic,
				Link,
				LinkImage,
				List,
				Paragraph,
				PasteFromOffice,
				PictureEditing,
				SelectAll,
				ShowBlocks,
				SourceEditing,
				Table,
				TableToolbar,
				TextTransformation,
				Undo,
                SimpleUploadAdapter 
                ],
                toolbar: {
				items: [
					'undo',
					'redo',
					'|',
					'sourceEditing',
					'showBlocks',
					'findAndReplace',
					'selectAll',
					'|',
					'heading',
					'|',
					'bold',
					'italic',
					'code',
					'|',
					'link',
					'insertImage',
					'insertTable',
					'codeBlock',
					'htmlEmbed',
					'|',
					'bulletedList',
					'numberedList',
					'|',
					'accessibilityHelp'
				],
				shouldNotGroupWhenFull: false
			    },
                table: {
				    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
			    },
			    translations: [translations, premiumFeaturesTranslations],
				// The configuration of the editor.
				extraPlugins: [ function(editor) {editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
					return new CustomUploadAdapter( loader );
				}}]
            }
        };
    },
    watch: {
        modelValue(newValue) {
        	this.editorData = newValue;
        },
        editorData(newValue) {
        	this.$emit('update:modelValue', newValue);
        }
    },
	mounted() {
    },
    methods: {
		onEditorReady(editor) {
			editor.plugins.get('Notification').on('show:warning', (event, data) => {
			// your code for showing error
				//console.log('Warning:', data);
				event.stop();
			});

			editor.editing.view.change( writer => {
				writer.setStyle( 'height', '200px', editor.editing.view.document.getRoot() );
			} );
		}
    },
}	
</script>

<style scoped>
</style>