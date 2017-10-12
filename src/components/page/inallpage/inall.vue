<template>
	<div id="inall">
		<el-row :gutter="20">
			<el-col :span="6" v-for="item,index in countNum">
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
			</el-col>
			<!-- <el-col :span="6">
				<div class="tip">
					<p class="tip-kind">
						特色小吃：<span>3</span>份
					</p>
					<div class="tip-detail">
						<p class="detail-each">
							<b>单价</b>
							<span>12元</span>
						</p>
						<p class="detail-inall">
							<b>总价</b>
							<span>121元</span>
						</p>
					</div>
				</div>
			</el-col>
			<el-col :span="6">
				<div class="tip">
					<p class="tip-kind">
						饮料：<span>3</span>份
					</p>
					<div class="tip-detail">
						<p class="detail-each">
							<b>单价</b>
							<span>12元</span>
						</p>
						<p class="detail-inall">
							<b>总价</b>
							<span>121元</span>
						</p>
					</div>
				</div>
			</el-col>
			<el-col :span="6">
				<div class="tip">
					<p class="tip-kind">
						套餐：<span>3</span>份
					</p>
					<div class="tip-detail">
						<p class="detail-each">
							<b>单价</b>
							<span>12元</span>
						</p>
						<p class="detail-inall">
							<b>总价</b>
							<span>121元</span>
						</p>
					</div>
				</div>
			</el-col> -->
		</el-row>
		<el-row class="charts">
			<ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
		</el-row>
	</div>
</template>

<script>
	import axios from 'axios'
	
	export default {
		props:['priceAll'],
		data(){
			return {
				chartData:{},
				chartSettings:{},
				kindsArr:[],
				kindsDetailsArr:[
					{name:'汉堡',countAll:0,priceAll:0},
					{name:'特色小吃',countAll:0,priceAll:0},
					{name:'饮料',countAll:0,priceAll:0},
					{name:'套餐',countAll:0,priceAll:0}
				],
				rows:[
					{ '种类': '汉堡', '总数量': 0, '总价': 1523, '占比': 0.12, '价格比例': 100 },
					{ '种类': '特色小吃', '总数量': 0, '总价': 1523, '占比': 0.345, '价格比例': 300 },
					{ '种类': '饮料', '总数量': 2123, '总价': 1523, '占比': 0.7, '价格比例': 200 },
					{ '种类': '套餐', '总数量': 2123, '总价': 1523, '占比': 0.7, '价格比例': 200 }
				]
			}
		},
		created() {
			this.chartData = {
				columns: ['种类', '总数量', '总价', '占比', '价格比例'],
				rows:this.rows
			}
			this.chartSettings = {
				axisSite: { right: ['占比'] },
				yAxisName: ['数值', '比率'],
				metrics: ['总数量', '总价','价格比例'],
				stack:'',
				label: {
			        normal: { show: true, position: "top" }
			    }
			}
		},
		mounted(){
			axios.get('http://localhost:3100/api/getOrderList')
			.then((data)=>{
				//每种商品的数组
				let arr = data.data.order_list
				function filterArr(pid){
					return arr.filter((item)=>{
						return item.kindsId === pid
					})
				}
				for(let i = 1; i<5; i++){
					this.kindsArr.push(filterArr(i))
				}
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
					//总数量
					this.kindsDetailsArr[index].countAll = c
					this.rows[index]['总数量'] = c
					//总价格
					this.kindsDetailsArr[index].priceAll = p
					this.rows[index]['总价'] = p
					this.rows[index]['价格比例'] = Math.round(p/this.priceAll*100)
				})
				return this.kindsDetailsArr
			}
		}
	}
</script>
<style scoped>
#inall{
	padding:20px 20px 0;
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
.el-col:nth-child(1) .tip-kind{
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
	color:#444;
}
.tip-detail p span{
	font-size:18px;
	color:#555;
}
.tip:hover{
  transform: translateY(-5px);
  box-shadow: 0 12px 18px rgba(0,0,0,.15);
}
.charts{
	background:;
	margin:30px 80px 0;
}
</style>