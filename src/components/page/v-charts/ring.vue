<template>
	<div class="box">
		<ve-ring :data="chartData" :settings="chartSettings"></ve-ring>
		<div class="b-box">
			<el-button type="primary" class="btn" @click="change">南丁格尔玫瑰图</el-button>
			<el-button type="primary" class="btn" @click="change2">控制个数</el-button>
		</div>
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
		created() {
			this.chartData = {
				columns: ['日期', '成本', '利润'],
				rows: [
					{ '日期': '1月1号', '成本': 1213, '利润': 3 },
					{ '日期': '1月2号', '成本': 1122, '利润': 6 },
					{ '日期': '1月3号', '成本': 2121, '利润': 20 },
					{ '日期': '1月4号', '成本': 4123, '利润': 12 },
					{ '日期': '1月5号', '成本': 3123, '利润': 15 },
					{ '日期': '1月6号', '成本': 7123, '利润': 20 }
				]
			}
			this.chartSettings = {
				dimension: '成本',
				metrics: '利润',
				roseType: '',
				//控制半径
				//radius: [100, 50],
				//显示个数限制
				limitShowNum: this.chartData.rows.length-1
			}
		},
		methods:{
			change(){
				this.chartSettings.roseType = this.chartSettings.roseType ?'':'radius'
			},
			change2(){
				this.chartSettings.limitShowNum--
				if(this.chartSettings.limitShowNum<1){
					this.chartSettings.limitShowNum = this.chartData.rows.length-1
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