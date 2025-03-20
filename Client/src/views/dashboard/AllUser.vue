<template>
    <div v-if="UserInfo == true">
        <n-table :bordered="false" :single-line="false">
            <thead>
                <tr>
                    <th>用户id</th>
                    <th>用户名称</th>
                    <th>文章数量</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in user_list">
                    <td>{{ user.id }}</td>
                    <td @click="toUserBlog(user)" :style="{ cursor: 'pointer' }">{{ user.account }}</td>
                    <td>{{ user.count }}</td>
                </tr>
            </tbody>
        </n-table>
    </div>
    <div v-else>
        <n-button @click="back()">返回</n-button>
        <n-tabs v-model:value="tabValue" justify-content="space-evenly" type="line">
            <n-tab-pane name="list" tab="文章列表">
                <div v-for="(blog, index) in BlogList" style="margin: 15px;">
                    <n-card :title="blog.title">
                        <div v-html="blog.content">
                        </div>
                        <template #footer>
                            <n-space align="center">
                                <div>发布时间：{{ blog.create_time }}</div>
                                <n-button @click="toUpdate(blog)">修改</n-button>
                                <n-button @click="deleteBlog(blog)">删除</n-button>
                            </n-space>
                        </template>
                    </n-card>
                </div>
                <n-pagination v-model:page="pagination.page" :page-count="pagination.page_count"
                    @update:page="loadBlog(current_user_id)" />
            </n-tab-pane>
            <n-tab-pane name="update" tab="修改文章">
                <n-form>
                    <n-form-item label="标题">
                        <n-input v-model:value="updateArticle.title" placeholder="请输入标题" />
                    </n-form-item>
                    <n-form-item label="分类">
                        <n-select v-model:value="updateArticle.category_id" :options="categoryOptions" />
                    </n-form-item>

                    <n-form-item label="内容">
                        <TextEditor v-model="updateArticle.content" />
                    </n-form-item>

                    <n-form-item label="">
                        <n-space>
                            <n-button @click="update">提交</n-button>
                        </n-space>
                    </n-form-item>
                    <n-form-item label="html格式">
                        {{ updateArticle.content }}
                    </n-form-item>
                </n-form>
                </n-tab-pane>
        </n-tabs>
    </div>
   

</template>

<script setup>
import { LoginStore } from '../../stores/LoginStores';
import { renderSlot } from 'vue';
import Category from './category.vue';
import TextEditor from "../../components/TextEditor.vue"
import { ref, reactive, inject, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
const router = useRouter()
const route = useRoute()
const message = inject("message")
const dialog = inject("dialog")
const axios = inject("axios")
const loginStore = LoginStore()
const categoryOptions = ref([])
const user_list = ref([])
const BlogList = ref([])
const blog_count = []
const tabValue = ref("list")
const updateArticle = reactive({
    title: "",
    content: "",
    category_id: 0,
    id: 0
})
const pagination = reactive({
    page: 1,
    page_size: 3,
    page_count: 0,
    blog_count: 0,
})
let UserInfo = ref(true)
let current_user_id = 0
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
const loadUserData = async () => {
    let res = await axios.get("/blog/search_user")
    user_list.value = res.data.rows


    for (let i = 0; i < user_list.value.length; i++) {
        SearchBlogNumber(i)
    }
    console.log(user_list.value)
}
const SearchBlogNumber = async (index) => {
    let res = await axios.get(`blog/search?creater_id=${user_list.value[index].id}`)
    user_list.value[index].count = res.data.data.count
}
const toUserBlog = async (user) => {
    UserInfo.value = !UserInfo.value
    current_user_id = user.id
    loadBlog(current_user_id)
}
const loadBlog = async (creater_id) => {
    let res = await axios.get(`/blog/search?page=${pagination.page}&pageSize=${pagination.page_size}&creater_id=${creater_id}`)
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
}
const back = () => {
    UserInfo.value = !UserInfo.value
}
const toUpdate = async(blog)=>{
    tabValue.value = "update"
    let res = await axios.get(`/blog/search_detail?id=${blog.id}`)
    console.log(res)
    updateArticle.id = blog.id
    updateArticle.title = res.data.rows[0].title
    updateArticle.content = res.data.rows[0].content
    updateArticle.category_id  = res.data.rows[0].category_id
}
const update=async()=>{
    let res = await axios.put("/blog/_token/update",updateArticle)
    if(res.data.code==200){
        message.info(res.data.msg)
    }else
    {
        message.error(res.data.msg)
    }
    loadBlog(current_user_id)
    tabValue.value = "list"
}
onMounted(() => {
    loadUserData()
    loadCategoty()
})
</script>

<style lang="scss" scoped></style>