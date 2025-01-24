const express = require("express")
const {db,genid} = require("../database/mysql")
const {v4:uuidv4} = require("uuid")
const AdminRouter = express.Router()

AdminRouter.post("/login",async(req,res)=>{
    let {account,password} = req.body
    let {err,rows} = await db.async.all("select * from admin where account =? and password=?",[account,password])
    if(err==null&&rows.length>0){
        let token = uuidv4(); 
        await db.async.all("update admin set token = ? where id =?",[token,rows[0].id])
        let admin_info = rows[0]
        admin_info.token = token
        admin_info.password = ""
        res.send({
            code:200,
            msg:"登录成功",
            data:admin_info
        })
    }else{
        res.send({
            code:500,
            msg:"登陆失败"
        })
    }
})

module.exports = AdminRouter