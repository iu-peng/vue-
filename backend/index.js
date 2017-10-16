var url = require("url");
var http = require("https");
const express = require('express');
const proxy = require('http-proxy-middleware');//引入代理中间件
const app = express();

const fs = require('fs');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/JSON
app.use(bodyParser.json())  // 解析json的格式

const utils = require('./lib/utils.js')

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})
let shopList = {};
fs.readFile('./data/offtengoods.json', (error, data) => {
  shopList = {
    list: JSON.parse(data.toString())
  }
})

let goodskind = {};
fs.readFile('./data/goodskind.json', (error, data) => {
  goodskind = {
    list: JSON.parse(data.toString())
  }
})

app.get('/api/offtengoods', (req, res) => {
  // 暂时先已读取的形式
  res.send(shopList)
})
app.get('/api/goodskind', (req, res) => {
  // 暂时先已读取的形式
  res.send(goodskind)
})

/*app.post('/api/getItem', (req, res) => {
  let {itemId} = req.body;
  let d = fs.readFileSync('./data/shop-item.json')
  if(d.toString()){
    d = JSON.parse(d.toString())
    for(var goodId in d){
      if(goodId === itemId){
        res.send(d[goodId])
      }
    }
  }
})*/


app.post('/api/setShopCarList', (req, res) => {
  let {carList} = req.body
  let isExist = fs.existsSync('./data/carList.json')
  let arr = []
  if(isExist){
    let d = fs.readFileSync('./data/carList.json')
    if(d.toString()){
      arr = JSON.parse(d);
    }

  }
  let getDate = JSON.parse(carList);

  let findData = arr.find((item) => {
    return item.goodsId === getDate.goodsId
  })

  if(findData){
    if(findData.count < 5){
      findData.count = ++findData.count
    }else{
      res.send({
        code: 1,
        mesText: '已达到上限',
        order_list: arr
      })
      return;
    }


  }else {
    getDate.count = 1
    // getDate.price = shopItem.list[getDate.goodsId].data.price
    //getDate.price = shopItem.list[getDate.goodsId].data.price
    arr.push(getDate);
  }

  fs.writeFileSync('./data/carList.json', JSON.stringify(arr))

  res.send({
    code: 0,
    order_list: arr
  })


})

//增加一个
app.post('/api/addOne', (req, res) => {
  let {goodsId} = req.body
  let isExist = fs.existsSync('./data/carList.json')//获取的是购物车内商品的所有的信息
  let arr = []
  if(isExist){//如果有商品，读取文件内的商品
    let d = fs.readFileSync('./data/carList.json')
    if(d.toString()){
      arr = JSON.parse(d);
    }
  }
  //将发送过来的单个的商品数据转为对象
  let getDate = JSON.parse(goodsId);
  console.log(getDate)
  //在所有的商品信息中找到该id对应的商品
  let findData = arr.find((item) => {
    return item.goodsId === getDate
  })
  //如果购物车中有该商品
  if(findData){
    //判断商品数量是否<5个，是的话，就添加
    if(findData.count < 5){
      findData.count = ++findData.count
      //否则就发送添加失败信息
    }else{
      res.send({
        code: 1,
        mesText: '已达到上限',
        order_list: arr
      })
      return;
    }
  }
  // 写入购物车数据
  fs.writeFileSync('./data/carList.json', JSON.stringify(arr))

  res.send({
    code: 0,
    order_list: arr
  })
})

//减少一个
app.post('/api/reduceOne', (req, res) => {
  let {reduceId} = req.body
  let isExist = fs.existsSync('./data/carList.json')//获取的是购物车内商品的所有的信息
  let arr = []
  if(isExist){//如果有商品，读取文件内的商品
    let d = fs.readFileSync('./data/carList.json')
    if(d.toString()){
      arr = JSON.parse(d);
    }
  }
  //将发送过来的单个的商品数据转为对象
  let getDate = JSON.parse(reduceId);
  //在所有的商品信息中找到该id对应的商品
  let findData = arr.find((item) => {
    return item.goodsId === getDate
  })
  //如果购物车中有该商品
  if(findData){//减少的时候肯定有该信息
    //判断商品数量是否>1个，最少为一个是的话，就添加
    if(findData.count > 1){
      findData.count = --findData.count
      //否则就发送添加失败信息
    }else{
      res.send({
        code: 1,
        mesText: '最少为1件',
        order_list: arr
      })
      return;
    }
  }
  // 写入购物车数据
  fs.writeFileSync('./data/carList.json', JSON.stringify(arr))

  res.send({
    code: 0,
    order_list: arr
  })
})

app.get('/api/getOrderList', (req, res) => {
  let isExist = fs.existsSync('./data/carList.json')
  if(isExist){
    let d = fs.readFileSync('./data/carList.json')
    if(d.toString()){
      res.send({
        order_list: JSON.parse(d)
      })
    }
    return

  }
  res.send({
    order_list: []
  })
})
/* fs.readFile('./data/shop-item.json', (error, data) => {
  let data2 = JSON.parse(data.toString());
  let json = {};
  data2.map((item) => {
    if(item.data){
      json[item.data.id] = item
    }
  })
}) */
//删除一个
app.post('/api/delOne', (req, res) => {
  let {delId} = req.body;
  console.log(delId)
  let isExist = fs.existsSync('./data/carList.json')
  if(isExist){
    let d = fs.readFileSync('./data/carList.json')
    if(d.toString()){
      d = JSON.parse(d.toString())
      d = d.filter(item => {
        return item.goodsId !== delId
      })
      fs.writeFileSync('./data/carList.json', JSON.stringify(d))
      res.send({
        order_list: d
      })
    }
  }
})

//用户名验证
app.post('/api/loginUserName', (req, res) => {
  let {username} = req.body
  let isExist = fs.existsSync('./data/userList.json')
  let arr = []
  if(isExist){
    let d = fs.readFileSync('./data/userList.json')
    if(d.toString()){
      arr = JSON.parse(d)
    }
  }
  //let getDate = JSON.parse({username});
  //console.log(getDate)
  //console.log(username)

  let findData = arr.find((item) => {
    return item.username === username
  })
  //如果用户名存在
  if(findData){
    res.send({
      code: 0,
      mesText: '用户名存在',
      validate:true
    })
    return;
  }else {
    res.send({
      code: 1,
      mesText: '用户名不存在',
      validate:false
    })
  }
  /*fs.writeFileSync('./data/userList.json', JSON.stringify(arr))
  res.send({
    code: 0,
    order_list: arr
  })*/


})


//用户密码验证
app.post('/api/loginPassword', (req, res) => {
  let {username,password,check} = req.body
  let isExist = fs.existsSync('./data/userList.json')
  let arr = []
  if(isExist){
    let d = fs.readFileSync('./data/userList.json')
    if(d.toString()){
      arr = JSON.parse(d)
    }
  }
  //let getDate = JSON.parse(username);
  //console.log(username,password)

  let findData = arr.find((item) => {
    return item.username === username
  })
  /*1. 如果用户名存在
      密码相等
      密码不等
    2. 用户名不存在
      1. 针对密码框失去焦点的请求
      2. 针对点击登陆的请求*/

  if(findData){
    //用户名和密码匹配
    if(findData.password === password){
      res.send({
        code: 0,
        mesText: '密码正确',
        validate:true
      })
      return;
    }else{
      res.send({
        code: 1,
        mesText: '密码错误',
        validate:false
      })
    }
    //用户名不存在自动注册
  }else {
    //判断密码框失去焦点时判断密码错误
    if(check){
      res.send({
        code: 1,
        mesText: '密码错误',
        validate:true
      })
    }else{
      arr.push({
        "username":username,
        "password":password
      })

      fs.writeFileSync('./data/userList.json', JSON.stringify(arr))
      res.send({
        code: 0,
        mesText: '用户自动注册',
        validate:true
      })
    }
  }
})


function getPagesHtml(urls){
    return new Promise((resolve,reject) => {
        var urlParse = url.parse(urls);

        let options = {
          hostname:urlParse.hostname,
          path:urlParse.path
        }

        let req = http.request(options,(res)=>{
          var arr = [];
          res.on('data', (chunk) => {
            arr.push(chunk);
          });
          res.on('end', () => {
            resolve(arr);
          });

          res.on("error",(err)=>{
            reject(err)
          });

         });

        req.on("error", (err)=>{
          reject(err)
        })

        req.end();
    });
}
//请求未来天气
app.get('/api/weatherNext',function (req,res){
  getPagesHtml('https://api.seniverse.com/v3/weather/daily.json?key=zaeco6ttnzzrmlkv&location=beijing&language=zh-Hans&unit=c&start=0&days=5')
  .then(function (data){
    res.send(data.toString());
  }) 
})
//请求当日天气
app.get('/api/weatherToday',function (req,res){
  getPagesHtml('https://api.seniverse.com/v3/weather/now.json?key=zaeco6ttnzzrmlkv&location=beijing&language=zh-Hans&unit=c')
  .then(function (data){
    res.send(data.toString());
  })  
})
//查询指定城市未来的天气
app.get('/api/weatherCity',function (req,res){
  let cityname = req.query.cityname
  console.log(cityname)
  getPagesHtml(`https://api.seniverse.com/v3/weather/daily.json?key=zaeco6ttnzzrmlkv&location=${cityname}&language=zh-Hans&unit=c&start=0&days=5`)
  .then(function (data){
    
    res.send(data.toString());
  })  
})

//请求24小时时段天气
app.get('/api/24hours',function (req,res){
  getPagesHtml('https://weatherapi.market.xiaomi.com/wtr-v3/weather/all?latitude=110&longitude=112&locationKey=weathercn%3A101010100&days=15&appKey=weather20151024&sign=zUFJoAR2ZVrDy1vF3D07&isGlobal=false&locale=zh_cn')
  .then(function (data){
    res.send(data.toString());
  }) 
})
//https://weatherapi.market.xiaomi.com/wtr-v3/weather/all?latitude=110&longitude=112&locationKey=weathercn%3A101010100&days=15&appKey=weather20151024&sign=zUFJoAR2ZVrDy1vF3D07&isGlobal=false&locale=zh_cn

/*app.get('/item', (req, res) => {
  let {id} = req.query;

})*/
//'192.168.2.81',
app.listen(3100,  () => {
  console.log('Listening on: http://192.168.2.81:3100');
});
