//express , mysql,multer,uuid 
const express = require("express")
const app = express()
const path = require("path")
const {db,genid} = require("./database/mysql")
const multer = require("multer")
const upload = multer({
    dest:'./public/upload/temp'
})
const cors = require('cors');
const admin_token_path = "/_token"
const port = 8000
app.use(cors());

app.all("*",async(req,res,next)=>{
    if(req.path.indexOf(admin_token_path)!=-1){
            let {token} = req.headers;
            let admin_token_sql = "select * from admin where token = ?"
            let {err,rows} = await db.async.all(admin_token_sql,[token])
            if(err!=null||rows.length == 0){
                res.send({
                    code:403,
                    msg:"非管理员登录"
                })
                return
            }else{
                next()
            }
        }else{
        next()
    }
})
//跨域请求
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers","*")
    res.header("Access-Control-Allow-Methods","*")
    if(req.method == "OPTIONS") res.sendStatus(200)
    else next()
})
app.use(express.static(path.join(__dirname,"public")))//静态文件路径
app.use(express.json())
app.use(upload.any())
//注册路由
app.use("/test",require("./router/TestRouter"))
app.use("/admin",require("./router/AdminRouter"))
app.use("/user",require("./router/UserRouter"))
app.use("/category",require("./router/CategoryRouter"))
app.use("/blog",require("./router/BlogRouter"))
app.use("/upload",require("./router/UploadRounter"))

app.listen(port,()=>{
    console.log(`http://localhost:${port}/`)
})