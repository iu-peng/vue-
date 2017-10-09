import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Login from '@/components/page/login'

import Home from '@/components/page/home'
//pos页面
import Pospage from '@/components/page/pospage/pospage'
//头部和左侧导航
import headerNav from '@/components/common/header'
import leftNav from '@/components/common/leftNav'
//404页面
import Error from '@/components/page/errorpage/error'
//折线图
import Vline from '@/components/page/v-charts/line'
//柱状图
import Vcolumn from '@/components/page/v-charts/column'
//条形图
import Vbar from '@/components/page/v-charts/bar'
//饼状图
import Vpie from '@/components/page/v-charts/pie'
//环状图
import Vring from '@/components/page/v-charts/ring'
//漏斗图
import Vfunnel from '@/components/page/v-charts/funnel'
//雷达图
import Vradar from '@/components/page/v-charts/radar'
//地图
import Vmap from '@/components/page/v-charts/map'

//markdown
import Markdown from '@/components/page/markdown/markdown'



let router = new Router({
	mode:'history',
  	routes: [
  	{
  		path:'/',
  		component:Login,
  		name:'login'
  	},
    {
	    path: '/home',
	    //name: 'home',
	    component:Home,
	    children:[
      		{
	      		path:'',
	      		components:{head:headerNav,left:leftNav,default:Pospage},
	      		name:"pospage"
	      	},
	      	{
	      		path:'/error',
	      		components:{head:headerNav,left:leftNav,default:Error},
	      		name:'errorpage'
	      	},
	      	{
	      		path:'/v-line',
	      		components:{head:headerNav,left:leftNav,default:Vline},
	      		name:'v-linepage'
	      	},
	      	{
	      		path:'/v-column',
	      		components:{head:headerNav,left:leftNav,default:Vcolumn},
	      		name:'v-columnpage'
	      	},
	      	{
	      		path:'/v-bar',
	      		components:{head:headerNav,left:leftNav,default:Vbar},
	      		name:'v-barpage'
	      	},
	      	{
	      		path:'/v-pie',
	      		components:{head:headerNav,left:leftNav,default:Vpie},
	      		name:'v-piepage'
	      	},
	      	{
	      		path:'/v-ring',
	      		components:{head:headerNav,left:leftNav,default:Vring},
	      		name:'v-ringpage'
	      	},
	      	{
	      		path:'/v-funnel',
	      		components:{head:headerNav,left:leftNav,default:Vfunnel},
	      		name:'v-funnelpage'
	      	},
	      	{
	      		path:'/v-radar',
	      		components:{head:headerNav,left:leftNav,default:Vradar},
	      		name:'v-radarpage'
	      	},
	      	{
	      		path:'/v-map',
	      		components:{head:headerNav,left:leftNav,default:Vmap},
	      		name:'v-mappage'
	      	},
	      	{
	      		path:'/v-markdown',
	      		components:{head:headerNav,left:leftNav,default:Markdown},
	      		name:'v-markdownpage'
	      	}
      	]
    }
  ]
})

export default router