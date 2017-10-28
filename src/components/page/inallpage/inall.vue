<template>
	<div id="inall">
		<el-row :gutter="20">
			<el-col :lg="6" :md="8" :xs="24" :sm="12" v-for="item,index in countNum" key="index">
				<div class="kind-item">
				<!-- 总计 -->
					<div class="tip">
						<p class="tip-kind">
							{{item.name}}
						</p>
						<div class="tip-detail">
							<p class="detail-each">
								<b>共计</b>
								<span>{{item.countAll}}份</span>
							</p>
							<p class="detail-inall">
								<b>总价</b>
								<span>{{item.priceAll}}元</span>
							</p>
						</div>
					</div>
					<!-- 商品价格占比 -->
					<div class="percent">
						<el-progress 
							:text-inside="true" 
							:stroke-width="18" 
							status="success"
							:percentage="Math.round(rows[index]['价格比例']*100)||0"
							class="progress"
						></el-progress>
					</div>
					<!-- 商品罗列 -->
					<el-card class="box-card" body-style="padding:0px 0px;">
					    <div slot="header" class="clearfix">
					        <span>分类详情</span>
					        <el-button 
					            style="float: right; padding:3px 10px;" 
					            plain
					            @click="item.colle=!item.colle"
					        >{{item.colle?'-':'+'}}</el-button>
					    </div>
					    <el-collapse-transition>
					        <div v-show="item.colle">
					            <div v-for="each,nth in item.options" key="nth" class="goods-type">
					            	<img 
					            		:src="each.goodsImg" 
					            		class="goods-type-img" 
					            	/>
					            	<p class="goods-type-name">{{each.goodsName}}</p>
					            	<!-- <el-input-number 
					            		size="small" 
					            		v-model="each.count"
					            	></el-input-number> -->
					            	<p class="goods-type-num">x{{each.count}}</p>
					            	<p class="goods-type-num">¥{{(each.count)*(each.price)}}</p>
					            	<div class="goods-type-del">
					            		<div @click="openDel(each.goodsId)">删除</div>
					            		<div @click="reduceOne(each.goodsId)">-</div>
					            		<div @click="addOne(each.goodsId)">+</div>
					            	</div>
					            </div>
					        </div>
					    </el-collapse-transition>
					</el-card>
				</div>
				
			</el-col>
		</el-row>
		<el-row class="charts">
			<el-row :gutter="20">
				<el-col  :lg="14" :md="12" :xs="24" class="charts-left" style="margin-bottom:20px;">
					<ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
				</el-col>
				<el-col  :lg="{span:9,offset:1}" :md="11" :xs="24">
					<div>
						<el-card class="" body-style="padding:0px 0px;">
						    <div slot="header" class="clearfix" style="border-bottom:none;">
						        <span>结算页</span>
						        <el-button 
						            style="float: right; padding:3px 10px;" 
						            plain
						            @click="settleOnoff=!settleOnoff"
						        >-</el-button>
						    </div>
						    <el-collapse-transition>
						        <div v-show="settleOnoff" class="settle">
					            	<el-row>
										<el-col :span="12">
											<p class="total"><b>x </b>{{countAllNum}}</p>
											<span class="total-tip">商品数</span>
										</el-col>
										<el-col :span="12">
											<p class="total"><b>¥ </b>{{priceAllMoney}}</p>
											<span class="total-tip">总价</span>
										</el-col>
					            	</el-row>
					            	<el-row>
										<el-col :span="12">
											<el-button 
												class="overbtn" 
												type="danger"
												@click="$router.push('/home/possystem')"
											>继续购物</el-button>
										</el-col>
										<el-col :span="12">
											<el-button 
												class="overbtn" 
												type="danger"
												@click="$router.push('/home/shopcar')"
											>马上结算</el-button>
										</el-col>
					            	</el-row>
					            	<el-row>
										<el-col :span="24">
											<el-carousel indicator-position="none" type="card" height="100px">
											    <el-carousel-item v-for="per,perIndex in kindsImgArr" :key="perIndex">
													<img :src="per.goodsImg" alt="card">
											    </el-carousel-item>
											  </el-carousel>
										</el-col>
					            	</el-row>
						        </div>
						    </el-collapse-transition>
						</el-card>
					</div>
				</el-col>
			</el-row>
		</el-row>
	</div>
</template>

<script>
	import api from '../../api/api'
	
	export default {
		data(){
			return {
				settleOnoff:true,//结算面板收缩控制

				priceAllMoney:0,//总价格
				countAllNum:0,//总数量

				chartData:{},//图表数据
				chartSettings:{},//图表设置参数

				kindsArr:[],//分类后组成的二维数组
				kindsImgArr:[],//轮播图数组
				kindsDetailsArr:[
					{name:'汉堡',countAll:0,priceAll:0,colle:true},//colle为分类控制收缩控制
					{name:'特色小吃',countAll:0,priceAll:0,colle:true},
					{name:'饮料',countAll:0,priceAll:0,colle:true},
					{name:'套餐',countAll:0,priceAll:0,colle:true}
				],
				rows:[
					{ '种类': '汉堡', '总数量': 0, '总价': 0, '占比': 0, '价格比例': 1 },
					{ '种类': '特色小吃', '总数量': 0, '总价': 0, '占比':0, '价格比例': 1 },
					{ '种类': '饮料', '总数量': 0, '总价': 0, '占比': 0, '价格比例': 1 },
					{ '种类': '套餐', '总数量': 0, '总价': 0, '占比': 0, '价格比例': 1 }
				],
				getList:function(data){
					let arr = data.data.order_list
					function filterArr(pid){
						return arr.filter((item)=>{
							return item.kindsId === pid
						})
					}
					this.kindsArr = []
					for(let i = 1; i<5; i++){
						this.kindsArr.push(filterArr(i))
					}
					//计算总价格
					this.priceAllMoney = 0
					this.kindsArr.forEach((item)=>{
						item.forEach((it)=>{
							this.priceAllMoney += it.price * it.count
						})
					})
					//计算总数量
					this.countAllNum = 0
					this.kindsArr.forEach((item)=>{
						item.forEach((it)=>{
							this.countAllNum += it.count
						})
					})
					this.kindsImaArr = []
					this.kindsArr.forEach((item)=>{
						this.kindsImgArr = this.kindsImgArr.concat(item)
					})
					this.$store.dispatch('editKindsData',this.kindsArr)
				}
			}
		},
		created() {
			this.chartData = {
				columns: ['种类', '总数量', '总价', '占比', '价格比例'],
				rows:this.rows
			}
			this.chartSettings = {
				axisSite: { right: ['价格比例'] },
				yAxisType: ['normal', 'percent'],
				yAxisName: ['数值', '价格比例'],
				metrics: ['总数量', '总价','价格比例'],
				stack:'',
				label: {
			        normal: { show: true, position: "top" }
			    }
			}

		},
		mounted(){
			//axios.get('http://localhost:3100/api/getOrderList')
			api.noParams('getOrderList')
			.then((data)=>{
				this.getList(data)
			})
		},
		computed:{
			countNum(){
				this.kindsArr.forEach((item,index)=>{
					let c = 0
					let p = 0
					item.forEach((it)=>{
						c += it.count
						p += it.price*it.count
					})
					//每种类下的具体商品
					this.kindsDetailsArr[index].options = []
					this.kindsDetailsArr[index].options = item
					
					//this.kindsDetailsArr[index].colle = true
					//总数量
					this.kindsDetailsArr[index].countAll = c
					this.rows[index]['总数量'] = c
					//总价格
					this.kindsDetailsArr[index].priceAll = p
					this.rows[index]['总价'] = p
					//toFixed 保留两位小数
					this.rows[index]['价格比例'] = (p/this.priceAllMoney).toFixed(2)
				})
				return this.kindsDetailsArr
			}
		},
		methods:{
			delOne(goodsId){
				//axios.post('http://localhost:3100/api/delOne',{delId:goodsId})
				api.haveParams('delOne',
				  	{delId:goodsId}
				)
				.then((data)=>{
					if(data.data.code === 1){
						//this.open()
						console.log('已满5件')
					}
					this.getList(data)

					//this.countNum()
				})
			},
			addOne(goodsId){
				//axios.post('http://localhost:3100/api/addOne',{goodsId:goodsId})
				api.haveParams('addOne',
			        {goodsId:goodsId}
			    )
				.then((data)=>{
					//购物车满 提示警告
					if(data.data.code === 1){
						this.open()
					}
					this.getList(data)
				})
			},
			reduceOne(goodsId){
				//axios.post('http://localhost:3100/api/reduceOne',{reduceId:goodsId})
				api.haveParams('reduceOne',
			        {reduceId:goodsId}
			    )
				.then((data)=>{
					if(data.data.code === 1){
						this.open2()
					}
					this.getList(data)
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
					confirmButtonText: '删除',
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
		}
	}
</script>
<style scoped>
#inall{
	padding:20px 20px 0;
}
.kind-item{
	cursor:pointer;
	-background:#ffafac;
	padding:5px;
	border-radius:10px;
}
.tip{
	border-radius:5px;
	overflow:hidden;
	box-shadow:0 2px 5px #ccc;
	transition:0.3s;
}
.tip-kind{
	height:40px;
	line-height:40px;
	color:#fff;
	text-align:center;
	font-size:25px;
}
.el-col:nth-child(1)  p.tip-kind{
	background:#a0d468;
}
.el-col:nth-child(2) .tip-kind{
	background:#F0E68C;
}
.el-col:nth-child(3) .tip-kind{
	background:#FFA07A;
}
.el-col:nth-child(4) .tip-kind{
	background:#87CEEB;
}
.tip-detail{
	height:50px;
	background:#fff;
	width:100%;
}
.tip-detail p{
	float:left;
	width:50%;
	height:100%;
}
.tip-detail p b,.tip-detail p span{
	display:block;
	line-height:25px;
	font-size:15px;
	text-align:center;
	color:#999;
	font-weight:bolder;
}
.tip-detail p span{
	font-size:18px;
	color:#444;
}
.tip:hover{
  transform: translateY(-5px);
  box-shadow: 0 12px 18px rgba(0,0,0,.15);
}
.charts{
	background:;
	margin:30px 0px 0;
}
.percent{
	margin-top:10px;
	padding:20px 5px;
	background:#ccc;
	border-radius:5px;
}
.box-card{
	margin-top:10px;
}
.goods-type{
	height:40px;
	display:flex;
	align-items:center;
	justify-content:space-between;
	-flex-wrap:nowrap;
	-flex-direction:row;
	border-bottom:1px dotted #ccc;
	position:relative;
	overflow:hidden;
}
.goods-type:last-child{
	border-bottom:none;
}
.goods-type-img{
	width:30px;
	height:30px;
	border-radius:50%;
	margin:0 0 0 15px;
}
.goods-type-img:nth-child(1),.goods-type-img:nth-child(2){
	float:left;
}
.goods-type-name{
	margin:0 20px 0 20px;
	font-size:14px;
	-text-overflow:ellipsis;
	-white-space: nowrap;

}
.goods-type-num{
	padding-right:10px;
}
.goods-type-del,.del-ev{
	position:absolute;
	flex:none;
	background:rgba(0,0,0,0.2);
	width:100%;
	height:100%;
	transform:translateY(-100%);
	transition:.3s;
}
.goods-type-del div{
	background:rgba(255,255,255,0.9);
	float:right;
	height:100%;
	line-height:40px;
	width:25%;
	text-align:center;
}
.goods-type-del div:hover{
	background:rgba(55,55,55,1);
	color:#fff;
}
.goods-type:hover .goods-type-del{
	transform:translateY(0%);
}
.charts-left{
	padding:20px 0;
	height:400px;
	background:#fff;
	box-shadow:0 2px 5px #ccc;
	border-radius:10px;
}
.settle{
	padding:20px;
}
.settle .el-row{
	border-bottom:1px solid #8c92a3;
}
.settle .el-col{
	padding:20px;
}
.settle .el-row:first-child .el-col:nth-child(odd){
	border-right:1px solid #8c92a3;
}
.total{
	font-size:30px;
	font-weight:bolder;
	height:50px;
	color:#222A38;
	text-align:center;
	line-height:50px;
}
.total b{
	font-size:19px;
	color:#8c92a3;
}
.total-tip{
	display:block;
	color:#8c92a3;
	text-align:center;
}
.overbtn{
	margin:0 auto;
	display:block;
}
img[alt="card"]{
	width:130px;
	height:100px;
}
</style>