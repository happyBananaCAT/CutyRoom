<template>
    <div v-if="showAnimate" class="animate">
        <p className="ciallo"style="">
            Ciallo～(∠・ω&lt; )⌒★
        </p>
    </div>
    <div v-else>
        todo
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { LoginStore } from '../stores/LoginStores';
    const loginStore = LoginStore()
    const showAnimate = ref(true); // 定义响应式数据
    onMounted(() => {
    // 页面加载后 1 秒钟自动切换
        setTimeout(() => {
            showAnimate.value = false; // 隐藏第一个元素
        }, 3000);
    });
</script>

<style lang="scss" scoped>
    .ciallo {
        display: block; /* 确保是块级元素 */


        display: flex; /* 使用flex布局 */
        text-align: center;
        justify-content: space-around;
        align-items: center; /* 文字垂直居中 */

        position: fixed;

        font-size: 50px;
        top: 40%;
        left: 150%;
        transform: translateY(-50%);
        // transform: translateX(-50%);
        white-space: nowrap;
        animation: ciallo-animate 3s linear infinite;
    }
    @keyframes ciallo-animate {
        0% {
            left: 150%;
        }
        100% {
            left: -50%;
    }
}
</style>