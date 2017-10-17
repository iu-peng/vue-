<template>
  <div id="pospage">
      <!-- 订单页 -->
      <el-col :span="11" id="checked-list">
        <el-tabs type="border-card">
          <el-tab-pane label="订单">
            <el-table :data="checkedList" border stripe style="width: 100%">
                <!-- stripe：斑纹线 show-summary:计算合计 border:边框 -->
                <el-table-column 
                  resizable prop="goodsName" 
                  align="center" 
                  label="商品名称" 
                  min-width="100"
                ></el-table-column>
                <el-table-column 
                  align="center" 
                  prop="count" 
                  label="数量" 
                  min-width="80"
                ></el-table-column>
                <el-table-column 
                  prop="price" 
                  align="center" 
                  label="单价" 
                  min-width="80"
                ></el-table-column>
                <el-table-column label="操作" align="center"  min-width="220" prop="goodsId">
                  <template scope="props">
                    <el-button type="warning" size="small" @click="openDel(props.row.goodsId)">X</el-button>
                    <el-button type="success" size="small" @click="reduceOne(props.row.goodsId)">--</el-button>
                    <el-button type="success" size="small" @click="addOne(props.row.goodsId)">+</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <p class="total">数量：<span>{{orderNum}}</span>件; 总价<span>{{orderPrice}}</span>元</p>
          </el-tab-pane>
          <el-tab-pane label="外卖">外卖</el-tab-pane>
          <el-tab-pane label="挂单">挂单</el-tab-pane>
        </el-tabs>
      </el-col>
      <!-- 常用商品 -->
      <el-col :span="13" id="offten-goods">
        <h3 class="offten-title">常用商品</h3>
        <div class="offten-goods-list">
          <ul class="clearfix">
            <li v-for="item in offtenGoodList" @click="addOrder(item)">
              <!-- <el-button type="primary" size="large"> -->
                <span>{{item.goodsName}}</span>
                <span>￥{{item.price}}</span>
              <!-- </el-button> -->
            </li>
          </ul>
        </div>
        <!-- 分类商品 -->
        <el-tabs class="offten-kind" type="border-card">
          <el-tab-pane label="汉堡">
            <ul>
              <li v-for="item in goodsKindList[0]" @click="addOrder(item)">
                <img :src="item.goodsImg" />
                <p class="goods-title">{{item.goodsName}}</p>
                <p class="goods-price"><b>¥</b>{{item.price}}</p>
                <!-- <dl>
                  <dt><img :src="item.goodsImg" alt=""></dt>
                  <dd>
                    <p>{{item.goodsName}}</p>
                    <p>￥{{item.price}}</p>
                  </dd>
                </dl> -->
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="特色小吃">
            <ul>
              <li v-for="item in goodsKindList[1]"  @click="addOrder(item)">
                <img :src="item.goodsImg" />
                <p class="goods-title">{{item.goodsName}}</p>
                <p class="goods-price"><b>¥</b>{{item.price}}</p>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="饮料">
            <ul>
              <li v-for="item in goodsKindList[2]"  @click="addOrder(item)">
                <img :src="item.goodsImg" />
                <p class="goods-title">{{item.goodsName}}</p>
                <p class="goods-price"><b>¥</b>{{item.price}}</p>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="套餐">
            <ul>
              <li v-for="item in goodsKindList[3]"  @click="addOrder(item)">
                <img :src="item.goodsImg" />
                <p class="goods-title">{{item.goodsName}}</p>
                <p class="goods-price"><b>¥</b>{{item.price}}</p>
              </li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </el-col>
  </div>
</template>

<script>
import axios from 'axios'

import headerNav from '@/components/common/header'
import leftNav from '@/components/common/leftNav'

export default {
  data(){
    return {
      checkedList:[],
      offtenGoodList:[],
      goodsKindList:[]
    }
  },
  components:{
    headerNav,
    leftNav
  },
  mounted(){
    let checklist = document.querySelector('#checked-list')
    let offtenGoods = document.querySelector('#offten-goods')
    //获取常用商品信息
    axios.get('http://localhost:3100/api/offtengoods')
    .then((data)=>{
      this.offtenGoodList = data.data.list
    })
    //获取分类商品信息
    axios.get('http://localhost:3100/api/goodskind')
    .then((data)=>{
      this.goodsKindList = data.data.list
    })
    //获取订单信息
    axios.get('http://localhost:3100/api/getOrderList')
    .then((data)=>{
      this.checkedList = data.data.order_list
    })
  },
  methods:{
    addOrder(item){
      axios.post('http://localhost:3100/api/setShopCarList',{carList:JSON.stringify(item)})
      .then((data)=>{
        //购物车满 提示警告
        if(data.data.code === 1){
          this.open()
        }
        this.checkedList = data.data.order_list
      })
    },
    addOne(goodsId){
      axios.post('http://localhost:3100/api/addOne',{goodsId:goodsId})
      .then((data)=>{
        //购物车满 提示警告
        if(data.data.code === 1){
          this.open()
        }
        this.checkedList = data.data.order_list
      })
    },
    delOne(goodsId){
      axios.post('http://localhost:3100/api/delOne',{delId:goodsId})
      .then((data)=>{
        if(data.data.code === 1){
          this.open()
        }
        this.checkedList = data.data.order_list
      })
    },
    reduceOne(goodsId){
      axios.post('http://localhost:3100/api/reduceOne',{reduceId:goodsId})
      .then((data)=>{
        if(data.data.code === 1){
          this.open2()
        }
        this.checkedList = data.data.order_list
      })
    },
    open(){
      this.$message({
        message:'本商品购物车已满5件！请先结算',
        type:'warning'
      })
    },
    open2(){
      this.$message({
        message:'最少为1件，可删除',
        type:'warning'
      })
    },
    openDel(goodsId) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        this.delOne(goodsId)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })         
      })
    }
  },
  computed:{
    orderNum(){
      let n=0
      this.checkedList.forEach((item)=>{
        n += item.count
      })
      return n
    },
    orderPrice(){
      let n=0
      this.checkedList.forEach((item)=>{
        n += item.count*item.price
      })
      return n
    }
  }
}
</script>

<style>
#pospage{
  -background:rgb(245, 245, 255) url(../../../assets/img/posbg.png);
}
#checked-list{
  -background:#D3DCE6;
  height:100%;
  -border-right:2px solid #8492A6;
}
.total{
  height:30px;
  line-height:30px;
  color:#000;
  text-align:center;
}
.total span {
  color:#f22100;
  font-weight:bolder;
  padding:0 10px;
}
#offten-goods{
  -background:#F9FAFC;
  height:100%;
}
.offten-title{
  height:40px;
  line-height:40px;
  padding-left:10px;
  font-weight:normal;
  border-bottom:1px solid #8492A6;
}
.offten-goods-list{
  padding:10px 30px;
  background: #E5E9F2;
  border-bottom:1px solid #8492A6;
}
.offten-goods-list li{
  cursor:pointer;
  padding:10px;
  float:left;
  margin:0 20px 20px 0;
  background:#F9FAFC;
  border-radius:4px;
  border:1px solid #58B7FF;
}
.offten-goods-list li span:nth-child(1){
  color:#475669;
  -color:#fff;
}
.offten-goods-list li span:nth-child(2){
  color:#20A0FF;
  -color:#fff;
}
.offten-kind{
  margin-top:20px;
  
}
.offten-kind li {
  width:140px;
  height:180px;
  border-radius:4px;
  float:left;
  margin-right:20px;
  background:#ffe29e;
  cursor:pointer;
  overflow: hidden;
  position: relative;
  box-shadow: 0 10px 16px rgba(0,0,0,.1);
  transition:0.3s;
}
.offten-kind li:hover{
  transform: translateY(-5px);
  box-shadow: 0 12px 18px rgba(0,0,0,.15);
}
.offten-kind li:after{
  content:"have a good day";
  position:absolute;
  left:0;
  bottom:0;
  color:#051a37;
  width:100%;
  font-size:10px;
  text-align:center;
  line-height:20px;
}
/* .offten-kind dt,.offten-kind dd{
  float:left;
} */
.offten-kind img {
  width:100px;
  height:100px;
  display: block;
  margin:50px auto 0;
  border-radius:10%;
}
.offten-kind p{
  position:absolute;
}
.offten-kind p:nth-of-type(1){
  height:40px;
  width:100px;
  left:20px;
  top:0;
  color:#fff;
  background:#051a37;
  line-height:30px;
  font-size:15px;
  text-align:center;
}
.offten-kind p:nth-of-type(1):after{
  content:"";
  position:absolute;
  width:0px;
  height:0px;
  bottom:0;
  left:0;
  border-width:0 50px 10px 50px;
  border-color:transparent transparent #ffe29e transparent;
  border-style:solid;
}
.offten-kind p:nth-of-type(2){
  width:50px;
  height:50px;
  border-radius:50%;
  background:#fff;
  color:#e51718;
  left:10px;
  bottom:20px;
  text-align:center;
  line-height:50px;
  font-size:22px;
  font-style:italic;
}
.offten-kind p:nth-of-type(2) b{
  font-size:14px;
  font-style:normal;
  font-weight:normal;
}

</style>
