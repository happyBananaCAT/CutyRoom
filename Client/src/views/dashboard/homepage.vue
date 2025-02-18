<template>
    <div class="container">
        <div class="nav">
            <div>
                <img src="../../assets/logo.png" style="width: 80px; height:72px ;"></img>
            </div>
            <div @click="homepage">
                <P5Button @click="homepage">首页</P5Button>
            </div>
            <div>
                <n-popselect v-model:value="selectedCategory" :options="categoryOptions" trigger="click"
                    @change="pagination.page = 1">
                    <P5Button>分类<span>{{ categoryName == "" ? "" : ':' + categoryName }}</span></P5Button>
                </n-popselect>
            </div>
            <div>
                <P5Button @click="dashboard">个人</P5Button>
            </div>
            <div></div>
            <div class="line"></div>
        </div>

        <div class="main_page">
            <div class="left_part"></div>
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
                    <p5-icon type="btn" name="confirm" @click=loadBlog></p5-icon>
                </n-space>
                <div v-if="check_other_user == false">
                    <p5-title content="萌屋文章精选" size="extra-large" font_color="#ff0000" selected_font_color="#000"
                        selected_bg_color="#ff0000"></p5-title>
                    <div v-for="(blog, index) in BlogList" style="margin: 15px;">
                        <n-card :title="blog.title" :style="{ 'width': '60vw', }">
                            <div v-html="blog.content" :style="{ overflow: 'hidden' }"></div>
                            <template #footer>
                                <n-space align="center">
                                    <div>发布时间：{{ blog.create_time }}</div>
                                    <div @click="toWriter(blog.creater_id, blog.creater_name)"
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
                    <p5-title :content="`${OtherUser.creater_name}的文章`" size="extra-large" font_color="#ff0000" selected_font_color="#000"
                        selected_bg_color="#ff0000"></p5-title>

                    <div v-for="(blog, index) in BlogList" style="margin: 15px;">
                        <n-card :title="blog.title" :style="{ 'width': '60vw', }">
                            <div v-html="blog.content" :style="{ overflow: 'hidden' }"></div>
                            <template #footer>
                                <n-space align="center">
                                    <div>发布时间：{{ blog.create_time }}</div>
                                    <div @click="toWriter(blog.creater_id, blog.creater_name)"
                                        :style="{ cursor: 'pointer',color:'red' }">作者:{{ blog.creater_name }}</div>
                                </n-space>
                            </template>
                        </n-card>
                    </div>
                    {{ console.log(OtherUser.creater_id,pagination.page,pagination.page_count )}}
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
import Dashboard from './dashboard.vue';
import P5Button from '../../components/P5Button.vue';
import Login from '../login.vue';
import Category from './category.vue';
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
const loadBlog = async (creater_id) => {
    console.trace("myFunction was called");
    if(creater_id === undefined){
        creater_id=0
    }
    let res = await axios.get(`/blog/search?keyword=${pagination.keyword}&page=${pagination.page}&pageSize=${pagination.page_size}&category_id=${pagination.CategoryId}&creater_id=${creater_id}`)
    console.log(`/blog/search?keyword=${pagination.keyword}&page=${pagination.page}&pageSize=${pagination.page_size}&category_id=${pagination.CategoryId}&creater_id=${creater_id}`)
    let temp_rows = res.data.data.rows
    BlogList.value = res.data.data.rows
    for (let row of temp_rows) {
        let time = new Date(row.create_time)
        row.create_time = `${time.getFullYear()}.${time.getMonth() + 1}.${time.getDate()}`
        if (row.content.length == 100) {
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
    loadBlog(OtherUser.creater_id?OtherUser.creater_id:0)
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
    // console.log(categoryOptions.value)
}

const toWriter = (creater_id, creater_name) => {
    check_other_user.value = true
    pagination.page=1
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
    loadBlog()
    check_other_user.value = false
    pagination.page =1
}
const dashboard = () => {
    console.log()
    router.push("/login")
}
</script>

<style lang="scss" scoped>
.container {
    width: 99vw;
    height: 100%;
    min-height: 100vh;
    margin: 0 auto;
    border: 1px;
    background-image: url("../../assets/P5Background.png");
}

.main_page {
    display: flex;

    .left_part {
        width: 20%;
        height: 100%;
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