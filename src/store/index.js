import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

let store = new Vuex.Store({
	state:{
		
	},
	mutations:{
		editPriceAll(sta,data){
			sta.priceAll = data //返回的是购物车里的所有信息
		}
	}
})

export default store
