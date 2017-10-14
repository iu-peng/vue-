<template>
	<div id="inall">
		<el-row :gutter="20">
			<el-col :span="6" v-for="item,index in countNum" key="index">
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
					{ '种类': '汉堡', '总数量': 0, '总价': 0, '占比': 0, '价格比例': 1 },
					{ '种类': '特色小吃', '总数量': 0, '总价': 0, '占比':0, '价格比例': 1 },
					{ '种类': '饮料', '总数量': 0, '总价': 0, '占比': 0, '价格比例': 1 },
					{ '种类': '套餐', '总数量': 0, '总价': 0, '占比': 0, '价格比例': 1 }
				]
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
					//toFixed 保留两位小数
					this.rows[index]['价格比例'] = (p/this.priceAll).toFixed(2)
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
.el-col{
	cursor:pointer;
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
	margin:30px 80px 0;
}
</style>