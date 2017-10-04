<template>
	<div class="box">
		<ve-line :data="chartData" :settings="chartSettings"></ve-line>
		<el-button type="primary" class="btn" @click="change">堆叠面积</el-button>
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
		/*mounted(){
			let neiH = (document.documentElement.clientHeight || document.body.clientHeight)-60
			document.querySelector('.box').style.height = neiH + 'px'
		},*/
		created: function () {
			this.chartData = {
				columns: ['日期', '成本', '利润', '占比', '其他'],
				rows: [
					{ '日期': '1月1日', '成本': 1523, '利润': 1523, '占比': 0.12, '其他': 100 },
					{ '日期': '1月2日', '成本': 1223, '利润': 1523, '占比': 0.345, '其他': 100 },
					{ '日期': '1月3日', '成本': 2123, '利润': 1523, '占比': 0.7, '其他': 100 },
					{ '日期': '1月4日', '成本': 4123, '利润': 1523, '占比': 0.31, '其他': 100 },
					{ '日期': '1月5日', '成本': 3123, '利润': 1523, '占比': 0.12, '其他': 100 },
					{ '日期': '1月6日', '成本': 7123, '利润': 1523, '占比': 0.65, '其他': 100 }
				]
			}
			this.chartSettings = {
				stack: { '售价': ['成本', '利润'] },
				area: true
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