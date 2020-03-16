let http = require('http')

http.get('http://www.imooc.com/search/hotwords',(res)=>{
    let data = '';
    res.on('data', (t)=>{
        data += t;
    })

    res.on('end', ()=>{
        let result = JSON.parse(data)
        console.log(result)
    })
})
