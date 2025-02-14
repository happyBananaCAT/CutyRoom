<template>
    <div class="scroll-container" @click="toggleScroll">
      <div class="scroll-content" :class="{ 'scroll-open': isOpen }">
        <p>这是卷轴的内容</p>
        <p>向下滚动展开</p>
        <p>更多内容……</p>
      </div>

    </div>
  </template>

<script setup>
import { ref } from 'vue';

// 定义一个响应式变量，控制卷轴的展开状态
const isOpen = ref(false);

// 定义一个方法，用于切换卷轴的展开状态
const toggleScroll = () => {
  isOpen.value = !isOpen.value; // 切换布尔值
};
</script>

<style lang="scss" scoped>
.scroll-container {
  position: relative;
  width: 300px;
  height: 400px;
  overflow: hidden;
  border: 2px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
}

.scroll-content {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  background-color: #fff;
  border: 2px solid #888;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: height 0.5s ease;
  overflow: hidden;
}

.scroll-content p {
  margin: 10px 0;
  text-align: center;
}

.scroll-open {
  height: 100%; /* 展开时的高度 */
  animation: scroll-down 2s ease forwards;
}

@keyframes scroll-down {
  0% {
    transform: translateX(-50%) translateY(-100%);
    height: 0;
  }
  100%    {
 transform: translateX(-50%) translateY(0);
    height: 100%;
  }
}
</style>