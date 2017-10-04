<template>
	<div class="box">
		 <ve-pie :data="chartData" :settings="chartSettings"></ve-pie>
		<div class="b-box">
			<el-button type="primary" class="btn" @click="change">南丁格尔玫瑰图</el-button>
			<el-button type="primary" class="btn" @click="change2">同心圆饼图</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				chartData:{},
				chartSettings:{},
				leval:[['1月1日','1月2日','1月3日'],['1月4日','1月5日','1月6日']]
			}
		},
		created: function () {
			this.chartData = {
				columns: ['日期', '销售额-1季度', '销售额-2季度', '占比', '其他'],
				rows: [
					{ '日期': '1月1日', '销售额-1季度': 1523, '销售额-2季度': 1523, '占比': 0.12, '其他': 100 },
					{ '日期': '1月2日', '销售额-1季度': 1223, '销售额-2季度': 1523, '占比': 0.345, '其他': 100 },
					{ '日期': '1月3日', '销售额-1季度': 2123, '销售额-2季度': 1523, '占比': 0.7, '其他': 100 },
					{ '日期': '1月4日', '销售额-1季度': 4123, '销售额-2季度': 1523, '占比': 0.31, '其他': 100 },
					{ '日期': '1月5日', '销售额-1季度': 3123, '销售额-2季度': 1523, '占比': 0.12, '其他': 100 },
					{ '日期': '1月6日', '销售额-1季度': 7123, '销售额-2季度': 1523, '占比': 0.65, '其他': 100 }
				]
			}
			this.chartSettings = {
				dimension: '日期',
				metrics: '销售额-1季度',
				dataType: 'KMB',
				selectedMode: 'single',
				//移入变大
				hoverAnimation: true,
				radius: 100,
				offsetY: 200,
				//玫瑰饼图
				roseType:'',
				//同心圆
				level:null
			}
		},
		methods:{
			change(){
				this.chartSettings.roseType = this.chartSettings.roseType? '':'radius'
			},
			change2(){
				this.chartSettings.level = this.chartSettings.level ? '':this.leval
			}
		}
	}
</script>
<style>
	.box{
		width:800px;
		height:500px;
		margin:10px auto;
		background:#fff;
		
	}
	.b-box{
		display:flex;
		justify-content:space-around;
	}
	.btn{
		
	}
</style>