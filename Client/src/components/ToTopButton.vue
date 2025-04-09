<template>
    <button class="back-to-top" @click="scrollToTop" v-show="showBackToTop">
        <i class="fa fa-arrow-up">↑</i>
    </button>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
const showBackToTop = ref(false);
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth", // 平滑滚动
    });
};
const handleScroll = () => {
    showBackToTop.value = window.scrollY > 200;
};

// 挂载时添加滚动事件监听
onMounted(() => {
    window.addEventListener("scroll", handleScroll);
});

// 组件销毁前移除滚动事件监听
onBeforeUnmount(() => {
    window.removeEventListener("scroll", handleScroll);
});

</script>

<style>
.text img {
    max-width: 100% !important;
}
</style>
<style lang="scss" scoped>
.back-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    outline: none;
    transition: opacity 0.3s;
}

.back-to-top:hover {
    background-color: #555;
}

.fa-arrow-up {
    font-size: 24px;
}
</style>