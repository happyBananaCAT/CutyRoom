const express = require("express")
const {db,genid} = require("../database/mysql")
const router = express.Router()
// 为文章类别应该有添加，查询，删除，修改功能

//添加
router.post("/_token/add",async(req,res)=>{
    
    let {name} = req.body
    const insert_sql = "insert into category (`id`,`name`) values (?,?)"
    let {err,rows} = await db.async.all(insert_sql,[genid.NextId(),name])
    // console.log(err,rows)
    if(err==null){
        res.send({
            code:200,
            msg:"添加分类成功",
        })
    }else{
        res.send({
            code:500,
            msg:"添加分类失败"
        })
    }
})
//修改
router.put("/_token/update",async(req,res)=>{
    let {id,name} = req.body;
    let update_sql = "update category set name=? where id=?"
    let {err,rows} = await db.async.all(update_sql,[name,id])
    if(err==null){
        res.send({
            code:200,
            msg:"修改分类成功",
        })
    }else{
        res.send({
            code:500,
            msg:"修改分类失败"
        })
    }
})
//删除
router.delete("/_token/delete",async(req,res)=>{
    let id = req.query.id;
    let delete_sql = "delete from category where id = ?"
    let {err,rows} = await db.async.all(delete_sql,[id])
    if(err==null){
        res.send({
            code:200,
            msg:"删除分类成功",
        })
    }else{
        res.send({
            code:500,
            msg:"删除分类失败",
            err:err
        })
    }
})
//查询
router.get("/list",async(req,res)=>{
    const search_sql = "select * from category"
    let {err,rows} =await db.async.all(search_sql,[])
    if(err==null){
        res.send({
            code:200,
            msg:"查询分类成功",
            rows:rows
        })
    }else{
        res.send({
            code:500,
            msg:"查询分类失败"
        })
    }
})
module.exports = router