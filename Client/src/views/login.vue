<template>

    <body>
        <div class="login-panel">
            <n-card title="管理员登录" v-if="type == `AdminLogin`">
                <n-form :rules="rules" :model="LoginConfig">
                    <n-form-item path="account" label="账号">
                        <n-input v-model:value="LoginConfig.account" placeholder="请输入账号" />
                    </n-form-item>
                    <n-form-item path="password" label="密码">
                        <n-input v-model:value="LoginConfig.password" type="password" placeholder="请输入密码" />
                    </n-form-item>
                </n-form>
                <template #footer>
                    <div class="container">
                        <n-checkbox v-model:checked="LoginConfig.remember" label="记住我" />
                        <n-button @click="login('admin')">登录</n-button>
                        <n-button @click="type = `UserLogin`"> 切换为用户</n-button>
                    </div>
                </template>
            </n-card>

            <n-card title="用户登录" v-else-if="type == `UserLogin`">
                <n-form :rules="rules" :model="LoginConfig">
                    <n-form-item path="account" label="账号">
                        <n-input v-model:value="LoginConfig.account" placeholder="请输入账号" />
                    </n-form-item>
                    <n-form-item path="password" label="密码">
                        <n-input v-model:value="LoginConfig.password" type="password" placeholder="请输入密码" />
                    </n-form-item>
                </n-form>
                <template #footer>
                    <div class="container">
                        <n-checkbox v-model:checked="LoginConfig.remember" label="记住我" />
                        <n-button @click="login('user')">登录</n-button>
                        <n-button @click="type = `AdminLogin`"> 切换为管理员</n-button>
                        <n-button @click="type = `UserRegister`"> 注册账号</n-button>
                    </div>
                </template>
            </n-card>

            <n-card title="用户注册" v-else-if="type == `UserRegister`">
                <n-form :rules="rules" :model="LoginConfig" ref="formRef">
                    <n-form-item path="account" label="账号">
                        <n-input v-model:value="LoginConfig.account" placeholder="请输入账号" />
                    </n-form-item>
                    <n-form-item path="password" label="密码">
                        <n-input v-model:value="LoginConfig.password" type="password" placeholder="请输入密码" />
                    </n-form-item>
                </n-form>
                <template #footer>
                    <div class="container">
                        <n-checkbox v-model:checked="LoginConfig.remember" label="记住我" />
                        <n-button @click="register">注册</n-button>
                        <n-button @click="type = `AdminLogin`"> 切换为管理员</n-button>
                        <n-button @click="type = `UserLogin`"> 返回登录</n-button>
                    </div>

                </template>
            </n-card>


        </div>
    </body>
</template>

<script setup>

import { ref, reactive, inject, onMounted } from 'vue'
import { LoginStore } from "../stores/LoginStores"

import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const message = inject("message")
const axios = inject("axios")
const loginStore = LoginStore()

const type = ref("UserLogin")
const formRef = ref(null)
let rules = {
    account: [
        { required: true, message: "请输入账号", trigger: "blur" },
        { min: 3, max: 20, message: "账号应有3到20个字符", trigger: "blur" }
    ],
    password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, max: 20, message: "密码应有6到20个字符", trigger: "blur" }
    ]
}

const LoginConfig = reactive({
    account: localStorage.getItem("account") || "",
    password: localStorage.getItem("password") || "",
    remember: localStorage.getItem("remember") == 1 || false
})
//登录逻辑
const login = async (login_state) => {
    let result;
    //判断管理员登录和用户登录
    if (login_state == 'admin') {
        result = await axios.post("/admin/login", {
            account: LoginConfig.account,
            password: LoginConfig.password
        })
    } else if (login_state == 'user') {
        result = await axios.post("/user/login", {
            account: LoginConfig.account,
            password: LoginConfig.password
        })
    }
    //成功登录后
    if (result.data.code == 200) {
        //保存各类信息
        loginStore.token = result.data.data.token
        loginStore.account = result.data.data.account
        loginStore.id = result.data.data.id
        localStorage.setItem("id",loginStore.id)
        loginStore.state = (login_state == 'admin' ? 'admin' : 'user')
        if (LoginConfig.remember) {
            localStorage.setItem("account", LoginConfig.account)
            localStorage.setItem("password", LoginConfig.password)
            localStorage.setItem("remember", LoginConfig.remember ? 1 : 0)
        }
        login_state == 'admin' ? router.push("/dashboard") : router.push("/UserDashboard")
        message.info(login_state == 'user' ? `亲爱的 ${result.data.data.account},您好！` : `管理员${result.data.data.account}登录成功`)
    } else {
        message.error("登录失败,请检查您的账号和密码(区分大小写)")
    }

}

const register = async () => {
    let error;
    console.log(error)
    formRef.value.validate(async (errors) => {
        if (errors) {
            error = errors
        } else if (!errors) {
            let result = await axios.post("/user/register", {
                account: LoginConfig.account,
                password: LoginConfig.password
            })

            if (result.data.code == 400) {
                message.error("已有相同账号")
            } else if (result.data.code == 200) {
                message.info("注册成功")
                // type.value = 'UserLogin'
            } else {
                message.error("注册失败")
            }
        }
    })
}
</script>

<style lang="scss" scoped>
.login-panel {
    width: 40vw;
    height: 40vh;
    position: fixed;
    top: 30%;
    left: 30%;

}

.container {
    display: flex;
    justify-content: space-around;
    align-items: center;
}
</style>