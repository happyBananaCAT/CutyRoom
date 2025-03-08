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
                <n-popselect v-model:value="selectedPage" :options="props.PageOptions" trigger="click" @update:value="toPage(selectedPage)">
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
import { ref, reactive, inject, onMounted, computed ,provide} from 'vue'
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
const toPage = (selectedPage)=>{
    const selectedOption = props.PageOptions.find((option) => option.value === selectedPage);
    console.log(selectedOption)
  if (selectedOption && selectedOption.value) {
    router.push(selectedOption.value);
  }
}
console.log(props.PageOptions)
</script>

<style lang="scss" scoped>
.nav {
    display: flex;
    justify-content: space-between;
    color: rgb(0, 0, 0);
    background-color: rgb(0, 0, 0);
    position: sticky;
    top: 0;
    z-index: 10;
    width: 100%;

    div {
        margin-top: 0px;
        cursor: pointer;
        z-index: 1;
        -webkit-text-stroke: 1px rgb(255, 255, 255);
        font-weight: bolder;
        font-size: 50px;
    }

    .line {
        width: 100%;
        height: 1px;
        border-top: solid red 0.5vh;
        position: absolute;
        bottom: 0;
    }
}
</style>