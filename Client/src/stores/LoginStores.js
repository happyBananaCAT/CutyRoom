import {defineStore} from 'pinia'

export const LoginStore = defineStore("login",{
    state:()=>{
        return{
            id:0,
            account:"",
            token:"",
            state:""
        }
    },
    actions:{},
    getters:{}
})