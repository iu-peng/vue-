<template>
	<div class="box">
		<ve-map :data="chartData" :settings="chartSettings"></ve-map>
		<div class="b-box">
			<el-button :plain="true" type="success" class="btn" @click="change">切换省份</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				chartData:{},
				chartSettings:{},
				//省份拼音
				positions:['beijing','tianjin','hebei','shanxi','neimenggu','liaoning','jilin','heilongjiang','shanghai','jiangsu','zhejiang','anhui','fujian','jiangxi','shandong','henan','hubei','hunan','guangdong','guangxi','hainan','chongqing','sichuan','guizhou','yunnan','xizang','gansu','qinghai','ningxia','xinjiang','xianggang','aomen','taiwan']
			}
		},
		created() {
			this.chartData = {
				columns: ['位置', '旅游指数'],
				rows: [
				{ '位置': '吉林', '旅游指数	': 123 },
				{ '位置': '北京', '旅游指数	': 1223 },
				{ '位置': '上海', '旅游指数	': 2123 },
				{ '位置': '浙江', '旅游指数	': 4123 }
				]
			}
			this.chartSettings = {
				position: 'china',
				selectData: true,
				//是否开启鼠标缩放和平移漫游 scale/缩放  move/移动 true/可缩放和移动
				roam:true,
				//控制最大缩放比例
				scaleLimit:{ min: 1, max: 10 },
				//地图选中模式
				selectedMode: 'multiple',
				itemStyle: {
					normal: {
						borderColor: '#009ad6',
						borderType:'solid',
						areaColor:'#afdfe4'
					},
					emphasis: {
						borderColor: '#009ad6',
						borderType:'dotted',
						areaColor:'#FA8072'
					}
		        }
			}
		},
		methods:{
			change(){
				let randomNum = (Math.random() * (this.positions.length))|0
				this.chartSettings.position = 'province/'+this.positions[randomNum]
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