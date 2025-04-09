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
import Card from "../../components/card.vue"

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
                name: "Unity官方文档",
                img: "https://unity.com/sites/default/files/2021-08/unity-learn-logo.jpg",
                description: "Unity官方技术文档是游戏开发者的核心参考资料，提供从2021.3LTS版本开始的完整API文档和使用指南。包含编辑器使用、脚本编写、物理系统、动画系统、UI系统等全方位教程，特别针对移动平台优化和图形渲染有详细说明。文档采用模块化结构，支持多语言切换和离线下载，并配有交互式示例项目，帮助开发者快速掌握Unity引擎的各项功能。",
                link: "https://docs.unity3d.com/cn/2021.3/Manual/index.html"
            },
            {
                name: "C#官方文档",
                img: "https://learn.microsoft.com/en-us/media/logos/logo_Csharp.svg",
                description: "微软官方维护的C#语言权威文档，涵盖从基础语法到高级特性的完整内容。特别针对Unity开发者，详细解释了委托与事件、协程实现原理、LINQ性能优化等关键技术点。文档包含代码示例、最佳实践指南和版本迁移说明，支持在线代码编辑和运行测试，是解决C#编程问题的终极参考。",
                link: "https://learn.microsoft.com/zh-cn/dotnet/csharp/"
            },
            {
                name: "Unity中文课堂",
                img: "https://learn.u3d.cn/Public/Home/img/logo.png",
                description: "国内领先的Unity专业教育平台，提供从入门到精通的系统性中文课程体系。包含《Unity从零开始》《Shader入门精要》《UGUI深度解析》等热门课程，采用视频讲解+实战项目+作业批改的教学模式。平台还提供技术问答社区和线下交流活动，累计培养超过10万开发者，证书获得行业广泛认可。",
                link: "https://learn.u3d.cn/"
            },
            {
                name: "Unity Learn",
                img: "https://unity.com/sites/default/files/2021-08/unity-learn-premium-logo.jpg",
                description: "Unity Technologies官方打造的学习平台，提供认证课程路径和微学位项目。包含《Creative Core》《Programming Core》《VR Development》等专业学习路线，课程由Unity引擎开发团队直接制作，内容与最新版本保持同步。平台支持交互式学习环境，可实时查看3D示例效果，完成课程可获得官方认证证书。",
                link: "https://learn.unity.com/"
            },
            {
                name: "机核",
                img: "https://www.gcores.com/assets/favicon-9df193f3604c0481999c6b7a5a6a6c83.png",
                description: "中国最具影响力的游戏文化社区之一，除游戏资讯外设有专门的开发频道。包含《游戏开发夜话》《独立游戏档案》等专栏，定期举办线上Game Jam和线下开发者沙龙。社区聚集了大量独立游戏开发者，提供从设计思维到技术实现的深度讨论，是获取本土化开发经验的首选平台。",
                link: "https://www.gcores.com/"
            }
        ]
    },
    g3: {
        id: "素材资源",
        members: [
            {
                name: "Asset Store",
                img: "https://assetstorev1.prd.unity3d.com/static/media/unity-asset-store-logo-dark.4e25a6f1.svg",
                description: "Unity官方资源市场，拥有超过50万个经过质量审核的素材资源。包含完整的解决方案如Playmaker、Odin Inspector等可视化编程工具，以及Amplify Shader Editor等专业着色器编辑器。支持按引擎版本筛选，提供订阅制服务Unity Plus，企业用户可获取专属资源包和技术支持。",
                link: "https://assetstore.unity.com/"
            },
            {
                name: "爱给网",
                img: "https://www.aigei.com/static/img/logo.png",
                description: "国内最大的数字内容交易平台之一，游戏素材板块包含超过20万项资源。特色服务包括：AI智能配色工具、在线音效剪辑器、批量图片格式转换等实用功能。VIP会员可享受每日免费下载额度，企业账户支持定制化素材采购和版权授权服务。",
                link: "https://www.aigei.com/"
            },
            {
                name: "Kenny Free",
                img: "https://kenney.nl/assets/img/kenney-logo.png",
                description: "知名独立开发者Kenney提供的CC0协议素材库，包含完整的游戏开发资源包。特色资源包括：1-bit像素艺术套装、等距视角游戏元件、模块化GUI组件等。所有素材采用统一艺术风格，支持在线预览和整套下载，特别适合快速原型开发和教学演示使用。",
                link: "https://kenney.nl/assets"
            },
            {
                name: "Game icon",
                img: "https://game-icons.net/icons/ffffff/000000/1x1/lorc/abstract-001.png",
                description: "专注于游戏风格图标的专业网站，收录超过5000个精心设计的矢量图标。提供完整的图标分类体系，包括RPG物品、技能效果、状态标识等游戏专用类别。支持在线调整颜色和尺寸，导出格式包含SVG、PNG和WebFont，所有图标均可免费用于商业项目。",
                link: "https://game-icons.net/"
            },
            {
                name: "itch.io",
                img: "https://static.itch.io/images/itchio-textless-black.svg",
                description: "全球最大的独立游戏资源平台，素材区包含超过10万个游戏开发资源。特色内容包括：复古像素艺术包、低保真音效合集、RPG Maker专用素材等。支持按风格、颜色和授权类型筛选，开发者可直接与素材作者沟通定制需求，平台提供完善的版权保护机制。",
                link: "https://itch.io/game-assets"
            },
            {
                name: "Freepik",
                img: "https://www.freepik.com/images/logo-freepik.svg",
                description: "国际知名的设计资源平台，游戏开发板块包含大量矢量插画、UI套件和纹理素材。高级搜索功能支持按颜色代码、元素数量和艺术风格精确查找，每日更新2000+新素材。免费用户需遵守署名要求，Pro会员可解锁高级授权和专属资源库。",
                link: "https://www.freepik.com/"
            },
            {
                name: "graphicriver",
                img: "https://assets.market-storefront.envato.com/storefront/packs/media/images/logos/envato-market-f6121fbbfec25dbc851a1ae5d4115b11.svg",
                description: "Envato旗下高端设计素材市场，游戏分类包含专业级的UI套件、角色设计图和场景概念图。所有素材都经过人工审核，提供完整的预览文件和详细的使用说明。购买前可查看用户评价和兼容性报告，支持7天无理由退款保障。",
                link: "https://graphicriver.net/"
            },
            {
                name: "iconscout",
                img: "https://iconscout.com/static/v4/assets/images/logo.svg",
                description: "专业的图标资源平台，拥有超过500万+的图标资源库。特色服务包括：在线图标编辑器、团队协作空间、品牌图标管理等功能。提供灵活的订阅方案，企业版支持私有化部署和API接入，图标可直接导出为React/Vue组件代码。",
                link: "https://iconscout.com/"
            },
            {
                name: "shutterstock",
                img: "https://www.shutterstock.com/assets/images/shutterstock-logo-pos.png",
                description: "全球顶尖的版权素材库，游戏开发专区包含高质量的概念原画、3D渲染图和特效序列帧。采用AI驱动的搜索系统，支持以图搜图和风格匹配。企业套餐包含专属客户经理和定制化授权方案，适合大型游戏开发团队使用。",
                link: "https://www.shutterstock.com/zh/"
            },
            {
                name: "ArtStation",
                img: "https://www.artstation.com/assets/artstation-logo-white-bg-c9a7cd0be6.png",
                description: "顶尖数字艺术家的展示平台，Marketplace板块提供专业级的游戏美术资源。包括次世代角色模型、PBR材质库、环境概念设计等高端内容。支持4K预览和元数据查看，购买前可与艺术家直接沟通修改需求，部分资源提供工程文件。",
                link: "https://www.artstation.com/?sort_by=community"
            },
            {
                name: "Openverse",
                img: "https://wordpress.org/openverse/wp-content/uploads/sites/7/2021/07/openverse-logo.svg",
                description: "WordPress支持的开源素材搜索引擎，聚合了来自各大开放平台的CC授权资源。高级筛选功能支持按文件类型、尺寸和授权条款精确查找，所有素材都经过严格的版权验证。提供API接口和WordPress插件，方便开发者集成到工作流程中。",
                link: "https://wordpress.org/openverse/"
            },
            {
                name: "猫啃网",
                img: "https://www.maoken.com/static/images/logo.png",
                description: "专业的中文字体资源站，收录了超过1000款可商用的中文字体。特色分类包括：游戏像素字体、书法风格字体、多语言混合字体等。每款字体都提供详细授权说明和应用示例，支持在线预览和字形对比，解决游戏中的中文显示难题。",
                link: "https://www.maoken.com/"
            },
            {
                name: "阿里巴巴iconfont",
                img: "https://img.alicdn.com/imgextra/i4/O1CN01Z5paLz1O0zuCC7osS_!!6000000001644-55-tps-83-82.svg",
                description: "阿里巴巴矢量图标库，国内最大的图标资源平台。提供超过800万个矢量图标，支持中文关键词搜索和本地化分类。特色功能包括：在线颜色编辑、图标组合创建、项目协作管理等，可一键生成字体文件或导出多种格式，完美适配游戏UI开发。",
                link: "https://www.iconfont.cn/"
            },
            {
                name: "VG Resource",
                img: "https://www.vg-resource.com/styles/prosilver/theme/images/site_logo.gif",
                description: "专注于商业游戏素材提取的社区，提供来自3000+款游戏的资源文件。包括角色精灵图、背景贴图、界面元素等原始素材，支持按游戏平台和类型筛选。虽然版权状态需自行确认，但作为美术参考和学习资料极具价值，特别适合复古风格游戏开发。",
                link: "https://www.vg-resource.com/"
            },
            {
                name: "Mintox",
                img: "https://www.mintox.com/wp-content/uploads/2020/08/cropped-Mintox-Favicon-32x32.png",
                description: "独立开发者创建的免费素材博客，专注于简约风格的2D游戏资源。每个资源包都包含完整的配套元素，如角色动画序列、关卡瓦片图、UI音效等。采用MIT许可证，允许任意修改和使用，博客还提供素材制作教程和开发心得分享。",
                link: "https://www.mintox.com/"
            },
            {
                name: "Visme",
                img: "https://www.visme.co/wp-content/themes/visme/images/logo.svg",
                description: "可视化内容创作平台，游戏开发者专区提供大量可定制的设计资源。包括信息图表模板、动画角色素材、数据可视化元件等。在线编辑器支持团队协作和版本控制，可直接导出为GIF动画或HTML5交互内容，适合游戏宣传材料制作。",
                link: "https://www.visme.co/"
            },
            {
                name: "模之屋",
                img: "https://www.aplaybox.com/static/images/logo.png",
                description: "中文3D模型分享社区，专注于动漫风格的角色模型资源。提供MMD、VRM、FBX等多种格式的模型下载，支持在线预览和动态展示。特色服务包括：模型定制委托、动作数据匹配、虚拟直播应用教程等，是二次元游戏开发的宝贵资源库。",
                link: "https://www.aplaybox.com/"
            },
            {
                name: "Sketchfab",
                img: "https://static.sketchfab.com/static/builds/web/dist/static/assets/images/logo/sketchfab-logo-simple-black-c9aa8045ad.svg",
                description: "全球最大的3D模型展示平台，拥有超过500万个高质量3D模型。支持WebGL实时渲染预览、AR/VR查看和模型测量工具。专业搜索功能可按多边形数量、纹理分辨率等参数筛选，企业版提供私有模型库和团队协作空间。",
                link: "https://sketchfab.com/"
            },
            {
                name: "OpenGameArt",
                img: "https://opengameart.org/sites/default/files/oga-logo_0.png",
                description: "专注于开源游戏素材的社区，所有资源都采用自由艺术许可证。特色内容包括：像素艺术大全、自由音乐合集、开放文化资产等。社区采用民主化管理模式，用户可投票决定资源收录标准，定期举办素材创作挑战赛。",
                link: "https://opengameart.org/"
            }
        ]
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