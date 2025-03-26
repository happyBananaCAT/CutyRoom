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
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #eee;
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
}

.image-container {
  flex: 1;
  margin-right: 12px;
}

.image-container img {
  width: 100%;
  height: auto;
  border-radius: 4px;
}

.info {
  flex: 2;
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
}
</style>