const express = require("express")
const {db,genid} = require("../database/mysql")
const fs = require("fs")
const router = express.Router()
router.post("/editor_upload",async(req,res)=>{
    if(!req.files){
        res.send({
            "errno": 1, // 只要不等于 0 就行
            "message": "失败信息"
        })
        return
    }
    let files = req.files
    let ret_files_src = []
    console.log(files)
    for(let file of files){
        //获取文件名
        let file_ext = file.originalname.substring(file.originalname.lastIndexOf(".")+1)
        //随机重命名文件
        let file_new_name = genid.NextId()+"."+file_ext
        fs.renameSync(
                    process.cwd()+"/public/upload/temp/"+file.filename,
                    process.cwd()+"/public/upload/"+file_new_name
                )
        ret_files_src.push("/upload/"+file_new_name)
    }

    res.send({
        "errno": 0, // 注意：值是数字，不能是字符串
        "data": {
            "url": ret_files_src[0], // 图片 src ，必须
            // "alt": "yyy", // 图片描述文字，非必须
            // "href": "zzz" // 图片的链接，非必须
        }
    })
})



module.exports = router