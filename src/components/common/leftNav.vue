<template>
	<el-menu default-active="2" theme="dark" class="left-nav" :collapse="changeCollapse" unique-opened router>
	<!-- router 启用route跳转路由模式 -->
		<el-submenu index="1">
			<template slot="title">
				<i class="el-icon-message"></i>
				<span slot="title">导航</span>
			</template>
			<el-menu-item-group>
				<template slot="title">分组一</template>
				<el-menu-item index="1-1">选项1</el-menu-item>
				<el-menu-item index="1-2">选项2</el-menu-item>
			</el-menu-item-group>
			<el-menu-item-group title="分组2">
				<el-menu-item index="1-3">选项3</el-menu-item>
			</el-menu-item-group>
			<el-submenu index="1-4">
				<template slot="title">选项4</template>
				<el-menu-item index="1-4-1">选项1</el-menu-item>
			</el-submenu>
		</el-submenu>
		<!-- 总结页面 -->
		<el-menu-item index="3" :route="{name:'inallpage'}">
			<i class="iconfont icon-iconset0315"></i>
			<span>汇总页</span>
		</el-menu-item>
		<!-- pos收银栏 -->
		<el-menu-item index="2" :route="{name:'pospage'}">
			<i class="iconfont icon-iconset0315"></i>
			<span>Pos收银系统</span>
		</el-menu-item>
		<!-- 404栏 -->
		<el-menu-item index="4" :route="{name:'errorpage'}">
			<i class="iconfont icon-icon-test"></i>
			<span>404</span>
		</el-menu-item>
		<!-- 图表栏 -->
		<el-submenu index="5">
			<template slot="title">
				<i class="el-icon-menu"></i>
				<span>v-charts图表</span>
			</template>
			<el-menu-item-group class="son-menu">
				<el-menu-item index="5-1" :route="{name:'v-linepage'}">
					<i class="iconfont icon-zhexian"></i>
					<span>折线图</span>
				</el-menu-item>
				<el-menu-item index="5-2" :route="{name:'v-columnpage'}">
					<i class="iconfont icon-zhuzhuangtu"></i>
					<span>柱状图</span>
				</el-menu-item>
				<el-menu-item index="5-3" :route="{name:'v-barpage'}">
					<i class="iconfont icon-bar-chart-h"></i>
					<span>条形图</span>
				</el-menu-item>
				<el-menu-item index="5-4" :route="{name:'v-piepage'}">
					<i class="iconfont icon-bingzhangtu"></i>
					<span>饼状图</span>
				</el-menu-item>
				<el-menu-item index="5-5" :route="{name:'v-ringpage'}">
					<i class="iconfont icon-ring-chart"></i>
					<span>环状图</span>
				</el-menu-item>
				<el-menu-item index="5-6" :route="{name:'v-funnelpage'}">
					<i class="iconfont icon-loudoutu"></i>
					<span>漏斗图</span>
				</el-menu-item>
				<el-menu-item index="5-7" :route="{name:'v-radarpage'}">
					<i class="iconfont icon-loudoutu"></i>
					<span>雷达图</span>
				</el-menu-item>
				<el-menu-item index="5-8" :route="{name:'v-mappage'}">
					<i class="iconfont icon-loudoutu"></i>
					<span>地图</span>
				</el-menu-item>
			</el-menu-item-group>
		</el-submenu>
		<el-menu-item index="5" :route="{name:'v-markdownpage'}">
			<i class="iconfont icon-markdown"></i>
			<span>markdown</span>
		</el-menu-item>
		<el-menu-item index="7" :route="{name:'ueditorpage'}">
			<i class="el-icon-setting"></i>
			<span>富文本编辑</span>
		</el-menu-item>
		<el-menu-item index="8" :route="{name:'errorpage'}">
			<i class="el-icon-setting"></i>
			<span>404</span>
		</el-menu-item>
	</el-menu>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		props:['changeCollapse']

	}
</script>
<style>
	.left-nav{
		height:100%;
	 	overflow-y:auto;
	 	overflow-x:hidden;
	 	border-radius:0px;
	}
	/* .left-nav:not(.el-menu--collapse) {
	    min-width: 200px;
	    min-height: 400px;
	  } */
	::-webkit-scrollbar {
	    width: 0px;
	    height: 1px;
	}
	::-webkit-scrollbar-thumb {
	    -border-radius: 5px;
	    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	    background: #fff;
	}
	.son-menu i,.son-menu p{
		display:inline-block;
		height:100%;
	}
</style>