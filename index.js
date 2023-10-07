const express = require('express')
const app = express()
const port = 3000

app.all('*', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

app.get('/sse', (req, res) => {
    const str = 'hello word!'
    // 设置 SSE 相关的响应头
    res.setHeader('Content-Type', 'text/event-stream;charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    let index = 0
    const timer = setInterval(() => {
        if (index < str.length) {
            res.write("data: " + JSON.stringify({ content: str[index] }));
            index++
        } else {
            // 当所有数据都发送完毕时，结束响应
            clearInterval(timer); // 停止定时器
            res.end();
        }

    }, 200);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})