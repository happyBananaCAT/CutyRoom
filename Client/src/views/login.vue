<template>

    <body class="login-body">
        <decorations />
        <div class="login-panel">
            <div class="login-logo">
                <img src="../assets/logo.png" alt="Logo">
                <h1>欢迎回来</h1>
            </div>
            <n-card v-if="type == `AdminLogin`">
                <template #header>
                    <div class="card-header">
                        <span>管理员登录</span>
                        <n-button @click="router.push('/')" class="button-back">返回首页</n-button>
                    </div>
                </template>
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

            <n-card v-else-if="type == `UserLogin`">
                <template #header>
                    <div class="card-header">
                        <span>用户登录</span>
                        
                    </div>
                </template>
                <template #header-extra>
                    <n-button @click="router.push('/')" class="button-back">返回首页</n-button>
                </template>
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

            <n-card v-else-if="type == `UserRegister`">
                <template #header>
                    <div class="card-header">
                        <span>用户注册</span>
                        <n-button @click="router.push('/')" class="button-back">返回首页</n-button>
                    </div>
                </template>
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
            <div class="login-footer">
                <p>© 2023 萌屋社区 </p>
            </div>

        </div>
    </body>
</template>

<script setup>

import { ref, reactive, inject, onMounted, onUnmounted } from 'vue'
import { LoginStore } from "../stores/LoginStores"
import Decorations from '../components/Decorations.vue'
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
        localStorage.setItem("id", loginStore.id)
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



const handleKeydown = (event) => {
    // 判断是否按下的是 Enter 键
    if (event.key === 'Enter') {
        if (type.value == 'UserLogin') {
            login('user'); // 调用按钮点击事件
        } else if (type.value == 'AdminLogin') {
            login('admin');
        } else if (type.value == 'UserRegister') {
            register()
        }
    }
};

// 在组件挂载时绑定全局键盘事件
onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
});

// 在组件卸载时移除全局键盘事件
onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
});
</script>

<style lang="scss" scoped>
.login-body {
    margin: 0;
    padding: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;

    .login-panel {
        width: 40vw;
        min-width: 400px;
        max-width: 500px;
        position: relative;
        z-index: 1;

        .login-logo {
            text-align: center;
            margin-bottom: 20px;

            img {
                width: 80px;
                height: 80px;
                margin-bottom: 10px;
            }

            h1 {
                color: #333;
                font-size: 24px;
                margin: 0;
            }
        }

        .login-card {
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            border: none;

            .card-header {
                span {
                    font-size: 18px;
                    font-weight: bold;
                    color: #333;
                }
            }

            .container {
                button {
                    transition: all 0.3s ease;

                    &:hover {
                        transform: translateY(-2px);
                    }
                }
            }
        }

        .login-footer {
            text-align: center;
            margin-top: 20px;
            color: #666;
            font-size: 12px;
        }
    }
}

@media (max-width: 767px) {
    .login-body {
        .login-panel {
            width: 90%;
            min-width: unset;

            .login-logo {
                img {
                    width: 60px;
                    height: 60px;
                }

                h1 {
                    font-size: 20px;
                }
            }
        }
    }
}
</style>