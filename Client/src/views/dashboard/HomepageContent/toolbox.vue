<template>
    <div>
        <div v-for="(group) in groups">
            <p5-title :content='group.id' size="extra-large" font_color="#ff0000" selected_font_color="#000"
                selected_bg_color="#ff0000"></p5-title>
            <n-carousel effect="card" prev-slide-style="transform: translateX(-150%) translateZ(-800px);"
                next-slide-style="transform: translateX(50%) translateZ(-800px);" style="height: 50vh"
                :show-dots="false">
                <n-carousel-item :style="{ width: '60%' }" v-for="(member, index) in group.members">
                    <Card :title='member.name' :subtitle='group.id' :image='member.img' :current-page="index+1" :total-pages="group.members.length">
                        <p>{{ member.description }}</p>
                        <a :href='member.link'>查看详情</a>
                    </Card>
                </n-carousel-item>
            </n-carousel>


        </div>
    </div>
</template>

<script setup>
import { useMessage } from "naive-ui";
import { ref, reactive, inject, onMounted, onUnmounted } from 'vue'
import Card from "../../../components/card.vue";

const groups = ref({
    // 萌屋 (github.com)(https://github.com/Cuty-Room)
    g1: {
        id: "萌屋相关",
        members: [
            {
                name: "萌屋内部技术平台:WriteBug", img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.IJZgTNx1vp9EML_1wV5p2gHaEo?w=270&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
                description: "萌屋圈子码：61473570", link: "https://www.writebug.com/"
            },
            {
                name: "萌屋B站官方主页", img: "https://th.bing.com/th/id/OIP.kRjXwxDBMuTMjpZBY63kKQHaHa?rs=1&pid=ImgDetMain",
                description: "账号电话：1886737523", link: "https://space.bilibili.com/1810734309/"
            },
            {
                name: "萌屋GitHub", img: "https://th.bing.com/th/id/OIP.kRjXwxDBMuTMjpZBY63kKQHaHa?rs=1&pid=ImgDetMain",
                description: "萌屋GitHub", link: "https://github.com/Cuty-Room"
            }
        ],
    },
    g2: {
        id: "技术资源",
        members: [
            {
                name: "Unity官方文档", img: "https://th.bing.com/th/id/OIP.Jjs1DhMP2p4o6eErvxSkaQHaHa?rs=1&pid=ImgDetMain",
                description: "Unity官方文档", link: "https://docs.unity3d.com/cn/2021.3/Manual/index.html"
            },
            {
                name: "C#官方文档", img: "https://th.bing.com/th/id/OIP.Jjs1DhMP2p4o6eErvxSkaQHaHa?rs=1&pid=ImgDetMain",
                description: "C#官方文档", link: "https://learn.microsoft.com/zh-cn/dotnet/csharp/"
            },
            {
                name: "Unity中文课堂", img: "https://th.bing.com/th/id/OIP.Jjs1DhMP2p4o6eErvxSkaQHaHa?rs=1&pid=ImgDetMain",
                description: "Unity中文课堂", link: "https://learn.u3d.cn/"
            },
            {
                name: "Unity Learn", img: "https://th.bing.com/th/id/OIP.Jjs1DhMP2p4o6eErvxSkaQHaHa?rs=1&pid=ImgDetMain",
                description: "Unity Learn", link: "https://learn.unity.com/"
            },
            {
                name: "机核", img: "https://th.bing.com/th/id/OIP.Jjs1DhMP2p4o6eErvxSkaQHaHa?rs=1&pid=ImgDetMain",
                description: "机核", link: "https://www.gcores.com/"
            },
        ],
    },
    g3: {
        id: "素材资源",
        members: [
            {
                name: "Asset Store", img: "https://th.bing.com/th/id/OIP.Jjs1DhMP2p4o6eErvxSkaQHaHa?rs=1&pid=ImgDetMain",
                description: "Asset Store", link: "https://assetstore.unity.com/"
            },
            {
                name: "爱给网", img: "https://th.bing.com/th/id/OIP.Jjs1DhMP2p4o6eErvxSkaQHaHa?rs=1&pid=ImgDetMain",
                description: "Asset Store", link: "https://www.aigei.com/"
            },
            {
                name: "Kenny Free", img: "https://th.bing.com/th/id/OIP.Jjs1DhMP2p4o6eErvxSkaQHaHa?rs=1&pid=ImgDetMain",
                description: "Kenny Free", link: "https://kenney.nl/assets"
            },
            {
                name: "Game icon", img: "https://th.bing.com/th/id/OIP.Jjs1DhMP2p4o6eErvxSkaQHaHa?rs=1&pid=ImgDetMain",
                description: "游戏图标", link: "https://game-icons.net/"
            },
            {
                name: "itch", img: "https://th.bing.com/th/id/OIP.Jjs1DhMP2p4o6eErvxSkaQHaHa?rs=1&pid=ImgDetMain",
                description: "游戏图标", link: "https://itch.io/game-assets"
            },
            {
                name: "Freepik", img: "https://th.bing.com/th/id/OIP.Jjs1DhMP2p4o6eErvxSkaQHaHa?rs=1&pid=ImgDetMain",
                description: "Freepik", link: "https://www.freepik.com/"
            },
            {
                name: "graphicriver", img: "https://th.bing.com/th/id/OIP.Jjs1DhMP2p4o6eErvxSkaQHaHa?rs=1&pid=ImgDetMain",
                description: "游戏图标", link: "https://graphicriver.net/"
            },
            {
                name: "iconscout", img: "https://th.bing.com/th/id/OIP.Jjs1DhMP2p4o6eErvxSkaQHaHa?rs=1&pid=ImgDetMain",
                description: "游戏图标", link: "https://game-icons.net/"
            },
            {
                name: "shutterstock", img: "https://th.bing.com/th/id/OIP.Jjs1DhMP2p4o6eErvxSkaQHaHa?rs=1&pid=ImgDetMain",
                description: "游戏图标", link: "https://www.shutterstock.com/zh/"
            },
            {
                name: "ArtStation", img: "https://th.bing.com/th/id/OIP.Jjs1DhMP2p4o6eErvxSkaQHaHa?rs=1&pid=ImgDetMain",
                description: "游戏图标", link: "https://www.artstation.com/?sort_by=community"
            },
            {
                name: "Openverse", img: "https://th.bing.com/th/id/OIP.Jjs1DhMP2p4o6eErvxSkaQHaHa?rs=1&pid=ImgDetMain",
                description: "游戏图标", link: "https://wordpress.org/openverse/"
            },
            {
                name: "猫啃网", img: "https://th.bing.com/th/id/OIP.Jjs1DhMP2p4o6eErvxSkaQHaHa?rs=1&pid=ImgDetMain",
                description: "猫啃网", link: "https://www.maoken.com/"
            },
            {
                name: "阿里巴巴iconfont", img: "https://th.bing.com/th/id/OIP.Jjs1DhMP2p4o6eErvxSkaQHaHa?rs=1&pid=ImgDetMain",
                description: "猫啃网", link: "https://www.iconfont.cn/"
            },{
                name: "VG Resource", img: "https://th.bing.com/th/id/OIP.Jjs1DhMP2p4o6eErvxSkaQHaHa?rs=1&pid=ImgDetMain",
                description: "猫啃网", link: "https://www.vg-resource.com/"
            },{
                name: "Mintox", img: "https://th.bing.com/th/id/OIP.Jjs1DhMP2p4o6eErvxSkaQHaHa?rs=1&pid=ImgDetMain",
                description: "猫啃网", link: "https://www.mintox.com/"
            },{
                name: "Visme", img: "https://th.bing.com/th/id/OIP.Jjs1DhMP2p4o6eErvxSkaQHaHa?rs=1&pid=ImgDetMain",
                description: "猫啃网", link: "https://www.visme.co/"
            },
            {
                name: "模之屋", img: "https://th.bing.com/th/id/OIP.Jjs1DhMP2p4o6eErvxSkaQHaHa?rs=1&pid=ImgDetMain",
                description: "猫啃网", link: "https://www.aplaybox.com/"
            },{
                name: "Art Station", img: "https://th.bing.com/th/id/OIP.Jjs1DhMP2p4o6eErvxSkaQHaHa?rs=1&pid=ImgDetMain",
                description: "猫啃网", link: "https://www.artstation.com/?sort_by=community"
            },
            {
                name: "Sketchfab", img: "https://th.bing.com/th/id/OIP.Jjs1DhMP2p4o6eErvxSkaQHaHa?rs=1&pid=ImgDetMain",
                description: "猫啃网", link: "https://sketchfab.com/"
            },{
                name: "OpenGameArt", img: "https://th.bing.com/th/id/OIP.Jjs1DhMP2p4o6eErvxSkaQHaHa?rs=1&pid=ImgDetMain",
                description: "猫啃网", link: "https://opengameart.org/"
            }
        ],
    }
})

let observer = null;
onMounted(() => {
    observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute("src");
                if (src) {
                    img.src = src; // 设置图片 src，触发加载
                    observer.unobserve(img); // 停止观察该图片
                }
            }
        });
    });
    const lazyImages = document.querySelectorAll(".lazy-image");
    lazyImages.forEach((img) => {
        observer.observe(img);
    });
});

onUnmounted(() => {
    if (observer) observer.disconnect(); // 组件销毁时断开观察器
});
</script>

<style lang="scss" scoped>
.card-image-container {
    position: relative;
    width: 100%;
    padding-top: 100%;
    /* 16:9 的宽高比，可根据需要调整 */
}

/* 图片样式 */
.card-image-container img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* 确保图片覆盖整个容器 */
}
</style>