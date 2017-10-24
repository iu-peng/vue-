import axios from 'axios'

const _baseUrl = 'http://localhost:3100/api/'

export default {
	// 带参数的post
	haveParams(url,params){
		return axios.post(_baseUrl+url,params)
	},
	// 不带参数的get
	noParams(url){
		return axios.get(_baseUrl+url)
	},
	haveParamsGet(url,params){
		return axios.get(_baseUrl+url,params)
	},

};