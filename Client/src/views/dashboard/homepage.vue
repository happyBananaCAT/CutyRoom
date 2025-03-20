<template>
    <div class="container">
        <div class="nav">
            <div>
                <img src="../../assets/logo.png" style="width: 80px; height:72px ;" @click="router.push('./')"></img>
            </div>
            <div @click="homepage">
                <P5Button @click="homepage">首页</P5Button>
            </div>
            <div>
                <n-popselect v-model:value="selectedCategory" :options="categoryOptions" trigger="click"
                    @update:value="pagination.page = 1">
                    <P5Button>分类<span>{{ categoryName == "" ? "" : ':' + categoryName }}</span></P5Button>
                </n-popselect>
            </div>
            <div>
                <P5Button @click="Login">个人</P5Button>
            </div>
            <div></div>
            <div class="line"></div>
        </div>

        <div class="main_page" >
            <div class="left_part">
                <div class="more p5-scrollbar">
                    <p5-title content="更多内容" size="extra-large"></p5-title>
                    <div class="content ">
                        <P5ButtonGray @click="toPage('/dashboardHome/join')">加入我们</P5ButtonGray>
                        <P5ButtonGray @click="toPage('/dashboardHome/toolbox')">萌屋工具箱</P5ButtonGray>
                        <P5ButtonGray @click="toPage('/dashboardHome/members')">成员信息</P5ButtonGray>
                        <P5ButtonGray><a href="https://github.com/happyBananaCAT/CutyRoom" 
                        style=" color: inherit;
                                text-decoration: none;">官网源码</a></P5ButtonGray>
                        <P5ButtonGray @click="toPage('/dashboardHome/account')">萌屋官号</P5ButtonGray>
                        <P5ButtonGray @click="toPage('/dashboardHome/artworks')">游戏作品</P5ButtonGray>
                        
                    </div>

                </div>

            </div>
            <div class="right_part">
                <n-space class="search">
                    <n-input v-model:value="pagination.keyword" placeholder="请输入关键字以进行搜索" :style="{
                        'width': '20vw',
                        '--n-border-color': '#ff0000', /* 修改边框颜色 */
                        '--n-border-hover': '1px solid #ff0000',
                        '--n-border-focus': '1px solid #ff0000',
                        '--n-box-shadow-focus': '0 0 0 2px #ff0000', /* 修改聚焦时的阴影颜色 */
                        '--n-text-color': '#000000', /* 修改文字颜色 */
                    }"></n-input>
                    <p5-icon type="btn" name="confirm" @click="loadBlog(OtherUser.creater_id, true)"></p5-icon>
                </n-space>
                <div v-if="check_other_user == false">
                    <p5-title content="萌屋文章精选" size="extra-large" font_color="#ff0000" selected_font_color="#000"
                        selected_bg_color="#ff0000"></p5-title>
                    <div v-for="(blog, index) in BlogList" style="margin: 15px;">
                        <n-card :title="blog.title" :style="{ 'width': '60vw', }" @click="toDetail(blog)">
                            <div v-html="blog.content"></div>
                            <template #footer>
                                <n-space align="center">
                                    <div>发布时间：{{ blog.create_time }}</div>
                                    <div @click.stop="toWriter(blog.creater_id, blog.creater_name)"
                                        :style="{ cursor: 'pointer' }">作者:{{ blog.creater_name }}</div>
                                </n-space>
                            </template>
                        </n-card>
                    </div>
                    <n-pagination v-model:page="pagination.page" :page-count="pagination.page_count"
                        @update:page="loadBlog(0)" :style="{
                            '--n-item-text-color': 'white',
                            '--n-item-text-color-hover': 'red',
                            '--n-item-text-color-active': 'red',
                            '--n-item-text-color-pressed': 'red',
                            '--n-item-border': '1px solid white',
                            '--n-item-border-hover': '1px solid red',
                            '--n-item-border-active': '1px solid red',
                            '--n-button-icon-color': 'white',
                            '--n-button-icon-color-hover': 'red',
                            '--n-button-icon-color-pressed': 'red',
                            '--n-button-border-hover': '1px solid red',
                            '--n-button-border-pressed': '1px solid red',
                        }" />
                </div>
                <div v-else="check_other_user==true">
                    <p5-title :content="`${OtherUser.creater_name}的文章`" size="extra-large" font_color="#ff0000"
                        selected_font_color="#000" selected_bg_color="#ff0000"></p5-title>

                    <div v-for="(blog, index) in BlogList" style="margin: 15px;">
                        <n-card :title="blog.title"  @click="toDetail(blog)" :style="{ 'width': '60vw', }" >
                            <div v-html="blog.content" :style="{ overflow: 'hidden' }"></div>
                            <template #footer>
                                <n-space align="center">
                                    <div>发布时间：{{ blog.create_time }}</div>
                                    <div @click.stop="toWriter(blog.creater_id, blog.creater_name)"
                                        :style="{ cursor: 'pointer', color: 'red' }">作者:{{ blog.creater_name }}</div>
                                </n-space>
                            </template>
                        </n-card>
                    </div>
                    {{ console.log(OtherUser.creater_id, pagination.page, pagination.page_count) }}
                    <n-pagination v-model:page="pagination.page" :page-count="pagination.page_count"
                        @update:page="loadBlog(OtherUser.creater_id)" :style="{
                            '--n-item-text-color': 'white',
                            '--n-item-text-color-hover': 'red',
                            '--n-item-text-color-active': 'red',
                            '--n-item-text-color-pressed': 'red',
                            '--n-item-border': '1px solid white',
                            '--n-item-border-hover': '1px solid red',
                            '--n-item-border-active': '1px solid red',
                            '--n-button-icon-color': 'white',
                            '--n-button-icon-color-hover': 'red',
                            '--n-button-icon-color-pressed': 'red',
                            '--n-button-border-hover': '1px solid red',
                            '--n-button-border-pressed': '1px solid red',
                        }" />


                </div>
            </div>

        </div>
        <p5-divider></p5-divider>
        <div class="footer">
            <div>Power by ???</div>
            <div>XCIP备????号</div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, inject, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import P5Button from '../../components/P5Button.vue';
import P5ButtonGray from '../../components/P5Button-gray.vue';
const router = useRouter()
const route = useRoute()
const dialog = inject("dialog")
const message = inject("message")
const axios = inject("axios")

const selectedCategory = ref(0)
const categoryOptions = ref([])
const BlogList = ref([])

let check_other_user = ref(false)
const pagination = reactive({
    page: 1,
    page_size: 3,
    page_count: 0,
    blog_count: 0,
    keyword: "",
})

const OtherUser = reactive({
    creater_name: '',
    creater_id: 0
})
const loadBlog = async (creater_id, reset_page) => {
    // console.trace("myFunction was called");
    if (creater_id === undefined) {
        creater_id = 0
    }
    if (reset_page == true) {
        pagination.page = 1
        pagination.page_size = 3
    }
    let res = await axios.get(`/blog/search?keyword=${pagination.keyword}&page=${pagination.page}&pageSize=${pagination.page_size}&category_id=${pagination.CategoryId}&creater_id=${creater_id}`)
    let temp_rows = res.data.data.rows
    BlogList.value = res.data.data.rows
    for (let row of temp_rows) {
        let time = new Date(row.create_time)
        row.create_time = `${time.getFullYear()}.${time.getMonth() + 1}.${time.getDate()}`
        if (row.content.length >= 300) {
            row.content += "......"
        }
    }
    BlogList.value = temp_rows
    pagination.blog_count = res.data.data.count

    pagination.page_count = Math.ceil(pagination.blog_count / pagination.page_size)
    // console.log(BlogList.value)
}

const categoryName = computed(() => {
    let selectedOption = categoryOptions.value.find((option) => {
        return option.value == selectedCategory.value
    })
    selectedOption ? pagination.CategoryId = selectedOption.value : pagination.CategoryId = 0
    loadBlog(OtherUser.creater_id ? OtherUser.creater_id : 0)
    return selectedOption ? selectedOption.label : ""
})


const loadCategoty = async () => {
    let res = await axios.get("/category/list")
    categoryOptions.value = res.data.rows.map((item) => {
        return {
            label: item.name,
            value: item.id
        }
    })
    let all={label:"全部",value:0}
    categoryOptions.value.unshift(all)
 
}
const toDetail = (blog) => {
    router.push({ path: "/detail", query: { id: blog.id } })
}
const toWriter = (creater_id, creater_name) => {
    check_other_user.value = true
    pagination.page = 1
    OtherUser.creater_id = creater_id
    OtherUser.creater_name = creater_name
    loadBlog(OtherUser.creater_id)
}
onMounted(() => {
    loadCategoty()
    loadBlog()
})
const homepage = () => {
    router.push("/")
    check_other_user.value = false
    pagination.page = 1
}
const Login = () => {
    router.push("/login")
}
const toPage = (href)=>{
    router.push(href)
}
</script>
<style>
img {
    max-width: 100%;
}
</style>
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
    background-image: url("../../assets/P5Background.png");
}

.main_page {
    display: flex;
    min-height: 100vh;
    .left_part {
        width: 20%;
        height: 100%;
        position: sticky;
        top: 50%;
        transform: translate(0, -50%);

        /* 向左上偏移自身宽高的 50% */
        .more {
            overflow: scroll;
            background-color: #cfcfcf;
            width: 80%;
            height: 70%;
            max-height: 50vh;
            margin: auto;
            .content {
              
                font-size: large;
                font-weight: bold;
                z-index: 1;
                display: flex;
                /* 启用 Flexbox 布局 */
                flex-direction: column;
                /* 子元素竖向排列 */
                align-items: center;
                /* 水平居中 */
                justify-content: center;
                /* 垂直居中 */
                gap: 5px;
                /* 子元素之间的间隙 */


            }
        }
    }
}

.search {
    margin-top: 10px
}



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

.footer {
    text-align: center;
    line-height: 25px;
    color: #726e72;
}
</style>