<template>
    <div class="container"> 
        <Nav v-bind:-page-options="menus"></Nav>
            <router-view></router-view>
    </div>
</template>

<script setup>
import { ref, reactive, inject, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import P5Button from '../../../components/P5Button.vue';
import P5ButtonGray from '../../../components/P5Button-gray.vue';
const router = useRouter()
const route = useRoute()
const dialog = inject("dialog")
const message = inject("message")
const axios = inject("axios")
import Nav from '../../../components/nav.vue';


let menus = [
    { label: "萌屋工具箱", value: "/dashboardHome/toolbox" },
    { label: "萌屋官号", value: "/dashboardHome/account" },
    { label: "游戏作品", value: "/dashboardHome/artworks" },
    { label: "加入我们", value: "/dashboardHome/join" },
    { label: "成员信息", value: "/dashboardHome/members" },
]
const toPage = (menu) => {
    router.push(menu.href)
}
</script>

<style lang="scss" scoped>
* {
    word-wrap: break-word;
    /* 允许在单词内换行 */
    overflow-wrap: break-word;
    /* 同上 */
    white-space: normal;
    /* 默认值，允许换行 */
}

.container {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    margin: 0 auto;
    border: 1px;
    background-image: url("../../../assets/P5Background.png");
}
</style>