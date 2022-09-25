<template>
	<view class="wrap">
		<view class="fixedHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			编辑标签<view style="color: #7A83D2;" @tap="updateTags">保存</view>
		</view>
		<!-- #ifdef APP-PLUS -->
		<view style="height:160rpx;"></view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view style="height:100rpx;"></view>
		<!-- #endif -->
		<view style="padding: 20rpx 50rpx 45rpx;">
			<view class="tags" v-for="(item,index) in userMarkerList" :key='index'>
				{{item}}
				<u-icon class="close" name="close-circle-fill" @tap="delTags(index)"></u-icon>
			</view>
		</view>

		<view style="width: 100%;height: 0;border-bottom: 2rpx solid #59595d;margin-bottom: 34rpx;"></view>
		<view class="flex-start" style="padding: 0 50rpx;font-size: 28rpx;color: #7A83D2;">
			<u-icon style="font-size:48rpx;" name="plus-circle-fill" @tap="customizeShow=true"></u-icon>
			<view @tap="customizeShow=true,customTag=''">添加自定义标签</view>
		</view>
		<!-- <view style="margin-top: 34rpx;padding: 0 50rpx;font-size: 20rpx;color: #D5D7DE;display: flex;flex: 1;"> -->
		<!-- 	<view style="width: 15%;padding-top: 10rpx;">可选标签</view>
			<view class="checked_tags">
				<view class="check_tag" v-for="(item,index) in checkList" :key="index" @click="addTags(index)">
					{{item.name}}
				</view>
			</view> -->
		<!-- </view> -->
		<u-popup v-model="customizeShow" mode="center" width="640rpx" height="468rpx" border-radius="20"
			safe-area-inset-bottom>
			<view class="flex-colum-align-around"
				style="background: #2A2A34;width: 100%;height:100%;box-sizing: border-box;padding-bottom: 25rpx;">
				<view>添加自定义标签</view>
				<u-field class="publishField" label-width="0" v-model.trim="customTag" placeholder="最多可输入10位字母、汉字、数字"
					clearable maxlength="16" clear-size="40" :border-bottom="false"></u-field>
				<view class="flex-around-center" style="width: 85%;">
					<view
						style="width: 242rpx;height: 80rpx;text-align: center;line-height: 80rpx;border-radius: 24rpx;background: #35353F;"
						@tap="customizeShow=false">
						取消
					</view>
					<view class="button"
						style="width: 242rpx;height: 80rpx;line-height: 80rpx;text-align: center;border-radius: 24rpx;"
						@tap="addCustomTag">
						添加
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import MineApi from "@/common/apis/mine.js"
	export default {
		data() {
			return {
				customTag: '',
				userCode: '',
				customizeShow: false,
				userMarkerList:[],
			}
		},
		onLoad() {
			this.getMineInfoData()
		},
		computed: {
			nickNameNum() {
				return this.nickName.length
			}
		},
		methods: {
			getMineInfoData() {
				MineApi.mineInfo().then(res => {
					this.userMarkerList = this.userMarkerList.concat(JSON.parse(res.userMarker))
				}).catch(err=>{
					this.$u.toast(err)
				})
			},
			customGoBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			delTags(index) {
				console.log(index);
				this.userMarkerList.splice(index, 1)
			},
			// addTags(index) {
			// 	if (this.userMarkerList.length > 12) {
			// 		uni.showToast({
			// 			icon: "none",
			// 			title: "最多能够勾选12个标签～"
			// 		})
			// 		return false
			// 	}
			// 	this.userMarkerList.push(this.checkList[index])
			// },
			addCustomTag() {
				this.customizeShow = false
				if (this.userMarkerList.length > 12) {
					uni.showToast({
						icon: "none",
						title: "最多能够勾选12个标签～"
					})
					return false
				}
				this.userMarkerList.push(
					this.customTag
				)
			},
			updateTags() {	
				MineApi.saveMarker({
					params: {
						userCode: this.userCode,
						userMarker: JSON.stringify(this.userMarkerList)
					}
				}).then(res => {
					uni.showToast({
						title: '保存成功',
						icon: 'none'
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 500)
				}).catch(err=>{
					this.$u.toast(err)
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

	.tags {
		font-size: 20rpx;
		color: #fff;
		background: #7A83D2;
		padding: 14rpx 25rpx;
		border-radius: 88rpx;
		margin: 15rpx 30rpx;
		position: relative;
		display: inline-block;

		.close {
			font-size: 40rpx;
			position: absolute;
			right: -20rpx;
			top: 50%;
			margin-top: -20rpx;
		}
	}

	.checked_tags {
		margin-left: 0;
		width: 84%;

		.check_tag {
			display: inline-block;
			background: #35353F;
			padding: 10rpx 20rpx;
			border-radius: 88rpx;
			margin-right: 10rpx;
			margin-bottom: 10rpx;
		}
	}

	.flex-colum-align-around {
		/deep/ .u-field {
			border-bottom: 2rpx solid #59595D;
			border-radius: 0;
			padding: 22rpx 0;
		}
	}
</style>
