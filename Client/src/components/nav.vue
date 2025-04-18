<template>
    <div class="nav">
        <div>
            <img src="../assets/logo.png" style="width: 80px; height:72px ;" @click="router.push('/')"></img>
        </div>
        <div>
            <P5Button @click="router.push('/')">首页</P5Button>
        </div>
        <!-- todo，选择更多跳转页面 -->
        <div>
            <n-popselect v-model:value="selectedPage" :options="props.PageOptions" trigger="click"
                @update:value="toPage(selectedPage)">
                <P5Button>更多</P5Button>
            </n-popselect>
        </div>
        <div>
            <P5Button @click="router.push('/login')">个人</P5Button>
        </div>
        <div></div>
        <div class="line"></div>
    </div>
</template>

<script setup>
import { ref, reactive, inject, onMounted, computed, provide } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import P5Button from '../components/P5Button.vue';
import P5ButtonGray from '../components/P5Button-gray.vue';
import { onUpdated } from 'vue';
const router = useRouter()
const route = useRoute()
const dialog = inject("dialog")
const message = inject("message")
const axios = inject("axios")
const selectedPage = ref(null);
const props = defineProps({
    PageOptions: Array
});
const toPage = (selectedPage) => {
    if (selectedPage[0] != "/") {
        window.location.href = selectedPage
    } else {
        const selectedOption = props.PageOptions.find((option) => option.value === selectedPage);
        if (selectedOption && selectedOption.value) {
            router.push(selectedOption.value);
        }
    }
}
</script>

<style lang="scss" scoped>
.nav {
    display: flex;
    justify-content: space-between;
    align-items: center; // 添加垂直居中
    color: rgb(0, 0, 0);
    background-color: rgb(0, 0, 0);
    position: sticky;
    top: 0;
    z-index: 10;
    width: 100%;
    box-sizing: border-box; // 确保padding包含在宽度内

    div {
        margin: 0;
        cursor: pointer;
        z-index: 1;
        -webkit-text-stroke: 1px rgb(255, 255, 255);
        font-weight: bolder;
        font-size: 50px;
        flex-shrink: 1; // 允许元素收缩
    }

    .line {
        width: 100%;
        height: 1px;
        border-top: solid red 0.5vh;
        position: absolute;
        bottom: 0;
    }
}

@media (max-width: 768px) {
    .nav {
        display: flex;
        flex-wrap: wrap;
        justify-content: center; /* 水平居中 */
        align-items: center; /* 垂直居中 */
        padding: 10px 5px; /* 调整内边距 */
        position: sticky;
        top: 0;
        z-index: 10;
        background-color: rgb(0, 0, 0);
        div {
            font-size: 24px;
            margin: 5px 10px;
        }

        .line {
            width: calc(100% - 20px);
            left: 10px;
            right: 10px;
        }
    }
}
</style>