<template>
	<view class="wrap">
		<!-- #ifdef H5 -->
		<view class="pageHeader">
			<view style="margin-right:50rpx"></view>
			支付状态<view @tap="gotoOrderList" style="font-size:34rpx">完成</view>
		</view>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS -->
		<view class="fixedHeader">
			<view style="margin-right:50rpx"></view>
			支付状态<view @tap="gotoOrderList" style="font-size:34rpx">完成</view>
		</view>
		<view style="height: 170rpx;"></view>
		<!-- #endif -->
		<view>
			<view>
				<view :class="{'paySuccess':['0011','0013'].includes(orderStatus),'payFail':orderStatus==='0012'}" style="width:128rpx;height:128rpx;background-size:100% 100%;margin:100rpx auto 30rpx"></view>
			</view>
			<view style="color:#F3F4F6;font-size:34rpx;text-align: center;">{{ orderStatusOptions[orderStatus] }}</view>
		</view>
		<view style="display: flex;justify-content: center;margin:80rpx 0 100rpx;">
			<view @tap="gotoMerchandiseList" class="bibtn plainbutton">继续购买</view>
			<view @tap="gotoOrderDetail" class="bibtn button">查看订单</view>
		</view>
		<view style='color:#9CA3AF;font-size:24rpx;padding:0 104rpx'>
			<view style="margin-bottom:15rpx;">温馨提示:</view>
			<view>商城不会以订单异常、系统升级为由，要求您点击任何网址进行退款操作！</view>
		</view>
<!--		<view style="position: fixed;bottom:150rpx;width:100%;color:#7A83D2;text-align: center;">-->
<!--			<span @tap="gotoMerchandiseDetail">跳转至尚品详情</span>-->
<!--			<span style="color:#F3F4F6;margin:0 30rpx">|</span>-->
<!--			<span @tap="gotoOrderDetail">跳转至订单详情</span>-->
<!--		</view>-->
	</view>
</template>

<script>
	import MerchandiseApi from "@/common/apis/merchandise.js"
	import {overallCodeOptions,overallTitleOptions } from '@/common/commonOptions.js'
	export default{
		data(){
			return{
				payResult:{},
				orderStatus:'',
				overallStatus:'',
				overallCodeOptions,
				overallTitleOptions,
				orderStatusOptions:{
					'0011':'支付中\r\n请稍后查询支付状态',
					'0012':'支付失败',
					'0013':'支付成功',
				}
			}
		},
		onLoad(option){
			this.payResult = option
			this.orderStatus = option.orderStatus
			if(navigator){
				if(this.openInWebview()){
					console.log('inWebview')
					uni.webView.navigateTo({
						url:`/pages/sys/order/payStatus?orderStatus=${option.orderStatus}&orderCode=${option.orderCode}`
					})
					return
				}
			}
			// let that = this
			// // document.addEventListener('UniAppJSBridgeReady', function() {
			// 	uni.webView.getEnv(function(res) {
			// 		console.log('检测到环境')
			// 		console.log(res.plus)
			// 		console.log(res.h5)
			// 		console.log(option.orderStatus)
			// 		console.log(option.orderCode)
			// 		if(res.plus){
			// 		// 	uni.webView.postMessage({
			// 		// 		data: encodeURIComponent(`/pages/sys/order/payStatus?orderStatus=${option.orderStatus}&orderCode=${option.orderCode}`)
			// 		// 	})
			// 			uni.webView.redirectTo({
			// 			    url: `/pages/sys/order/payStatus?orderStatus=${option.orderStatus}&orderCode=${option.orderCode}`
			// 			})
			// 		}
			// 	});	
			// // })
		},
		methods:{
			gotoMerchandiseList(){
				uni.switchTab({
					url:"/pages/sys/merchandise/list"
				});
			},
			gotoOrderDetail(){
				this.classifyOverall(this.payResult)
				uni.navigateTo({
					url:`/pages/sys/order/orderDetail?overallStatus=${this.payResult.overallStatus}&orderCode=${this.payResult.orderCode}`
				})
			},
			classifyOverall(order){
				for(let key in this.overallCodeOptions){
					if(this.overallCodeOptions[key].includes(order.orderStatus)){
						order.overallStatus = key
						break
					}
				}
			},
			// gotoMerchandiseDetail(){
			// 	MerchandiseApi.payInfo({
			// 		params:{
			// 			orderCode:this.payResult.orderCode
			// 		}
			// 	}).then(res=>{
			// 		uni.navigateTo({
			// 			url:`/pages/sys/merchandise/detail?nftCode=${res.nftCode}`
			// 		})
			// 	}).catch(err=>{
			// 		this.$u.toast(err)
			// 	})
			// },
			gotoOrderList(){
				uni.navigateTo({
					url: '/pages/sys/order/list'
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
