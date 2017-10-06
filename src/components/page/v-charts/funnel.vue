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
				columns: ['日期', '支出1', '支出2', '占比', '其他'],
				rows: [
					{ '日期': '1月1日', '支出1': 523, '支出2': 528, '占比': 0.12, '其他': 100 },
					{ '日期': '1月2日', '支出1': 423, '支出2': 523, '占比': 0.345, '其他': 300 },
					{ '日期': '1月3日', '支出1': 333, '支出2': 213, '占比': 0.7, '其他': 230 },
					{ '日期': '1月4日', '支出1': 261, '支出2': 417, '占比': 0.31, '其他': 160 },
					{ '日期': '1月5日', '支出1': 213, '支出2': 325, '占比': 0.12, '其他': 190 },
					{ '日期': '1月6日', '支出1': 142, '支出2': 197, '占比': 0.65, '其他': 230 }
				]
			}
			this.chartSettings = {
				dimension: '日期',
				metrics: '支出1',
				//dataType: 'KMB',
				sequence: ['1月1日', '1月2日', '1月3日', '1月4日', '1月5日', '1月6日'],
				ascending: false
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