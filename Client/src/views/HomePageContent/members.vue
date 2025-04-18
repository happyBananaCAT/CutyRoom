<template>
    <div>
        <n-carousel :space-between="30" :loop="false" slides-per-view="auto" centered-slides draggable class="carousel"
            ref="carousel" @update:current-index="updateCarouselHeight">
            <n-carousel-item style="width:80%" v-for="(group, index) in groups" :ref="el => setItemRef(el, index)"
                class="carousel-item">
                <div class="carousel-content">
                    <p5-title :content='group.id' size="extra-large" font_color="#ff0000" selected_font_color="#000"
                        selected_bg_color="#ff0000"></p5-title>
                    <n-space :item-style="spaceItemStyle" wrap class="responsive-space">
                        <n-card v-for="(member) in group.members" :title="member.name">
                            <template #header-extra>
                                {{ group.id }}
                            </template>
                            <div class="image-container">
                                <img :src="getImgPath(member.img)" alt="loading..." class="lazy-image"></img>
                            </div>
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
        </n-carousel>
    </div>
</template>

<script setup>
import { useMessage } from "naive-ui";
import { ref, reactive, inject, onMounted, onUnmounted, computed, nextTick } from 'vue'
const carousel = ref(null)
const carouselItemRefs = ref([])
const currentActiveIndex = ref(0)
let currentHeight = []
const setItemRef = (el, index) => {
    if (el) {
        carouselItemRefs.value[index] = el.$el
    }
}
const spaceItemStyle = ref({
    width: '30%',
    padding: '10px'
});
const updateItemStyle = () => {
    if (window.innerWidth <= 768) {
        spaceItemStyle.value = { width: '100%', padding: '0', margin: "5px" };
    } else {
        spaceItemStyle.value = { width: '30%', padding: '10px' };
    }
};
const updateCarouselHeight = (index) => {
    let key = `g${index}`
    currentActiveIndex.value = key
    let currentItem = carouselItemRefs.value[key]
    nextTick(() => {
        if (currentItem) {
            const contentEl = currentItem.querySelector(".carousel-content");
            const contentHeight = contentEl?.offsetHeight || 0;
            carousel.value.$el.style.height = `${contentHeight}px`;
        }
    })
}



const groups = ref({
    g0: {
        id: "0代目",
        members: [
            { name: "军喵", img: "军喵_2025-03-23 12.21.08_1000080077_01.jpg", description: "伟大的下头男，兴趣是骚扰人", link: "没有desu" },
            { name: "ekkojojo", img: "armyloss_2025-03-23 12.23.00_Image_1742703241948_01.jpg", description: "豚索狗软蛆原批农批蒸批火批月批GO批", link: "没有desu" }
        ]
    },
    g1: {
        id: "1代目",
        members: [
            { name: "书封影", img: "书封影_2025-03-16 17.44.45_头像_01.jpeg", description: "书封影本人", link: "https://www.gcores.com/users/460496/talks" },
            { name: "Belmaxi", img: "Belmaxi_2025-03-16 17.47.44_b_eb3e6c869147764630167917c61b45c2_01.jpg", description: "新闻学领域高手，能化标签为热度", link: "嫌い" },
            { name: "cx遇痕", img: "cx遇恒_2025-03-16 17.54.24_Image_1730030121181_01.jpg", description: "计算机苦手", link: "18209644423" },
            { name: "happyCat", img: "happy猫猫_2025-03-16 18.43.28_OIP_01.jpeg", description: "湘大22级生，负责工作室官网开发和活动组织", link: "https://github.com/happyBananaCAT" },
            { name: "雫夕", img: "浮世巡リ_2025-03-17 18.15.27_02fe54786102fe547861_01.jpg", description: "一个爱做梦的二次元死宅", link: "https://space.bilibili.com/1147645827" },
            { name: "CK", img: "Explorer61_2025-03-18 16.39.26_header_01.jpg", description: "只因你太美", link: "UID:1608077383" },
        ]
    },
    g2: {
        id: "2代目",
        members: [
            { name: "200", img: "未设置_2025-03-23 12.34.33_1000087346_01.jpg", description: "A moment of clarity in the eye of the storm...", link: "https://b23.tv/RGAFBiT" },
            { name: "电子人", img: "电子人会盘仿生军团吗_2025-03-23 12.46.04_IMG_9628_01.jpeg", description: "画画喵，玩企划喵，玩游戏喵", link: "https://b23.tv/ePsWLmK" },
            { name: "西泽", img: "西泽_2025-03-23 13.03.39_1000080621_01.jpg", description: "学设计的杂鱼一只喵", link: "https://b23.tv/ePsWLmK" },
            { name: "佐檀俊湘", img: "佐檀俊湘_2025-03-18 17.58.38_1000033883_01.jpg", description: "一位钟爱轻音乐的普通人", link: "https://space.bilibili.com/1147645827" },
            { name: "popspoon", img: "PopSpoon_2025-03-16 17.48.00_Image_1711817393420_01.jpg", description: "爱马仕孝子，法老控结晶", link: "贴吧关注popspoon谢谢喵" },
            { name: "xiaohu", img: "xiaohu_haha_2025-03-16 19.04.33_1000007075_01.jpg", description: "半潜水状态中...", link: "联系邮箱地址2565906933@qq.com" },
            { name: "玉米", img: "BeforeEach_2025-03-20 10.19.58_b_464c66a3a744861ec2ab979adfd85f3b_01.jpg", description: "我有玉米症", link: "没有desu" },
            { name: "wish", img: "wish_2025-03-23 12.11.53_1000025259_01.jpg", description: "一个混日子的牛马👀", link: "没有desu" },
            { name: "Magiccat", img: "MagicCat_2025-03-23 12.23.21_1000001630_01.jpg", description: "喵喵喵，我是太上喵皇", link: "没有desu" },

        ]
    },
    g3: {
        id: "3代目",
        members: [
            { name: "Caelhui", img: "Caelhui_2025-03-23 16.06.44_1000018910_01.jpg", description: "MBTI是injp", link: "https://b23.tv/ePsWLmK" },
            { name: "庙子", img: "✟ 生煎包激推 ✟_2025-03-19 12.53.26_Image_51286176491652_01.jpg", description: "一天打鱼六天晒网的oc人", link: "没有desu" },
            { name: "叶无岫", img: "蕈歙_2025-03-23 11.57.11_1000008404_01.jpg", description: "🥺", link: "没有desu" },
            { name: "祈原草目sama", img: "Anttis_2025-03-18 16.15.01_IMG_8118_01.png", description: "臭画画的", link: "UID:1608077383" },
            { name: "水花茗", img: "東 蓮雪_2025-03-16 20.54.21_1000253948_01.jpg", description: "诶！我有一个主意！", link: "不要，别盒我" },
            { name: "cfpt", img: "cfpt_2025-03-16 17.47.56_mmexport1733398065423_01.jpg", description: "试图成为强大的厕划和强大的美工", link: "嫌い" },
            { name: "司羽", img: "不考年级第一不改名_2025-03-16 17.50.04_1000015119_01.jpg", description: "杂鱼，等翻身", link: "这个人很懒，什么也没有留下" },
            { name: "蕃柿", img: "Qie_2025-03-16 19.30.28_1000021294_01.jpg", description: "悟以往之不谏 知来者之可追", link: "阿对对对" },
            { name: "笑霸老实了", img: "笑霸老实了_2025-03-16 21.24.54_1000032050_01.jpg", description: "热爱游戏，乐在其中", link: "确实没有" },
            { name: "星の歌", img: "风语_2025-03-18 16.19.41_1000087206_01.jpg", description: "我真是文策（）", link: "UID:1608077383" },
            { name: "BG3 or 深水老咸鱼", img: "BG3_2025-03-23 12.29.50_1000015983_04.png", description: "杂鱼本鱼喵～专业美工打杂", link: "https://b23.tv/RGAFBiT" },
            { name: "戈戈", img: "弋弋_2025-03-16 17.52.webp", description: "赛博女娲", link: "18209644423" }
        ]
    }


})
function getImgPath(imgName) {
    return `/avatar/${imgName}`;
}
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
onMounted(() => {
    updateCarouselHeight(0) // 初始化高度
    updateItemStyle();
    window.addEventListener('resize', updateItemStyle);
})
onUnmounted(() => {
    if (observer) observer.disconnect(); // 组件销毁时断开观察器
    window.removeEventListener('resize', updateItemStyle);
});

</script>

<style>
img {
    max-width: 100%;
}
</style>
<style lang="scss" scoped>
.carousel {
    width: 100%;
    height: var(--carousel-height, auto);
    min-height: 100px; // 设置最小高度防止闪烁
    overflow: hidden;
    transition: height 0.3s ease;
}

.carousel-item {
    overflow: hidden;
}

.carousel-content {
    padding-bottom: 20px; // 添加一些底部内边距
}

.carousel-img {
    width: 100%;
    object-fit: cover;
}

.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    padding: 10px;
}

.image-container {
    width: 100%;
    aspect-ratio: 1 / 1;
    // height: 300px;
    overflow: hidden;
    /* 防止图片超出容器 */
    display: flex;
    justify-content: center;
    align-items: center;
}

.image-container img {
    width: 100%;
    height: 100%;

}

.item {
    width: 100%;
    background-color: white
}
</style>