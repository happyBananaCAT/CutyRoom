import { compile } from "vue";
import { createRouter,createWebHashHistory } from "vue-router";


let routes =[
    {path:"/",component:()=>import("../views/dashboard/homepage.vue")},
    
    {path:"/test",component:()=>import("../views/test.vue")},
    {path:"/login",component:()=>import("../views/login.vue")},
    {path:"/detail",component:()=>import("../views/Details/details.vue")},
    {path:"/dashboardHome",component:()=>import("../views/dashboard/HomepageContent/dashboardHome.vue"),
        children:[
            {path:"/dashboardHome/join",component:()=>import("../views/dashboard/HomepageContent/join.vue")},
            {path:"/dashboardHome/members",component:()=>import("../views/dashboard/HomepageContent/members.vue")},
            {path:"/dashboardHome/toolbox",component:()=>import("../views/dashboard/HomepageContent/toolbox.vue")},
            {path:"/dashboardHome/account",component:()=>import("../views/dashboard/HomepageContent/accounts.vue")},
            {path:"/dashboardHome/artworks",component:()=>import("../views/dashboard/HomepageContent/artworks.vue")}
        ]
    },
    {path:"/dashboard",component:()=>import("../views/dashboard/dashboard.vue"),
        children:[
            {path:"/dashboard/category",component:()=>import("../views/dashboard/category.vue")},
            {path:"/dashboard/article",component:()=>import("../views/dashboard/article.vue")},
            {path:"/dashboard/AllUser",component:()=>import("../views/dashboard/AllUser.vue")}
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