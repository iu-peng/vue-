<template>
	<div id="header">
		<el-dropdown trigger="click">
			<span class="self">
				<img src="./selflogo.jpg" alt="个人中心" class="self-logo">
				<i class="el-icon-caret-bottom el-icon--right"></i>
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item>个人中心</el-dropdown-item>
				<el-dropdown-item @click.native="loginout">退出登录</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
		<!-- <el-menu 
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
		</el-menu> -->
		<canvas-clock class="canvas"></canvas-clock>
	</div>
	
</template>

<script>
	import { removeStore } from '../../config/utils'
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
			},
			loginout(){
				console.log(33)
				removeStore('username')
				this.$router.push({name:'login'})
			}
		}
	}
</script>
<style scoped>
	#header{
		width:100%;
		height:60px;
		background: #324157;
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
	.el-dropdown >>> {
		width:100px;
		text-align:center;
		color:#fff;
		height:60px;
		line-height:60px;
	}
	.self{
		display:inline-block;
		width:50px;
		height:50px;
		border-radius:50%;
		overflow:hidden;
		background-size:100%;
		margin:5px 0 ;
	}
	.self-logo{
		width:50px;
		height:50px;
	}
</style>