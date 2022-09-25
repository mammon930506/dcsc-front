<template>
	<view class="wrap">
		<view class="fixedHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			地区<view style="color: #7A83D2;"></view>
		</view>
		<view style="height:100rpx;"></view>
		<view style="padding: 30rpx 50rpx 0;">
			<view class="card" style="color:#F3F4F6" @tap="linkTo('./myQRCode')">
				<view class="flex-between">
					<view style="color: #7A83D2;">使用当前位置</view>
				</view>
			</view>
			<view class="card" style="color:#F3F4F6" @tap="linkTo('./myQRCode')">
				<view class="flex-between">
					<view>省市</view>
					<view >
						湖北省·武汉市·江夏区
						<u-icon name="arrow-right" style="margin-left: 10rpx;"></u-icon>
					</view>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickName: '小丸子'
			}
		},
		onLoad() {

		},
		computed: {
			nickNameNum() {
				return this.nickName.length
			}
		},
		methods: {
			customGoBack() {
				uni.navigateBack({
					delta: 1
				})
			},
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
