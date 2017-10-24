import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

let store = new Vuex.Store({
	state:{
		kindsData:[]
	},
	mutations:{
		editPriceAll(sta,data){
			sta.priceAll = data //返回的是购物车里的所有信息
		},
		setKindsData(state,data){
			state.kindsData = data //返回的是购物车里的所有信息
			//console.log(this.state.kindsData)
		}
	},
	actions:{
		editKindsData(state,data){
			state.commit('setKindsData',data)
			console.log(this.kindsData)
		}
	}
})

export default store
