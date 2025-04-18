<template>
    <div class="box">
        <!-- <n-carousel draggable mousewheel autoplay direction="vertical" dot-type="dot" 
        dot-placement="left" style="height: 600px;width: 70%;" class="carousel"> -->
        <n-carousel effect="card" prev-slide-style="transform: translateX(-150%) translateZ(-800px);"
            next-slide-style="transform: translateX(50%) translateZ(-800px);" style="height: 600px;width: 60%;"
            show-dots draggable show-arrow>
            <MyCarousel :images="imageArray[0]" :text="carouselTexts[0]"  class="CarouselItem"/>
            <MyCarousel :images="imageArray[1]" :text="carouselTexts[1]"  class="CarouselItem"/>
        </n-carousel>
    </div>
</template>

<script setup>
import MyCarousel from '../../components/MyCarousel.vue';

const imageArray = [
    [
        "/GameImg/JournalismSimulator/1.png",
        "/GameImg/JournalismSimulator/2.png",
        "/GameImg/JournalismSimulator/3.png",
        "/GameImg/JournalismSimulator/4.png",
        "/GameImg/JournalismSimulator/5.png",
        "/GameImg/JournalismSimulator/6.png",
        "/GameImg/JournalismSimulator/7.png"
    ],
    [
        "/GameImg/Candlepower/1.png",
        "/GameImg/Candlepower/2.png",
        "/GameImg/Candlepower/3.png",
        "/GameImg/Candlepower/4.png",
        "/GameImg/Candlepower/5.png",
        "/GameImg/Candlepower/6.png",
        "/GameImg/Candlepower/7.png",
        "/GameImg/Candlepower/8.png",
    ]
]

const carouselTexts = [
    `新闻学模拟器：Unity Gamejam作品
    这是一个带有meta性质的讽刺游戏。
    让你能够扮演一个新闻自媒体，对各种正常新闻进行歪曲解读，断章取义。
    最终让互联网充满对立和纷争，人血馒头吃得饱饱的。It Never Ends，In This World！`,

    `烛光灵魂边境（TapTap聚光灯项目）
    阴森的洞窟、随处可见的残烛、散发着异样光芒的雾状怪物，还有萦绕在耳边、来自远处某个人的低语……
    在目睹最后一次日落后，「你」能否寻回光明？崖边少女又为何有着与一路所见的受缚石像一致的容貌？
    在这漫长旅途的终点，迎接「你」的又会是什么样的命运？
    “——欢迎来到生与死的夹缝。"`,
];
</script>

<style lang="scss" scoped>
.box {
    display: flex;
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
}
.CarouselItem{
    width: 100%;
}
</style>