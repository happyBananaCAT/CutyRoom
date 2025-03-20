<template>
    <div class="container">
        <n-button @click="back()">返回</n-button>
        <n-h1>{{ BlogInfo.title }}</n-h1>
        <div>
            <div v-html="BlogInfo.content" class="text">
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { setBlockTracking } from 'vue';
import { ref, reactive, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router';
const route = useRoute()
const router = useRouter()
const message = inject("message")
const dialog = inject("dialog")
const axios = inject("axios")
const BlogInfo = ref([])


const loadBlog = async () => {
    let res = await axios.get("/blog/search_detail?id=" + route.query.id)
    BlogInfo.value = res.data.rows[0]
}
const back = ()=>{
    router.back()
}
onMounted(() => {
    loadBlog()
})
</script>
<style>
.text img{
    max-width: 100% !important;
}
</style>
<style lang="scss" scoped>
.container {
    width: 80vw;
    margin: 0 auto;
    word-wrap: break-word; /* 允许在单词内换行 */
    overflow-wrap: break-word; /* 同上 */
    white-space: normal; /* 默认值，允许换行 */
}

</style>