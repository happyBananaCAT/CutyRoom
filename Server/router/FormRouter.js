const express = require("express")
const {db,genid} = require("../database/mysql")
const router = express.Router()
//增
router.post("/add",async(req,res)=>{
    let {answer} = req.body
    console.log(req.body)
    console.log(answer)
    const insert_sql = "insert into form (answer,creater) values (?,'asd') "
    let {err,rows} = await db.async.all(insert_sql,answer)
    if(err==null){
        res.send({
            code:200,
            msg:"提交成功",
        })
    }else{
        
        res.send({
            code:500,
            msg:"提交失败",
            err:err
        })
    }
})


module.exports = router