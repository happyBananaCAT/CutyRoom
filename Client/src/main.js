import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import naive from 'naive-ui'
import { createDiscreteApi, darkTheme, lightTheme } from 'naive-ui'
import {router} from "./common/router"
import { createPinia } from 'pinia'
import axios from 'axios'
import { LoginStore } from './stores/LoginStores'
import P5UI from 'p5-ui'
import 'p5-ui/dist/style.css'
// axios,pinia,sass,vue-router,naive-ui,wangEditor
const app = createApp(App)

const { message, notification, dialog, loadingBar, modal } = createDiscreteApi(
    ['message', 'dialog', 'notification', 'loadingBar', 'modal'],
  )

axios.defaults.baseURL = "http://localhost:8000/" 
// axios.defaults.baseURL = "http://47.99.179.83/"

app.provide("axios",axios)
app.provide("message",message)
app.provide("notification",notification)
app.provide("dialog",dialog)
app.provide("loadingBar",loadingBar)
app.provide("modal",modal)
app.provide("server_url",axios.defaults.baseURL)
app.use(naive)
app.use(router)
app.use(createPinia())
app.use(P5UI)
app.mount(`#app`)

const loginStore = LoginStore()
axios.interceptors.request.use(config=>{
  config.headers.token = loginStore.token
  return config
})
