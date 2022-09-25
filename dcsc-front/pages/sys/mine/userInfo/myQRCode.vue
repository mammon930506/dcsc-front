<template>
	<view class="wrap">
		<view class="fixedHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			二维码<view></view>
		</view>
		<!-- #ifdef APP-PLUS -->
		<view style="height:160rpx;"></view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view style="height:100rpx;"></view>
		<!-- #endif -->
		<view class="card" style="width: 92%;margin: 60rpx auto 0;border-radius: 48rpx;text-align: center;">
			<!-- 头像 -->
			<view class="centercover"
				style="width: 138rpx;height: 138rpx;margin: 52rpx auto 0;border: 2px solid #423F55;"
				:style="{backgroundImage:`url(${imgBaseUrl}${header}${imgSuffix}`}">
			</view>
			<!-- 昵称 -->
			<view style="margin-top: 24rpx;font-size: 40rpx;font-weight: 500;">
				{{ nickName }}
			</view>
			<!-- 青春尚品号 -->
			<view style="font-size: 30rpx;font-weight: 400;color: #9BA3B3;margin-top: 12rpx;">
				邀请码：{{ inviteCode }}
			</view>
			<!-- 二维码 -->
			<view
				style="width: 490rpx;height: 490rpx;margin: 70rpx auto 104rpx;border: 4px solid #FFFFFF;background-size: 100% 100%;"
				:style="{backgroundImage:`url(${qrcode})`}">

			</view>
		</view>
	</view>
</template>

<script>
	import MineApi from "@/common/apis/mine.js"
	import {
		base64ToBlob,base64ToPngApp
	} from "@/common/common.js"
	export default {
		data() {
			return {
				userCode: '',
				qrcode: '',
				header: '',
				nickName:'',
				inviteCode:'',
			}
		},
		onLoad(option) {
			this.userCode = option.userCode
			this.getMineInfoData()
			this.getInviteCode()
			this.getQRCode()
		},
		methods: {
			getQRCode(){
				MineApi.qrcode({
					params: {
						userCode: this.userCode
					}
				}).then(res => {
					console.log(res, 'qrcode');
					// #ifdef H5
					let blob = base64ToBlob('data:image/jpeg;base64,'+res.qrcode)
					this.qrcode = URL.createObjectURL(blob)
					// #endif
					// #ifdef APP-PLUS
					base64ToPngApp('data:image/jpeg;base64,'+res.qrcode,`myQRCode_${this.userCode}`).then(event=>{
						this.qrcode = event.target
					}).catch(err=>{
						this.$u.toast(err)
					})    
					// #endif
				}).catch(err=>{
					this.$u.toast(err)
				})
			},
			getInviteCode(){
				MineApi.myInviteInfo({}).then(res => {
					this.inviteCode = res.recommenderCode
				}).catch(err => {
					this.$u.toast(err)
				})
			},
			getMineInfoData() {
				MineApi.mineInfo().then(res => {
					this.header = res.header
					this.nickName = res.nickName
				}).catch(err=>{
					this.$u.toast(err)
				})
			},
			customGoBack() {
				uni.navigateBack({
					delta: 1
				})
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
