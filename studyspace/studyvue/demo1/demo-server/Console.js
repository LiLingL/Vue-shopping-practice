let user = require('./User.js')

console.log(`my name is ${user.userName},I say ${user.sayWorld} to you`)

let http = require('http');
let url = require('url')

let server = http.createServer((req,res)=>{
    res.statusCode = 200
    res.setHeader('Content-Type','text/plain; charset=utf-8')
    console.log(url.parse(req.url))
    res.end('hello,node')
})

server.listen(3000,'127.0.0.1',()=>{
    console.log("服务器已运行")
})
