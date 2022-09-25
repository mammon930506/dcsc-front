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
		console.log('进入authWebview')
		console.log(uni.getStorageSync('webview'))
		console.log(decodeURIComponent(option.url))
		this.webviewUrl = decodeURIComponent(option.url)
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
			let obj = event.detail.data
			let query = obj.query?decodeURIComponent(obj.query):''
			uni.switchTab({
				url: "/pages/sys/mine/index"
			})
		}
	}
};
</script>
<style lang="scss">
	
</style>
