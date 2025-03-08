<template>
    <div>
        成员信息跳转
        <n-carousel :space-between="30" :loop="false" slides-per-view="auto" centered-slides draggable class="carousel" show-arrow>
            <n-carousel-item style="width:80%" v-for="(group) in groups">
                <div>
                    <p5-title :content='group.id' size="extra-large" font_color="#ff0000" selected_font_color="#000"
                        selected_bg_color="#ff0000"></p5-title>
                    <n-space item-style="width: 30%; padding: 10px" wrap>
                        <n-card v-for="(member) in group.members" :title="member.name">
                            <template #header-extra>
                                {{ group.id }}
                            </template>
                                <img :src="member.img" alt="loading..." class="lazy-image"></img>
                            <template #footer>
                                {{ member.description }}
                            </template>
                            <template #action>
                                <div> <a :href="member.link">更多信息</a></div>
                            </template>
                        </n-card>
                    </n-space>
                </div>
            </n-carousel-item>
            <!-- <n-carousel-item style="width: 60%">
                <img class="carousel-img"
                    src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg">
            </n-carousel-item>
            <n-carousel-item style="width: 60%">
                <img class="carousel-img"
                    src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg">
            </n-carousel-item>
            <n-carousel-item style="width: 60%">
                <img class="carousel-img"
                    src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg">
            </n-carousel-item> -->
        </n-carousel>
    </div>
</template>

<script setup>
import { useMessage } from "naive-ui";
import { ref, reactive, inject, onMounted,onUnmounted } from 'vue'
const groups = ref({
    g1: {
        id: "一代目",
        members: [
            { name: "曼波", img: "https://th.bing.com/th/id/OIP.Jjs1DhMP2p4o6eErvxSkaQHaHa?rs=1&pid=ImgDetMain", description: "曼波", link: "https://github.com/" },
            { name: "曼波", img: "https://th.bing.com/th/id/OIP.Jjs1DhMP2p4o6eErvxSkaQHaHa?rs=1&pid=ImgDetMain", description: "曼波", link: "https://github.com/" },
            { name: "曼波", img: "https://th.bing.com/th/id/OIP.Jjs1DhMP2p4o6eErvxSkaQHaHa?rs=1&pid=ImgDetMain", description: "曼波", link: "https://github.com/" },
            { name: "曼波", img: "https://th.bing.com/th/id/OIP.Jjs1DhMP2p4o6eErvxSkaQHaHa?rs=1&pid=ImgDetMain", description: "曼波", link: "https://github.com/" },
            { name: "曼波", img: "https://th.bing.com/th/id/OIP.Jjs1DhMP2p4o6eErvxSkaQHaHa?rs=1&pid=ImgDetMain", description: "曼波", link: "https://github.com/" },
            { name: "曼波", img: "https://th.bing.com/th/id/OIP.Jjs1DhMP2p4o6eErvxSkaQHaHa?rs=1&pid=ImgDetMain", description: "曼波", link: "https://github.com/" }
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

  // 初始化观察所有图片
  const lazyImages = document.querySelectorAll(".lazy-image");
  lazyImages.forEach((img) => {
    observer.observe(img);
  });
});

onUnmounted(() => {
  if (observer) observer.disconnect(); // 组件销毁时断开观察器
});

</script>

<style>
img {
    max-width: 100%;
}
</style>
<style lang="scss" scoped>
.carousel-img {
    width: 100%;
    object-fit: cover;
}

.carousel {
    width: 100%;
    height: 100%;
}

.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    padding: 10px;
}

.item {
    width: 100%;
    background-color: white
}
</style>