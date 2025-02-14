const express = require("express")
const {db,genid} = require("../database/mysql")
const {v4:uuidv4} = require("uuid")
const UserRouter = express.Router()

UserRouter.post("/login",async(req,res)=>{
    let {account,password} = req.body
    let {err,rows} = await db.async.all("select * from user where account = ? and password=?",[account,password])
    // console.log(err,rows)
    if(err==null&&rows.length>0){
        let token = uuidv4();
        await db.async.all("update admin set token = ? where id =?",[token,rows[0].id])
        let user_info = rows[0]
        user_info = rows[0]
        res.send({
            code:200,
            msg:"登录成功",
            data:user_info
        })
    }else{
        res.send({
            code:500,
            msg:"登陆失败"
        })
    }
})

UserRouter.post("/register",async(req,res)=>{
    let {account,password} = req.body
    let {err,rows} = await db.async.all("select account from user")
    if(err==null){
        //判断是否有相同账号
        var cheak_account = rows.some( (each_row)=>{
           return each_row.account == account
        });
        if (cheak_account == true){
            res.send({
                code:400,
                msg:"已有相同账号"
            })
        }else{
            //生成token和用户id
            let token = uuidv4();
            let id = genid.NextId()
            //修改token，id
            let {err,rows}=await db.async.all("insert into user (`account`,`password`,`token`,`id`) values (?,?,?,?)", [account,password,token,id])
            //获取用户数据
            if(err==null){
                let user_info = rows[0]
                user_info = {
                    account:account,
                    password:"",
                    token:token,
                    id:id
                }
                res.send({
                    code:200,
                    msg:"注册成功",
                    data:user_info
                })
            }else{
                res.send({
                    code:500,
                    msg:"注册失败",
                })
            }
        }
    }
})

module.exports = UserRouter