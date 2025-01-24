import { createRouter,createWebHashHistory } from "vue-router";


let routes =[
    {path:"/",component:()=>import("../views/login.vue")},
    {path:"/test",component:()=>import("../views/test.vue")},
    {path:"/login",component:()=>import("../views/login.vue")},
    {path:"/dashboard",component:()=>import("../views/dashboard/dashboard.vue"),
        children:[
            {path:"/dashboard/category",component:()=>import("../views/dashboard/category.vue")},
            {path:"/dashboard/article",component:()=>import("../views/dashboard/article.vue")}
        ]
    },
    {path:"/main",component:()=>import("../views/main.vue")},
]
const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export {router,routes}