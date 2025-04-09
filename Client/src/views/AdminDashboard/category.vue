<template>
    <div>
        <n-button @click="showAddModal = true">添加</n-button>
        <n-table :bordered="false" :single-line="false">
            <thead>
                <tr>
                    <th>编号</th>
                    <th>名称</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(category, index) in category_list">
                    <td>{{ category.id }}</td>
                    <td>{{ category.name }}</td>
                    <td>
                        <n-space>
                            <n-button @click="toUpdate(category)">修改</n-button>
                            <n-button @click="deleteCategory(category)">删除</n-button>
                        </n-space>
                    </td>
                </tr>
            </tbody>
        </n-table>

        <n-modal v-model:show="showAddModal" preset="dialog" title="Dialog">
            <template #header>
                <div>添加分类</div>
            </template>
            <n-input v-model:value="addCategory.name" type="text" placeholder="请输入分类名称"></n-input>
            <template #action>
                <div>
                    <n-button @click="add">提交</n-button>
                </div>
            </template>
        </n-modal>

        <n-modal v-model:show="showUpdateModal" preset="dialog" title="Dialog">
            <template #header>
                <div>修改分类</div>
            </template>
            <n-input v-model:value="updateCategory.name" type="text" placeholder="请输入分类名称"></n-input>
            <template #action>
                <div>
                    <n-button @click="update">提交</n-button>
                </div>
            </template>
        </n-modal>
    </div>
</template>

<script setup>
import { LoginStore } from '../../stores/LoginStores';
import { renderSlot } from 'vue';
import { ref, reactive, inject, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
const router = useRouter()
const route = useRoute()
const message = inject("message")
const dialog = inject("dialog")
const axios = inject("axios")
const loginStore = LoginStore()

const showAddModal = ref(false)
const category_list = ref([])
const addCategory = reactive({
    name: ""
})
const showUpdateModal = ref(false)
const updateCategory = reactive({
    name: "",
    id:0
})
onMounted(() => {
    loadData()
})

const loadData = async () => {
    let res = await axios.get("/category/list")
    category_list.value = res.data.rows
}

const check_duplicate = (category) => {
    var cheak = category_list.value.some((each_name) => {
        return each_name.name == category.name
    })
    if (cheak == true) {
        return true
    }
}
const add = async () => {
    if (addCategory.name == "") {
        message.error("请输入分类名")
    } else if (check_duplicate(addCategory) == true) {
        message.error("已有相同分类")
    } else {
        let result = await axios.post("category/_token/add", { name: addCategory.name })
        console.log(result)
        if (result.data.code == 200) {
            showAddModal.value = false
            loadData()
            message.info(result.data.msg)
        } else {
            message.error(result.data.msg)
        }
    }

}
const toUpdate = async(category)=>{
    showUpdateModal.value = true
    updateCategory.id = category.id
    updateCategory.name = category.name
}

const update = async () => {
    if (updateCategory.name == "") {
        message.error("分类名不能为空")
    } else if (check_duplicate(updateCategory)==true) {
        message.error("已有相同分类")
    }else{
        let result =await axios.put("category/_token/update",{name:updateCategory.name,id:updateCategory.id})
        if(result.data.code == 200){
            message.info(result.data.msg)
            loadData()
            showUpdateModal==false
        }else{
            message.error(result.data.msg)
        }
        
    }
}

const deleteCategory = async (category) => {
    dialog.warning({
        title: '警告',
        content: '确定删除该分类吗？',
        positiveText: '确定',
        negativeText: '取消',
        draggable: true,
        onPositiveClick: async () => {
            let res = await axios.delete(`/category/_token/delete?id=${category.id}`)
            if (res.data.code == 200) {
                message.info(res.data.msg)
                loadData()
            } else {
                message.error(res.data.msg)
            }
        },
        onNegativeClick: () => {
            return
        }
    })


}
</script>

<style lang="scss" scoped></style>