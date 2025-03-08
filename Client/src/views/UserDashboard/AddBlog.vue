<template>
    <div>
        写文章
        <n-form>
                    <n-form-item label="标题">
                        <n-input v-model:value="addArticle.title" placeholder="请输入标题" />
                    </n-form-item>
                    <n-form-item label="分类">
                        <n-select v-model:value="addArticle.category_id" :options="categoryOptions"/>
                    </n-form-item>

                    <n-form-item label="内容">
                        <TextEditor v-model="addArticle.content" />
                        <n-button @click="saveContent">保存内容</n-button>
                    </n-form-item>

                    <n-form-item label="">
                        <n-space>
                            <n-button @click="add">提交</n-button>
                        </n-space>
                    </n-form-item>
                    <n-form-item label="html格式">
                        {{ addArticle.content }}
                    </n-form-item>



                </n-form>
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
const addArticle = reactive({
    title: "",
    content: "",
    category_id: 0,
    creater_id:loginStore.id,
    creater_name:loginStore.account,
})
const pagination = reactive({
    page: 1,
    page_size: 3,
    page_count: 0,
    blog_count: 0
})
const add = async () => {
    console.log(addArticle)
    if (addArticle.title == "") {
        message.error("未输入标题");
    } else if (addArticle.content == "") {
        message.error("未输入文章内容")
    } else if (addArticle.category_id == 0) {
        message.error("未输入选择分类")
    } else {
        console.log(addArticle)
        let res = await axios.post("/blog/add", addArticle)
        console.log(res)
        if (res.data.code == 200) {
            message.info(res.data.msg)
        } else {
            message.error(res.data.msg)
        }
        loadBlog()
    }
}
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
    let res = await axios.get(`/blog/search?page=${pagination.page}&pageSize=${pagination.page_size}`)
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
const saveContent = () => {
    const content = addArticle.content;
    localStorage.setItem('editorContent', content);
};
onMounted(() => {
    console.log(localStorage.editorContent) 
    let savedContent= localStorage.getItem('editorContent')
    addArticle.content = savedContent
    loadCategoty()
    loadBlog()
})
</script>

<style lang="scss" scoped>

</style>