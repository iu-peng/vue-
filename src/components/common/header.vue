<template>
	<div id="header">
		<el-menu 
			theme="dark" 
			:default-active="activeIndex" 
			class="el-menu-demo" 
			mode="horizontal" 
		>
			<el-menu-item index="1" @click="changeCollapse">
				<i class="iconfont icon-zhedie-copy"></i>
			</el-menu-item>
			<el-menu-item index="2">处理中心</el-menu-item>
				<el-submenu index="3">
					<template slot="title">我的工作台</template>
					<el-menu-item index="2-1">选项1</el-menu-item>
					<el-menu-item index="2-2">选项2</el-menu-item>
					<el-menu-item index="2-3">选项3</el-menu-item>
				</el-submenu>
			<el-menu-item index="4">订单管理</el-menu-item>
		</el-menu>
		<canvas-clock class="canvas"></canvas-clock>
	</div>
	
</template>

<script>
	import canvasClock from '@/components/page/canvasclock/canvas'
	export default {
		data(){
			return {
				activeIndex:'1'
			}
		},
		components:{
			canvasClock
		},
		methods:{
			changeCollapse(){
				this.isCollapse = !this.isCollapse
				this.$emit('asideclose')
			}
		}
	}
</script>
<style scoped>
	#header{
		width:100%;
		position:relative;
	}
	.el-menu-demo{
		padding-left:12.5%;
		border-radius:0;
	}
	.canvas{
		position:absolute;
		right:0;
		top:0;
		padding:15px 20px;
	}
</style>