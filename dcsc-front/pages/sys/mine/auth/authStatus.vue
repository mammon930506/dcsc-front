<template>
	<view class="wrap">
		<view class="pageHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			认证结果<view></view>
		</view>
		<view>
			<view>
				<view :class="authClassOptions[authStatus]" style="background-size:100% 100%;margin:100rpx auto 30rpx"></view>
			</view>
			<view style="color:#F3F4F6;font-size:34rpx;text-align: center;">{{ authStatusOptions[authStatus] }}</view>
		</view>
		<view v-if="authStatus!==-1" style="display: flex;justify-content: center;margin:80rpx 0 100rpx;">
			<view @tap="customGoBack" class="bibtn plainbutton">返回</view>
		</view>
	</view>
</template>

<script>
	import { obj2query } from '@/common/common.js'
	import jlCatche from "@/common/utils/jlCatche.js"
	import LoginApi from "@/common/apis/login";
 	export default{
		data(){
			return{
				authStatus:-1,
				authStatusOptions:{
					'-1':'认证中...',
					'0':'认证失败',
					'1':'认证成功',
				},
				authClassOptions:{
					'-1':'authing',
					'0':'payFail',
					'1':'paySuccess',
				}
			}
		},
		onLoad(option){
			// console.log("navigator")
			// console.log(navigator)
			// console.log("openInWebview")
			// console.log(this.openInWebview())
			if(navigator){
				if(this.openInWebview()){
					console.log('inWebview')
					let query = obj2query(option)
					uni.webView.navigateTo({
						url:"/pages/sys/mine/auth/authStatus"+query
					})
					return
				}
			}
			// let query = obj2query(option)
			// query = encodeURIComponent(query)
			// let url = "/pages/sys/mine/auth/authStatus"
			// uni.webView.postMessage({
			// 	data:{
			// 		url,
			// 		query
			// 	} 
			// })
			// let flag = await this.checkWebview()
			// if(flag)return
			if(!option.face_image_url){
				this.authStatus = 0
				return
			}
			uni.showLoading({
				title:'正在认证...',
				mask:true
			})
			LoginApi.faceIdcardCompare({
				params:{
					idcardNo:jlCatche.getStorageSync('idcardNo'),
					idcardName:jlCatche.getStorageSync('idcardName'),
					faceImageUrl:option.face_image_url
				}
			}).then(res=>{
				this.authStatus = 1
				uni.hideLoading()
			}).catch(err=>{
				this.authStatus = 0
				uni.hideLoading()
				this.$u.toast(err)
			})
			
		},
		methods:{
			checkWebview(){
				// return new Promise(resolve=>{
					// console.log('开始检测')
					// console.log(uni.getSystemInfoSync().platform)
					// if(uni.webView){
					// 	console.log('存在webview对象')
					// 	uni.webView.getEnv(function(res) {
					// 		console.log('检测到环境')
					// 		console.log(res.plus)
					// 		console.log(res.h5)
					// 		if(res.plus){
					// 			console.log('现在是app环境')
					// 			let query = obj2query(option)
					// 			uni.webView.redirectTo({
					// 			    url: `/pages/sys/mine/auth/authStatus`+query
					// 			})
					// 			resolve(true)
					// 		}else{
					// 			resolve(false)
					// 		}
					// 	});	
					// }else{
					// 	console.log('不存在webview对象')
					// 	resolve(false)
					// }
				// })
			},
			customGoBack(){
				uni.switchTab({
					url:'/pages/sys/mine/index'
				})
			},
			openInWebview () {
			    var ua = navigator.userAgent.toLowerCase()
			    if (ua.match(/MicroMessenger/i) == 'micromessenger') { 
			        return false
			    } else if (ua.match(/QQ/i) == 'qq') { 
			        return false
			    } else if (ua.match(/WeiBo/i) == "weibo") {
			        return false
			    } else {
			        if (ua.match(/Android/i) != null) {
			            return ua.match(/browser/i) == null
			        } else if (ua.match(/iPhone/i) != null) {
			            return ua.match(/safari/i) == null
			        } else {
			            return (ua.match(/macintosh/i) == null && ua.match(/windows/i) == null)
			        }
			    }
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #18181c;
	}
</style>
<style lang="scss" scoped>
	@import "@/common/css/index.scss";
</style>