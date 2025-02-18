const express = require("express")
const {db,genid} = require("../database/mysql")
const router = express.Router()
//博客表增删改查

//增
router.post("/add",async(req,res)=>{
    let {title,content,category_id,creater_id,creater_name} = req.body
    let id = genid.NextId()
    let create_time = new Date().getTime()
    const insert_sql = "insert into blog (id , title , content , category_id , create_time,creater_id,creater_name) values (?,?,?,?,?,?,?)"
    let {err,rows} = await db.async.all(insert_sql,[id,title,content,category_id,create_time,creater_id,creater_name])
    if(err==null){
        res.send({
            code:200,
            msg:"添加博客成功",
        })
    }else{
        
        res.send({
            code:500,
            msg:"添加博客失败",
            err:err
        })
    }
})
//删
router.delete("/_token/delete",async(req,res)=>{
    let id = req.query.id
    const delete_sql = "delete from blog where id = ?"
    let {err,rows} = await db.async.all(delete_sql,[id])
    if(err==null){
        res.send({
            code:200,
            msg:"删除博客成功",
        })
    }else{
        res.send({
            code:500,
            msg:"删除博客失败"
        })
    }
})


//改
router.put("/_token/update",async(req,res)=>{
    let {id,title,content,category_id} = req.body
    let create_time = new Date().getTime()
    const update_sql = "update blog set title = ?,content = ?,category_id = ? where id = ?"
    let {err,rows} = await db.async.all(update_sql,[title,content,category_id,id])
    if(err==null){
        res.send({
            code:200,
            msg:"修改博客成功",
        })
    }else{
        res.send({
            code:500,
            msg:"修改博客失败",
            err:err
        })
    }
})

//查所有文章
//功能：分页，关键字查询，分类查询，用户id查询
router.get("/search",async(req,res)=>{
    let {keyword,category_id,page,pageSize,creater_id} = req.query
    // 关键字查询，包括分类（category_id）和关键字(title)
    //分页：需要页码和分页大小
    //查询某个用户的所有文章:需要用户id
    page = (page==null)?1:page;
    pageSize = (pageSize==null)? 10 :pageSize
    keyword =(keyword==null)?"":keyword
    category_id = (category_id==null)?0:category_id
    creater_id = (creater_id==null)?0:creater_id
    let where_sql = []
    let params = []
    let where_sql_str =""
    //查询语句拼装
    if(category_id !=0){
        where_sql.push(" category_id = ?")
        params.push(category_id)
    }
    if(keyword!=""){
        where_sql.push("( title like ? or content like ? )")
        params.push("%"+keyword+"%")
        params.push("%"+keyword+"%")
    }
    if(creater_id!=0){
        where_sql.push("creater_id= ?")
        params.push(creater_id)
    }
    if(where_sql.length>0){
        where_sql_str = " "+"where"+" "+where_sql.join(" and ")
    }
    //查询分页数据
    let search_sql = "select `id`,`category_id`,`title`,`create_time`,LEFT(`content`,100) as `content`,`creater_id`,`creater_name`  from blog "+where_sql_str+" order by create_time desc limit ? , ? "
    let searchParams = params.concat([(page - 1) * pageSize, Number(pageSize)])
    // console.log(search_sql,searchParams,params)
    //查询数据总数
    let search_count_sql = "select count(*) from blog"+where_sql_str

    let searchResult = await db.async.all(search_sql,searchParams)
    let countResult = await db.async.all(search_count_sql,params)

    if(searchResult.err == null&&countResult.err==null){
        res.send({
            code:200,
            msg:"查询博客成功",
            data:{
                keyword,
                category_id,
                page,
                pageSize,
                rows:searchResult.rows,
                count:countResult.rows[0]["count(*)"]
            }
        })
    }else{
        res.send({
            code:500,
            msg:"查询失败",
            err1:searchResult.err,
            err2:countResult.err

        })
    }

})
//查单个 
router.get("/search_detail",async(req,res)=>{
    let {id} = req.query;
    let sql = "select * from blog where id = ?"
    let {err,rows} = await db.async.all(sql,[id])
    if(err==null){
        res.send({
            code:200,
            msg:"查询成功",
            rows:rows
        })
    }else{
        res.send({
            code:500,
            msg:"查询失败"
        })
    }
})
//查用户信息
router.get("/search_user",async(req,res)=>{
    let sql = "select id,account from user"
    let {err,rows} = await db.async.all(sql)
    if(err==null){
        res.send({
            code:200,
            msg:"查询成功",
            rows:rows
        })
    }else{
        res.send({
            code:500,
            msg:"查询失败"
        })
    }
})

module.exports = router