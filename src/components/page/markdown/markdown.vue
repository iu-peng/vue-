<template>
	<div>
		<mavon-editor style="height: 100%"></mavon-editor>
	</div>
</template>

<script>
	//import Vue from 'vue'
	import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
	//Vue.use(mavonEditor)
	export default {
		data(){
			return {
				value:''
			}
		},
		components:{
			 mavonEditor
		}
}
		
</script>
<style>
	
</style>