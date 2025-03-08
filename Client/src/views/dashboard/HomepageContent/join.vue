<template>
    
    <div class="form">
        <p5-title content="调查问卷"  class="title"></p5-title>
        <p style="font-size: 18px;">萌屋游戏工作室是湘潭大学。。。。（介绍词）</p>
        <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" :size="size" label-placement="top">
            <n-form-item label="姓名" path="name">
                <n-input v-model:value="formValue.name" placeholder="输入姓名" />
            </n-form-item>
            <n-form-item label="年龄" path="age">
                <n-input v-model:value="formValue.age" placeholder="输入年龄" />
            </n-form-item>
            <n-form-item label="电话号码" path="phone">
                <n-input v-model:value="formValue.phone" placeholder="电话号码" />
            </n-form-item>
            <n-form-item>
                <n-button attr-type="button" @click="Submit">
                    提交
                </n-button>
            </n-form-item>
        </n-form>
    </div>
</template>

<script setup>
import { useMessage } from "naive-ui";
import { ref, reactive, inject, onMounted } from 'vue'
const dialog = inject("dialog")
const message = inject("message")
const axios = inject("axios")
const formRef = ref(null)
const size = ref("medium")
const formValue = ref({
    name: "",
    age: "",
    phone: ""
});
const formData = {
    answer:""
}
let rules = {
    name: { required: true, message: "请输入姓名", trigger: "blur" },
    age: { required: true, message: "请输入年龄", trigger: ["input", "blur"] },
    phone: { required: true, message: "请输入电话号码", trigger: ["input"] }
}
const Submit = async () => {

    formRef.value.validate(async (errors) => {
        if (errors) {
            return
        } else {
            let answer = Object.values(formValue.value).join("|")
            formData.answer = answer
            let res = await axios.post("/form/add", formData)
            console.log(res)
        }
    })
}
</script>
<style lang="scss" scoped>
.form {
    border-radius: 5px;
    margin: 5vh auto;
    padding: 15px;
    width: 80%;
    background-color: white;
}
.title{
    font-size: 40px;
    
}
</style>