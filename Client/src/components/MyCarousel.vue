<template>
    <div class="carousel" @mouseenter="pause" @mouseleave="resume">
        <transition name="fade" mode="out-in">
            <div :style="{
                backgroundImage: `url(${currentImage})`,
            }" class="carousel-image" :key="currentIndex">
                <div class="frosted-glass">
                    <p>{{text}}</p>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { computed } from 'vue';
const props = defineProps({
    images: {
        type: Array,
        required: true,
        validator: (value) => {
            return value.every((item) => typeof item === 'string');
        },
    },
    text: {
    type: String,
    required: true,
  },
});

const currentIndex = ref(0);
const intervalTime = 3000; // 切换间隔时间（毫秒）
let intervalId = null;

const currentImage = computed(() => props.images[currentIndex.value]);
const pause = () => {
    clearInterval(intervalId);
};

const resume = () => {
    startInterval();
};

const startInterval = () => {
    intervalId = setInterval(() => {
        currentIndex.value = (currentIndex.value + 1) % props.images.length;
    }, intervalTime);
};

onMounted(() => {
    startInterval();
});

onUnmounted(() => {
    clearInterval(intervalId);
});
</script>
<style>
img {
    width: 100%;
}
</style>
<style scoped>
.carousel {
    position: relative;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
}

.carousel-image {
    width: 100%;
    height: 600px;
    /* 设置一个固定高度，可以根据需要调整 */
    background-size: cover;
    /* 使背景图片覆盖整个 div */
    background-position: center;
    /* 将背景图片居中显示 */
    background-repeat: no-repeat;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.frosted-glass {
    text-align: center;
    font-size: 18px;
  position: absolute;
  right: 2px; /* 与父元素最右边隔开 20px */
  top: 50%;
  transform: translateY(-50%); /* 垂直居中 */
  width: 30%; /* 宽度为 30% */
  height: 60%; /* 高度为 60% */
  display: flex;
  justify-content: center;
  align-items: center;
  color: white; /* 文字颜色可以根据背景调整 */
  font-weight: bold;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;

  /* 毛玻璃效果 */
  backdrop-filter: blur(10px); /* 背景模糊程度 */
  -webkit-backdrop-filter: blur(10px); /* 兼容部分浏览器 */
  background-color: rgba(255, 255, 255, 0.3); /* 半透明背景 */
  border-radius: 15px; /* 添加圆角效果 */
}
</style>