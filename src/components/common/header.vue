<template>
	<div>
		<el-menu 
			theme="dark" 
			:default-active="activeIndex" 
			class="el-menu-demo" 
			mode="horizontal" 
		>
			<el-menu-item index="1" @click="changeCollapse">
				<i class="iconfont icon-bar-chart-h"></i>
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
	</div>
	
</template>

<script>
	export default {
		data(){
			return {
				activeIndex:'1'
			}
		},
		methods:{
			changeCollapse(){
				this.isCollapse = !this.isCollapse
				this.$emit('asideclose')
			}
		}
	}
</script>
<style>
	.el-menu-demo{
		padding-left:12.5%;
	}
	.el-menu{
		border-radius:0;
	}
</style>