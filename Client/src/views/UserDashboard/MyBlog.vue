<template>
    <div>
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
                <n-space>
                    <n-pagination v-model:page="pagination.page" :page-count="pagination.page_count" @update:page="loadBlog" />
                </n-space>
            </n-tab-pane>
            <n-tab-pane name="update" tab="修改文章" >
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
import { ref, reactive, inject, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import Category from '../dashboard/category.vue';
import TextEditor from "../../components/TextEditor.vue"
const router = useRouter()
const route = useRoute()
const dialog = inject("dialog")
const message = inject("message")
const axios = inject("axios")
const loginStore = LoginStore()

const categoryOptions = ref([])
const BlogList = ref([])
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
    blog_count: 0
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
const loadBlog = async () => {
    let res = await axios.get(`/blog/search?page=${pagination.page}&pageSize=${pagination.page_size}&creater_id=${loginStore.id}`)
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
    loadBlog()
    tabValue.value = "list"
}
const deleteBlog = async(blog)=>{
    dialog.warning({
        title: '警告',
        content: '确定删除该分类吗？',
        positiveText: '确定',
        negativeText: '取消',
        draggable: true,
        onPositiveClick: async () => {
            let res = await axios.delete(`/blog/_token/delete?id=${blog.id}`)
            if (res.data.code == 200) {
                message.info(res.data.msg)
                loadBlog()
            } else {
                message.error(res.data.msg)
            }
        },
        onNegativeClick: () => {
            return
        }
    })
    
}
onMounted(() => {
    loadCategoty()
    loadBlog()
})
</script>

<style lang="scss" scoped></style>