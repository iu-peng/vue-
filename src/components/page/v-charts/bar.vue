<template>
	<div class="box">
		 <ve-bar :data="chartData" :settings="chartSettings"></ve-bar>
		<div class="b-box">
			<el-button :plain="true" type="success" class="btn" @click="change">是否显示值</el-button>
			<el-button :plain="true" type="success" class="btn" @click="change2">是否合并</el-button>
			<el-button :plain="true" type="success" class="btn" @click="change3">占比排序</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				chartData:{},
				chartSettings:{},
				stack:{'销售额': ['销售额-1季度', '销售额-2季度']},
				desc:'desc'
			}
		},
		created() {
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
				dimension: ['日期'],
				metrics: [ '销售额-1季度', '销售额-2季度', '占比'],
				axisSite: {
					top: ['占比']
				},
				xAxisType: ['KMB', 'percent'],
				xAxisName: ['销售额', '占比'],
				//是否合并
				stack: {'销售额': ['销售额-1季度', '销售额-2季度']},
				//是否显示数值
				label: {
					normal: { show:true, position:'right'}
				},
				//排序
				dataOrder: {
			        label: '占比',
			        order: 'desc'
		        }
			}
		},
		methods:{
			change(){
				this.chartSettings.label.normal.show = !this.chartSettings.label.normal.show
			},
			change2(){
				if(this.chartSettings.stack){
					this.chartSettings.stack = ''
				}else{
					this.chartSettings.stack = this.stack
				}
			},
			change3(){
				this.chartSettings.dataOrder.order = this.chartSettings.dataOrder.order? '':'desc'
			},
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