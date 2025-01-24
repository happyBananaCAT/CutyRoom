<template>
    <div>
      <div style="border: 1px solid #ccc;">
        <Toolbar
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
          :mode="mode"
          style="border-bottom: 1px solid #ccc"
        />
        <Editor
          v-model="valueHtml"
          :defaultConfig="editorConfig"
          :mode="mode"
          style="height: 500px; overflow-y: hidden;"
          @onCreated="handleCreated"
          @onChange="handleChange"
        />
      </div>
      <button @click="saveContent">保存内容</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
  import '@wangeditor/editor/dist/css/style.css';
  
  const editorRef = ref(null);
  const valueHtml = ref(''); // 绑定编辑器的内容
  const mode = ref('default');
  const toolbarConfig = {};
  const editorConfig = {
    placeholder: '请输入内容...',
    MENU_CONF: {
      uploadImage: {
        fieldName: 'file',
        server: 'http://localhost:8080/upload', // 替换为你的图片上传接口
      },
    },
  };
  
  // 页面加载时从 localStorage 读取内容
  onMounted(() => {
    const savedContent = localStorage.getItem('editorContent');
    if (savedContent) {
      valueHtml.value = savedContent;
    }
  });
  
  // 保存内容到 localStorage
  const saveContent = () => {
    localStorage.setItem('editorContent', valueHtml.value);
    alert('内容已保存！');
  };
  
  // 编辑器创建时的回调
  const handleCreated = (editor) => {
    editorRef.value = editor;
  };
  
  // 编辑器内容变化时的回调
  const handleChange = () => {
    valueHtml.value = editorRef.value.getHtml();
  };
  
  // 组件销毁时销毁编辑器实例
  onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor) {
      editor.destroy();
    }
  });
  </script>
  





<!-- import { LoginStore } from '../stores/LoginStores';
import {ref,reactive,inject} from 'vue'
import { useRoute,useRouter } from 'vue-router';
const router = useRouter()
const route  = useRoute()

const message = inject("message")
const axios = inject("axios")
const loginStore = LoginStore() -->