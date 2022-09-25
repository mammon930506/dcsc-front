<template>
	<view>
		<web-view @message="handleMsg" :webview-styles="webviewStyles" :src="webviewUrl"></web-view>
	</view>
</template>
<script>
/**
 * Copyright (c) 2013-Now http://aidex.vip All rights reserved.
 */
export default {
	data() {
		return {
			webviewUrl: '',
			webviewStyles: {
				progress: {
					color: '#FF7200'
				}
			}
		};
	},
	onLoad(option) {
		console.log("pay的跳转地址：")
		console.log(decodeURIComponent(option.url))
		this.webviewUrl = `${decodeURIComponent(option.url)}?actionUrl=${option.actionUrl}&payment=${option.payment}`
		// this.webviewUrl = `http://127.0.0.1:8980/js/a/bpm/bpmCategory/index/process?__sid=${this.vuex_token}&__cookie=true`;
		if (option.title != ''){
			uni.setNavigationBarTitle({
				title: option.title
			})
		}
	},
	methods:{
		handleMsg(event){
			console.log('webview来的消息')
			console.log(event.detail.data)
		}
	}
};
</script>
<style lang="scss">
	
</style>
