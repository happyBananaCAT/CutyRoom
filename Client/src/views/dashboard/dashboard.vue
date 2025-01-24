<template>
    <div class="main_panel">
        <div class="menu">
            <div v-for="(menu,index) in menus" @click = "toPage(menu)">
                {{ menu.name }}
            </div>
        </div>

        <div style="padding: 20px;width: 100%;">
            <router-view></router-view>
        </div>
    </div>
    <div class="title">后台管理</div>
</template>

<script setup>
    import { LoginStore } from '../../stores/LoginStores';
    import {ref,reactive,inject} from 'vue'
    import { useRoute,useRouter } from 'vue-router';
    const router = useRouter()
    const route  = useRoute()

    const message = inject("message")
    const axios = inject("axios")
    const loginStore = LoginStore()

    let menus= [
        {name:"文章管理",href:"/dashboard/article"},
        {name:"分类管理",href:"/dashboard/category"},
        {name:"退出",href:"logout"}
        ]

    const toPage=(menu)=>{
        if(menu.href == 'logout'){
            router.push("/login")
        }else{
            router.push(menu.href)
        }
        
    }
</script>

<style lang="scss" scoped>
.main_panel{
    display: flex;
    color: rgb(29, 27, 27);
    margin: 0 auto;
}
.menu{
    padding: 20px 0;
    box-sizing: border-box;
    line-height: 55px;
    text-align: center;
    width: 180px;
    height: 100vh;
    border-right: 1px solid #dadada;

    div {
        cursor: pointer;

        &:hover {
            color: #fd760e;
        }
    }
}
.title {
    font-size: 65px;
    font-weight: bold;
    text-align: right;
    position: fixed;
    color: rgba(0, 0 , 0);
    right: calc((100vw - 1500px) / 2);
    bottom: 20px;
}
</style>