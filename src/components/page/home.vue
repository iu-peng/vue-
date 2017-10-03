<template>
  <div>
    <el-row>
      <el-col :span="10" id="checked-list">
        <el-tabs type="border-card">
          <el-tab-pane label="订单">
            <el-table :data="checkedList" border show-summary stripe style="width: 100%">
                <!-- stripe：斑纹线 show-summary:计算合计 border:边框 -->
                <el-table-column 
                  resizable prop="goodsName" 
                  align="center" 
                  label="商品名称" 
                  min-width="120"
                ></el-table-column>
                <el-table-column 
                  align="center" 
                  prop="count" 
                  label="数量" 
                  min-width="90"
                ></el-table-column>
                <el-table-column 
                  prop="price" 
                  align="center" 
                  label="金额" 
                  min-width="100"
                ></el-table-column>
                <el-table-column label="操作" align="center"  min-width="230" prop="goodsId">
                  <template scope="props">
                    <el-button type="warning" size="small" @click="delOne(props.row.goodsId)">删除</el-button>
                    <el-button type="success" size="small" @click="reduceOne(props.row.goodsId)">减少</el-button>
                    <el-button type="success" size="small" @click="addOne(props.row.goodsId)">增加</el-button>
                  </template>
                </el-table-column>
              </el-table>
              {{orderNum}}----{{orderPrice}}
          </el-tab-pane>
          <el-tab-pane label="外卖">外卖</el-tab-pane>
          <el-tab-pane label="挂单">挂单</el-tab-pane>
        </el-tabs>
      </el-col>
      <!-- 常用商品 -->
      <el-col :span="14" id="offten-goods">
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
                <dl>
                  <dt><img :src="item.goodsImg" alt=""></dt>
                  <dd>
                    <p>{{item.goodsName}}</p>
                    <p>￥{{item.price}}</p>
                  </dd>
                </dl>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="特色小吃">
            <ul>
              <li v-for="item in goodsKindList[1]"  @click="addOrder(item)">
                <dl>
                  <dt><img :src="item.goodsImg" alt=""></dt>
                  <dd>
                    <p>{{item.goodsName}}</p>
                    <p>￥{{item.price}}</p>
                  </dd>
                </dl>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="饮料">
            <ul>
              <li v-for="item in goodsKindList[2]"  @click="addOrder(item)">
                <dl>
                  <dt><img :src="item.goodsImg" alt=""></dt>
                  <dd>
                    <p>{{item.goodsName}}</p>
                    <p>￥{{item.price}}</p>
                  </dd>
                </dl>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="套餐">
            <ul>
              <li v-for="item in goodsKindList[3]"  @click="addOrder(item)">
                <dl>
                  <dt><img :src="item.goodsImg" alt=""></dt>
                  <dd>
                    <p>{{item.goodsName}}</p>
                    <p>￥{{item.price}}</p>
                  </dd>
                </dl>
              </li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      checkedList:[],
      offtenGoodList:[],
      goodsKindList:[]
    }
  },
  mounted(){
    let checklist = document.querySelector('#checked-list')
    let offtenGoods = document.querySelector('#offten-goods')
    checklist.style.height = offtenGoods.style.height = (document.documentElement.clientHeight || document.body.clientHeight) + 'px'
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
      console.log(data)
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
#checked-list{
  background:#D3DCE6;
  -border-right:2px solid #8492A6;
}
#offten-goods{
  background:#F9FAFC;
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
  padding:10px;
  border-radius:4px;
  float:left;
  margin-right:20px;
  border:1px solid #58B7FF;
  background:#EFF2F7;
  cursor:pointer;
}
.offten-kind dt,.offten-kind dd{
  float:left;
}
.offten-kind img {
  width:50px;
  height:50px;
  margin-right:5px;
}
.offten-kind p{
  height:30px;
  line-height: 30px;
  color:#FF4949;
}
.offten-kind p:nth-child(2){
  line-height: 20px;
  height:20px;
  color:#20A0FF;
}
</style>
