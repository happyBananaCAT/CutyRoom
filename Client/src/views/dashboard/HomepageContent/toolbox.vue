<template>
    <div>
        <div v-for="(group) in groups">
            <p5-title :content='group.id' size="extra-large" font_color="#ff0000" selected_font_color="#000"
                selected_bg_color="#ff0000"></p5-title>
            <n-carousel effect="card" prev-slide-style="transform: translateX(-150%) translateZ(-800px);"
                next-slide-style="transform: translateX(50%) translateZ(-800px);" style="height: 50vh"
                :show-dots="false">
                <n-carousel-item :style="{ width: '60%' }" v-for="(member) in group.members">
                    <Card :title='member.name' :subtitle='group.id' :image='member.img'>
                        <p>{{member.description}}</p>
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
    g1: {
        id: "萌屋相关",
        members: [
            {
                name: "萌屋内部技术平台:WriteBug", img: "https://th.bing.com/th/id/OIP.IdlPXEsntPYN9As79aam9AAAAA?rs=1&pid=ImgDetMain",
                description: "萌屋圈子码：61473570", link: "https://www.writebug.com/"
            },
            {
                name: "萌屋B站官方主页", img: "https://th.bing.com/th/id/OIP.kRjXwxDBMuTMjpZBY63kKQHaHa?rs=1&pid=ImgDetMain",
                description: "账号电话：1886737523", link: "https://space.bilibili.com/1810734309/"
            },
        ],
    },
    g2: {
        id: "二代目",
        members: [
            { name: "曼波", img: "https://th.bing.com/th/id/OIP.Jjs1DhMP2p4o6eErvxSkaQHaHa?rs=1&pid=ImgDetMain", description: "曼波", link: "https://github.com/" },
            { name: "曼波", img: "https://th.bing.com/th/id/OIP.Jjs1DhMP2p4o6eErvxSkaQHaHa?rs=1&pid=ImgDetMain", description: "曼波", link: "https://github.com/" },
            { name: "曼波", img: "https://th.bing.com/th/id/OIP.Jjs1DhMP2p4o6eErvxSkaQHaHa?rs=1&pid=ImgDetMain", description: "曼波", link: "https://github.com/" }
        ],
    },
    g3: {
        id: "三代目",
        members: [
            { name: "曼波", img: "https://th.bing.com/th/id/OIP.Jjs1DhMP2p4o6eErvxSkaQHaHa?rs=1&pid=ImgDetMain", description: "曼波", link: "https://github.com/" },
            { name: "曼波", img: "https://th.bing.com/th/id/OIP.Jjs1DhMP2p4o6eErvxSkaQHaHa?rs=1&pid=ImgDetMain", description: "曼波", link: "https://github.com/" },
            { name: "曼波", img: "https://th.bing.com/th/id/OIP.Jjs1DhMP2p4o6eErvxSkaQHaHa?rs=1&pid=ImgDetMain", description: "曼波", link: "https://github.com/" }
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