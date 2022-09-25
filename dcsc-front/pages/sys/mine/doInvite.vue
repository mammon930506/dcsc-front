<template>
	<view class="wrap">
		<view class="fixedHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			邀请好友<view></view>
		</view>
		<!-- #ifdef APP-PLUS -->
		<view style="height:170rpx;"></view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view style="height:130rpx;"></view>
		<!-- #endif -->
		<view style="padding:0 30rpx;">
			<view class="card" style="background-color:#2A2A34">
				<view class="preview poster" style="height:450rpx;"></view>
				<view style="display: flex;justify-content: space-between;">
					<view style="display: flex;flex-direction: column;justify-content: space-between;width:50%">
						<view style="color:#9CA3AF;font-size: 24rpx;">邀请码</view>
						<view class="nowrapellipsis"
							style="background-color: #35353F;padding:10rpx 20rpx;border-radius:10rpx;">
							{{ brief.recommenderCode }}</view>
						<view style="color:#F3F4F6;font-size: 32rpx;" @tap="handleCopy(brief.recommenderCode)">点击复制
						</view>
					</view>
					<u-image @tap="handleZoom" :src="brief.qrCode" border-radius="20" width="180" height="180">
					</u-image>
				</view>
				<view style="text-align: end;font-size: 28rpx;color:#7A83D2;margin:30rpx 0;" @tap="handleZoom">保存二维码</view>
				<view style="display: flex;justify-content: space-between;">
					<view class="button midbtn" @tap="gotoMyInvited">我的邀请</view>
					<view class="button midbtn" @tap="gotoMyInvitedOrder">邀请订单</view>
				</view>
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
				brief: {},
				imgUrl:''
			}
		},
		onLoad() {
			MineApi.myInviteInfo({}).then(res => {
				res.qrCode = "data:image/png;base64," + res.qrCode
				this.brief = res
				this.prepareImg()
			}).catch(err => {
				this.$u.toast(err)
			})
		},
		methods: {
			prepareImg(){
				// #ifdef H5
				let blob = base64ToBlob(this.brief.qrCode)
				this.imgUrl = URL.createObjectURL(blob)
				// #endif 
				// #ifdef APP-PLUS
				base64ToPngApp(this.brief.qrCode,`doInvite_${this.brief.recommenderCode}`).then(event=>{
					this.imgUrl = event.target
				}).catch(err=>{
					this.$u.toast(err)
				})    
				// #endif
			},

			previewPoster(){
				uni.previewImage({
					urls: ["/static/common/img/mine/publish/inviteposter.jpg"],
					success: function() {
						console.log('success');
					}
				})
			},
			handleZoom() {
				let url = this.imgUrl
				uni.previewImage({
					urls: [url],
					success: function() {
						console.log('success');
					}
				})
			},
			gotoMyInvited() {
				uni.navigateTo({
					url: "/pages/sys/mine/myInvitedUser"
				})
			},
			gotoMyInvitedOrder() {
				uni.navigateTo({
					url: "/pages/sys/mine/myInvitedOrder"
				})
			},
			handleCopy(data) {
				uni.setClipboardData({
					data,
					success: function() {
						console.log('success');
					}
				})
			},
			customGoBack() {
				uni.switchTab({
					url:"/pages/sys/mine/index"
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

	.midbtn {
		width: 300rpx;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 30rpx;
	}

	.poster{
		background-image: url("@/static/common/img/mine/publish/inviteposter.jpg");
		background-size: cover;
		background-position: center;
	}
</style>
