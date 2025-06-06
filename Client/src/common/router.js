import { compile } from "vue";
import { createRouter,createWebHashHistory } from "vue-router";


let routes =[
    {path:"/",component:()=>import("../views/HomePageContent/homepage.vue")},
    {path:"/login",component:()=>import("../views/login.vue")},
    {path:"/detail",component:()=>import("../views/Details/details.vue")},
    {path:"/homepageDashboard",component:()=>import("../views/HomePageContent/homepageDashboard.vue"),
        children:[
            {path:"/homepageDashboard/join",component:()=>import("../views/HomePageContent/join.vue")},
            {path:"/homepageDashboard/members",component:()=>import("../views/HomePageContent/members.vue")},
            {path:"/homepageDashboard/toolbox",component:()=>import("../views/HomePageContent/toolbox.vue")},
            {path:"/homepageDashboard/artworks",component:()=>import("../views/HomePageContent/artworks.vue")}
        ]
    },
    {path:"/dashboard",component:()=>import("../views/AdminDashboard/dashboard.vue"),
        children:[
            {path:"/dashboard/category",component:()=>import("../views/AdminDashboard/category.vue")},
            {path:"/dashboard/article",component:()=>import("../views/AdminDashboard/article.vue")},
            {path:"/dashboard/AllUser",component:()=>import("../views/AdminDashboard/allUser.vue")}
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