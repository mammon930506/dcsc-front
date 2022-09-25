
<template>
	<view class="wrap">
		<view class="fixedHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			待支付<view></view>
		</view>
		<view style="height:130rpx;"></view>
		<view style="padding:0 34rpx 50rpx;position:relative">
			<view class="card" style="border-bottom-right-radius:0rpx;border-bottom-left-radius:0rpx;margin-bottom:0rpx">
				<view style="color:#AAAAAA;display:flex" @tap="gotoStore(order.userCode)">
					<view style="width:40rpx;height:40rpx;border-radius:20rpx;background-size:cover;margin-right:10rpx;background-position: center;"
					:style="{backgroundImage:`url(${imgBaseUrl}${artist.header}${imgSuffix})`}"></view>
					 {{artist.nickName }}
				</view>
				<view style="display: flex;margin-top:20rpx;position:relative">
					<view @tap="gotoNftDetail" style="width:192rpx;height:192rpx;border-radius:10rpx;background-size:cover;margin-right:30rpx;background-position: center;"
					:style="{backgroundImage:`url(${imgBaseUrl}${order.nftImgs}${imgSuffix})`}"></view>
					<view style="color:#F3F4F6;width:65%;display: flex;flex-direction: column;align-items: flex-end">
						<view>{{order.nftName}}</view>
						<view style="background-color:#35353F;padding:10rpx;border-radius: 10rpx;margin-top:20rpx;">x {{ order.orderCount }}</view>
					</view>
				</view>
				<view class="authRow">
					<view class="authTitle">尚品总额</view>
					<view class="authContent nowrapellipsis">￥{{ cent2yuan(order.orderAmount) }}</view>
				</view>
				<view class="authRow">
					<view class="authTitle">余额</view>
					<view class="authContent nowrapellipsis">￥0</view>
				</view>
			</view>
			<view style="height:2rpx;background-color:#59595D"></view>
			<view class="card"
				style="border-top-right-radius:0rpx;border-top-left-radius:0rpx;font-size:24rpx;display: flex;justify-content: space-between;
				font-size:34rpx;color:#F3F4F6">
				<view>实付款：</view>
				<view style="color:#F87171">￥{{ cent2yuan(order.orderAmount) }}</view>
			</view>
			<view class="card">
				<view class="authRow" style="margin-top:0">
					<view class="authTitle" style="width:100%">订单编号：{{ order.orderCode }}</view>
				</view>
				<view class="authRow">
					<view class="authTitle" style="width:100%">下单时间：{{ order.createdDate&&$u.timeFormat(order.createdDate, 'yyyy-mm-dd hh:MM:ss') }}</view>
				</view>
			</view>
			<view style="height:200rpx;"></view>
			<view style="background-color:#2A2A34;height:200rpx;border-top:2rpx solid #59595D;padding:30rpx;position:fixed;width:100%;bottom:0;left:0">
				<view style="display:flex;justify-content: flex-end">
					<view class="bibtn plainbutton" @click="cancelPay">取消支付</view>
					<view class="bibtn button" @click="gotoPayNow">立即支付</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import MerchandiseApi from "@/common/apis/merchandise.js"
	import StoreApi from "@/common/apis/store.js"
	import jlCatche from '@/common/utils/jlCatche'

	export default{
		data(){
			return {
				order:{},
				artist:{}
			}
		},
		onLoad(option){
			MerchandiseApi.payInfo({
				params:{
					orderCode:option.orderCode
				}
			}).then(res=>{
				this.order =res
				MerchandiseApi.info({
					params:{
						nftCode:this.order.nftCode
					}
				}).then(res=>{
					StoreApi.artistInfo({
						params:{
							userCode:res.userCode
						}
					}).then(res=>{
						this.artist = res
					}).catch(err=>{
						this.$u.toast(err)
					})
				}).catch(err=>{
					this.$u.toast(err)
				})
			}).catch(err=>{
				this.$u.toast(err)
			})

		},
		methods:{
			cent2yuan,
			payJump,
			gotoNftDetail(){
				uni.navigateTo({
					url:`/pages/sys/merchandise/detail?nftCode=${this.order.nftCode}`
				})
			},
			gotoStore(userCode){
				uni.navigateTo({
					url:`/pages/sys/merchandise/store?userCode=${userCode}`
				})
			},
			customGoBack(){
				uni.navigateBack({
					delta:1
				})
			},

			cancelPay(){
				uni.navigateTo({
					url:`/pages/sys/order/list`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/css/index.scss";


	.authRow {
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		margin-top: 30rpx;
		.authTitle {
			width: 30%;
			color: #9CA3AF;
		}
		.authContent {
			max-width: 70%;
			color: #F3F4F6;
		}
	}

</style>
