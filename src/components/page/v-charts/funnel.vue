<template>
	<div class="box">
		<ve-funnel :data="chartData" :settings="chartSettings"></ve-funnel>
		<div class="b-box">
			<el-button type="primary" class="btn" @click="change">改变显示模式</el-button>
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
		created: function () {
			this.chartData = {
				columns: ['状态', '数值'],
				rows: [
					{ '状态': '展示', '数值': 700 },
					{ '状态': '访问', '数值': 600 },
					{ '状态': '点击', '数值': 500 },
					{ '状态': '订单', '数值': 400 },
					{ '状态': '订单', '数值': 300 },
					{ '状态': '订单', '数值': 200 },
					{ '状态': '订单', '数值': 100 }
				]
			},
			this.chartSettings = {
				ascending: true
			}
		},
		methods:{
			change(){
				this.chartSettings.ascending = !this.chartSettings.ascending
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