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
			<i class="el-icon-menu"></i>
			<router-link :to="{name:'pospage'}" tag="span">Pos收银系统</router-link>
		</el-menu-item>
		<!-- 404栏 -->
		<el-menu-item index="3">
			<i class="el-icon-setting"></i>
			<router-link :to="{name:'errorpage'}" tag="span">404</router-link>
		</el-menu-item>
		<!-- 图表栏 -->
		<el-submenu index="4">
			<template slot="title"><i class="el-icon-menu"></i>v-charts图表</template>
			<el-menu-item-group>
				<el-menu-item index="4-1">
					<router-link :to="{name:'v-linepage'}" tag="span">折线图</router-link>
				</el-menu-item>
				<el-menu-item index="4-2">
					<router-link :to="{name:'v-columnpage'}" tag="span">柱状图</router-link>
				</el-menu-item>
				<el-menu-item index="4-3">
					<router-link :to="{name:'v-barpage'}" tag="span">条形图</router-link>
				</el-menu-item>
				<el-menu-item index="4-4">
					<router-link :to="{name:'v-piepage'}" tag="span">饼状图</router-link>
				</el-menu-item>
			</el-menu-item-group>
		</el-submenu>
		<el-menu-item index="42">
			<i class="el-icon-setting"></i>
			<!-- <router-link :to="{name:'v-linepage'}" tag="span">v-charts</router-link> -->
		</el-menu-item>
		<el-menu-item index="5">
			<i class="el-icon-setting"></i>
			<router-link :to="{name:'errorpage'}" tag="span">404</router-link>
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
	 	overflow: hidden;
	}
</style>