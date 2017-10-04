<template>
	<div class="box">
		<ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
		<div class="b-box">
			<el-button type="primary" class="btn" @click="change">是否显示值</el-button>
			<el-button type="primary" class="btn" @click="change2">是否合并</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				chartData:{},
				chartSettings:{},
				stack:{ '1': ['成本', '利润','其他'] }
			}
		},
		created() {
			this.chartData = {
				columns: ['日期', '成本', '利润', '占比', '其他'],
				rows: [
					{ '日期': '1月1日', '成本': 1523, '利润': 1523, '占比': 0.12, '其他': 100 },
					{ '日期': '1月2日', '成本': 1223, '利润': 1523, '占比': 0.345, '其他': 300 },
					{ '日期': '1月3日', '成本': 2123, '利润': 1523, '占比': 0.7, '其他': 200 },
					{ '日期': '1月4日', '成本': 4123, '利润': 1523, '占比': 0.31, '其他': 500 }
				]
			}
			this.chartSettings = {
				axisSite: { right: ['占比'] },
				yAxisType: ['KMB', 'percent'],
				yAxisName: ['数值', '比率'],
				metrics: ['成本', '利润','其他'],
				stack:'',
				label: {
			        normal: { show: true, position: "top" }
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