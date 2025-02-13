import { createRouter,createWebHashHistory } from "vue-router";


let routes =[
    {path:"/",component:()=>import("../views/dashboard/homepage.vue")},
    {path:"/test",component:()=>import("../views/test.vue")},
    {path:"/login",component:()=>import("../views/login.vue")},
    {path:"/dashboard",component:()=>import("../views/dashboard/dashboard.vue"),
        children:[
            {path:"/dashboard/category",component:()=>import("../views/dashboard/category.vue")},
            {path:"/dashboard/article",component:()=>import("../views/dashboard/article.vue")}
        ]
    },
    {path:"/UserDashboard",component:()=>import("../views/UserDashboard/UserDashboard.vue"),
        children:[
            {path:"/UserDashboard/AddBlog",component:()=>import("../views/UserDashboard/AddBlog.vue")},
            {path:"/UserDashboard/MyBlog",component:()=>import("../views/UserDashboard/MyBlog.vue")},
        ]
    },
]
const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export {router,routes}