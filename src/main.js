// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '@/router'
//引入饿了么组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
//引入样式表
import '@/assets/css/app.css'
//引入v-charts表
import VCharts from 'v-charts'


Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VCharts)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
