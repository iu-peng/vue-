<template>
	<el-menu default-active="2" theme="dark" class="left-nav">
		<el-submenu index="1">
			<template slot="title"><i class="el-icon-message"></i>导航</template>
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
		<!-- pos收银栏 -->
		<el-menu-item index="2">
			<i class="iconfont icon-iconset0315"></i>
			<router-link :to="{name:'pospage'}" tag="span">Pos收银系统</router-link>
		</el-menu-item>
		<!-- 404栏 -->
		<el-menu-item index="3">
			<i class="iconfont icon-icon-test"></i>
			<router-link :to="{name:'errorpage'}" tag="span">404</router-link>
		</el-menu-item>
		<!-- 图表栏 -->
		<el-submenu index="4">
			<template slot="title"><i class="el-icon-menu"></i>v-charts图表</template>
			<el-menu-item-group class="son-menu">
				<el-menu-item index="4-1">
					<i class="iconfont icon-zhexian"></i>
					<router-link :to="{name:'v-linepage'}" tag="p">折线图</router-link>
				</el-menu-item>
				<el-menu-item index="4-2">
					<i class="iconfont icon-zhuzhuangtu"></i>
					<router-link :to="{name:'v-columnpage'}" tag="p">柱状图</router-link>
				</el-menu-item>
				<el-menu-item index="4-3">
					<i class="iconfont icon-bar-chart-h"></i>
					<router-link :to="{name:'v-barpage'}" tag="p">条形图</router-link>
				</el-menu-item>
				<el-menu-item index="4-4">
					<i class="iconfont icon-bingzhangtu"></i>
					<router-link :to="{name:'v-piepage'}" tag="p">饼状图</router-link>
				</el-menu-item>
				<el-menu-item index="4-5">
					<i class="iconfont icon-ring-chart"></i>
					<router-link :to="{name:'v-ringpage'}" tag="p">环状图</router-link>
				</el-menu-item>
				<el-menu-item index="4-6">
					<i class="iconfont icon-loudoutu"></i>
					<router-link :to="{name:'v-funnelpage'}" tag="p">漏斗图</router-link>
				</el-menu-item>
			</el-menu-item-group>
		</el-submenu>
		<el-menu-item index="5">
			<i class="iconfont icon-markdown"></i>
			<router-link :to="{name:'v-markdownpage'}" tag="span">markdown</router-link>
		</el-menu-item>
		<el-menu-item index="6">
			<i class="el-icon-setting"></i>
			<router-link :to="{name:'errorpage'}" tag="span">404</router-link>
		</el-menu-item>
		<el-menu-item index="7">
			<i class="el-icon-setting"></i>
			<router-link :to="{name:'errorpage'}" tag="span">404</router-link>
		</el-menu-item>
	</el-menu>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		}
	}
</script>
<style>
	.left-nav{
		height:100%;
	 	overflow-y:auto;
	 	overflow-x:hidden;
	}
	::-webkit-scrollbar {
	    width: 0px;
	    height: 1px;
	}
	::-webkit-scrollbar-thumb {
	    border-radius: 5px;
	    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	    background: rgba(0, 0, 0, 0.2);
	}
	.son-menu i,.son-menu p{
		display:inline-block;
		height:100%;
	}
</style>