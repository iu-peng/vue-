var url = require("url");
var http = require("https");
const express = require('express');
const app = express();


const proxy = require('http-proxy-middleware');//引入代理中间件


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
let fs = require('fs');
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

app.get('/aaa',function (req,res){
	getPagesHtml('https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?g_tk=5381&uin=0&format=json')
	.then(function (data){
		res.send(data.toString());

	})	
})
//https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1507799123707
app.listen(3100,  () => {
  console.log('Listening on: http://192.168.2.81:3100');
});

