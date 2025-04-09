<template>
    <div>
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
    </div>
</template>

<script setup>
    import { LoginStore } from '../../stores/LoginStores';
    import {ref,reactive,inject,onMounted} from 'vue'
    import { useRoute,useRouter } from 'vue-router';
    const router = useRouter()
    const route  = useRoute()
    const loginStore = LoginStore()
    const showAnimate = ref(true);

    const message = inject("message")
    const axios = inject("axios")
    let menus= [
        {name:"撰写博客",href:"/UserDashboard/AddBlog"},
        {name:"我的文章",href:"/UserDashboard/MyBlog"},
        {name:"退出",href:"logout"}
    ]

    const toPage=(menu)=>{
        console.log(menu)
        if(menu.href == 'logout'){
            router.push("/login")
        }else{
            router.push(menu.href)
        }
        
    }
    


    onMounted(() => {
    // 页面加载后 1 秒钟自动切换
        setTimeout(() => {
            showAnimate.value = false; 
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