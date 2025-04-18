<template>
  <div class="card">
    <div class="header">
      <div class="title">{{ title }}</div>
      <div class="subtitle">{{ subtitle }}</div>
    </div>
    <div class="content">
      <div class="image-container">
        <img :src="image" alt="Card Image" />
      </div>
      <div class="info">
        <slot></slot>
      </div>
    </div>
    <div class="pagination">
      <span>{{ currentPage }} / {{ totalPages }}</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

// 定义组件的 props
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
});
</script>

<style scoped>
.card {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  height: 100%; /* 确保卡片有高度 */
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #eee;
  flex-shrink: 0; /* 防止头部被压缩 */
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.subtitle {
  font-size: 14px;
  color: #666;
}

.content {
  display: flex;
  padding: 12px;
  flex-grow: 1; /* 内容区域填充剩余空间 */
  min-height: 0; /* 修复 flex 容器中的滚动问题 */
}

.image-container {
  flex: 1;
  margin-right: 12px;
  min-height: 0; /* 修复 flex 容器中的滚动问题 */
}

.image-container img {
  width: 100%;
  height: auto;
  border-radius: 4px;
  object-fit: cover;
}

.info {
  flex: 2;
  overflow-y: auto; /* 添加垂直滚动条 */
  max-height: 100%; /* 限制高度以启用滚动 */
  padding-right: 8px; /* 为滚动条留出空间 */
}

/* 自定义滚动条样式 */
.info::-webkit-scrollbar {
  width: 6px;
}

.info::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.info::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.info::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  border-top: 1px solid #eee;
  font-size: 14px;
  color: #333;
  font-weight: bold;
  flex-shrink: 0; /* 防止页脚被压缩 */
}
</style>