<template>
	<div class="box">
		<ve-line 
			:data="chartData" 
			:toolbox="toolbox" 
			:data-zoom="dataZoom" 
			:settings="chartSettings"
		></ve-line>
		<el-button :plain="true" type="success" class="btn" @click="change">堆叠面积</el-button>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				chartData:{},
				chartSettings:{}
			}
		},
		created: function () {
			this.chartData = {
				columns: ['日期', '成本', '利润', '占比', '其他'],
				rows: [
					{ '日期': '1月1日', '成本': 1523, '利润': 1523, '占比': 12, '其他': 100 },
					{ '日期': '1月2日', '成本': 1223, '利润': 1523, '占比': 34.5, '其他': 100 },
					{ '日期': '1月3日', '成本': 2123, '利润': 1523, '占比': 7, '其他': 100 },
					{ '日期': '1月4日', '成本': 4123, '利润': 1523, '占比': 31, '其他': 100 },
					{ '日期': '1月5日', '成本': 3123, '利润': 1523, '占比': 12, '其他': 100 },
					{ '日期': '1月6日', '成本': 7123, '利润': 1523, '占比': 65, '其他': 100 }
				]
			}
			this.chartSettings = {
				stack: { '售价': ['成本', '利润'] },
				area: true
			}
			//定义显示区域
			this.dataZoom = [
				{
					type: 'slider',
					start: 0,
					end: 80
				}
			]
			//图形转换
			this.toolbox = {
				feature: {
					magicType: {type: ['line', 'bar']},
					saveAsImage: {}
				}
			}
		},
		methods:{
			change(){
				this.chartSettings.area = !this.chartSettings.area 
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
	.btn{
		margin:10px auto;
		display:block;
	}
</style>