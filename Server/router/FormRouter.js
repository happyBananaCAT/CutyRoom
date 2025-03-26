const express = require("express");
const fs = require("fs");
const path = require("path");
const { db, genid } = require("../database/mysql");
const router = express.Router();
const filePath = path.join(__dirname, "../public/questionare.txt");

router.post("/add", async (req, res) => {
    try {
        let  answer  = req.body;
        const answerString = JSON.stringify(answer, null, 2); // 格式化输出
        //console.log(answerString)
        // 读取文件内容
        let fileContent = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";

        // 如果文件不为空，添加一个换行符
        if (fileContent.trim()) {
            fileContent += "\n\n";
        }

        // 将新数据追加到文件内容
        fileContent += answerString;

        // 写入文件
        fs.writeFileSync(filePath, fileContent);

        // 返回成功响应
        res.send({
            code: 200,
            msg: "提交成功",
        });
    } catch (err) {
        console.error(err);

        // 返回失败响应
        res.send({
            code: 500,
            msg: "提交失败",
            err: err.message,
        });
    }
});

module.exports = router;