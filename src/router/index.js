import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


const Home = r => require.ensure([], () => r(require('@/components/page/home')), 'home')
const Inall = r => require.ensure([], () => r(require('@/components/page/inallpage/inall')), 'inall')
const Shopcar = r => require.ensure([], () => r(require('@/components/page/shopcar/shopcar')), 'shopcar')
const Login = r => require.ensure([], () => r(require('@/components/page/login')), 'login')
const Pospage = r => require.ensure([], () => r(require('@/components/page/pospage/pospage')), 'pospage')
const headerNav = r => require.ensure([], () => r(require('@/components/common/header')), 'header')
const leftNav = r => require.ensure([], () => r(require('@/components/common/leftNav')), 'leftnav')
const Error = r => require.ensure([], () => r(require('@/components/page/errorpage/error')), 'error')
const Vline = r => require.ensure([], () => r(require('@/components/page/v-charts/line')), 'vline')
const Vcolumn = r => require.ensure([], () => r(require('@/components/page/v-charts/column')), 'vcolumn')
const Vbar = r => require.ensure([], () => r(require('@/components/page/v-charts/bar')), 'vbar')
const Vpie = r => require.ensure([], () => r(require('@/components/page/v-charts/pie')), 'vpie')
const Vring = r => require.ensure([], () => r(require('@/components/page/v-charts/ring')), 'vring')
const Vfunnel = r => require.ensure([], () => r(require('@/components/page/v-charts/funnel')), 'vfunnel')
const Vradar = r => require.ensure([], () => r(require('@/components/page/v-charts/radar')), 'vradar')
const Vmap = r => require.ensure([], () => r(require('@/components/page/v-charts/map')), 'vmap')
const Markdown = r => require.ensure([], () => r(require('@/components/page/markdown/markdown')), 'markdown')
const Ueditor = r => require.ensure([], () => r(require('@/components/page/ueditor/ueditor')), 'ueditor')
const Weather = r => require.ensure([], () => r(require('@/components/page/weather/weather')), 'weather')
const WeatherNext = r => require.ensure([], () => r(require('@/components/page/weather/nextweather')), 'weathernext')
const WeatherDetails = r => require.ensure([], () => r(require('@/components/page/weatherdetails/weath-details')), 'weatherdetails')




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
	      		path:'/',
	      		components:{head:headerNav,left:leftNav,default:Inall},
	      		name:'inallpage'
	      	},
      		{
	      		path:'possystem',
	      		components:{head:headerNav,left:leftNav,default:Pospage},
	      		name:"pospage"
	      	},
      		{
	      		path:'shopcar',
	      		components:{head:headerNav,left:leftNav,default:Shopcar},
	      		name:"shopcar"
	      	},
	      	{
	      		path:'error',
	      		components:{head:headerNav,left:leftNav,default:Error},
	      		name:'errorpage'
	      	},
	      	{
	      		path:'v-line',
	      		components:{head:headerNav,left:leftNav,default:Vline},
	      		name:'v-linepage'
	      	},
	      	{
	      		path:'v-column',
	      		components:{head:headerNav,left:leftNav,default:Vcolumn},
	      		name:'v-columnpage'
	      	},
	      	{
	      		path:'v-bar',
	      		components:{head:headerNav,left:leftNav,default:Vbar},
	      		name:'v-barpage'
	      	},
	      	{
	      		path:'v-pie',
	      		components:{head:headerNav,left:leftNav,default:Vpie},
	      		name:'v-piepage'
	      	},
	      	{
	      		path:'v-ring',
	      		components:{head:headerNav,left:leftNav,default:Vring},
	      		name:'v-ringpage'
	      	},
	      	{
	      		path:'v-funnel',
	      		components:{head:headerNav,left:leftNav,default:Vfunnel},
	      		name:'v-funnelpage'
	      	},
	      	{
	      		path:'v-radar',
	      		components:{head:headerNav,left:leftNav,default:Vradar},
	      		name:'v-radarpage'
	      	},
	      	{
	      		path:'v-map',
	      		components:{head:headerNav,left:leftNav,default:Vmap},
	      		name:'v-mappage'
	      	},
	      	{
	      		path:'v-markdown',
	      		components:{head:headerNav,left:leftNav,default:Markdown},
	      		name:'v-markdownpage'
	      	},
	      	{
	      		path:'ueditor',
	      		components:{head:headerNav,left:leftNav,default:Ueditor},
	      		name:'ueditorpage'
	      	},
	      	{
	      		path:'weather',
	      		components:{head:headerNav,left:leftNav,default:Weather},
	      		name:'weatherpage'
	      	},
	      	{
	      		path:'WeatherNext',
	      		components:{head:headerNav,left:leftNav,default:WeatherNext},
	      		name:'Weathernextpage'
	      	},
	      	{
	      		path:'weatherDetails',
	      		components:{head:headerNav,left:leftNav,default:WeatherDetails},
	      		name:'WeatherDetailspage'
	      	}
      	]
    }
  ]
})

export default router