<template>
    <div class="container">
        <n-button @click="back()">返回</n-button>
        <n-h1>{{ BlogInfo.title }}</n-h1>
        <div>
            <div v-html="BlogInfo.content" class="text">
            </div>
        </div>
        <ToTopButton></ToTopButton>
    </div>
</template>

<script setup>
import { setBlockTracking } from 'vue';
import { ref, onMounted, onBeforeUnmount } from "vue";
import { reactive, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import ToTopButton from '../../components/ToTopButton.vue';
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
const back = () => {
    router.back()
}
onMounted(() => {
    loadBlog()
})
</script>
<style>
.text img {
    max-width: 100% !important;
}
</style>
<style lang="scss" scoped>
.container {
    width: 80vw;
    margin: 0 auto;
    word-wrap: break-word;
    /* 允许在单词内换行 */
    overflow-wrap: break-word;
    /* 同上 */
    white-space: normal;
    /* 默认值，允许换行 */
}

.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
  transition: opacity 0.3s;
}

.back-to-top:hover {
  background-color: #555;
}

.fa-arrow-up {
  font-size: 24px;
}
</style>