<template>
	<div class="errorbox">
		<img src="../../../assets/img/page-not-found.png" />
	</div>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		mounted(){
			let neiH = (document.documentElement.clientHeight || document.body.clientHeight)-60
			document.querySelector('.errorbox').style.height = neiH + 'px'
		}
	}
</script>
<style>
	.errorbox{
		background:url(../../../assets/img/bg.jpg);
		overflow: hidden;
	}
	.errorbox img{
		display:block;
		margin:100px auto;
	}
</style>