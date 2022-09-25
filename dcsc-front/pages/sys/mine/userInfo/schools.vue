<template>
	<view class="wrap">
		<view class="fixedHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			选择学校<view style="color: #7A83D2;position: relative;height: 100%;" class="underfind"></view>
		</view>
		<!-- #ifdef APP-PLUS -->
		<view style="height:160rpx;"></view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view style="height:100rpx;"></view>
		<!-- #endif -->
		<view class="sideMargin" style="position:relative;margin-bottom:10rpx;padding: 0 30rpx;margin-top: 30rpx;">
			<u-input :clearable="false" :custom-style="searchStyle"
				placeholder-style="color:#6B7280" placeholder="请输入关键字搜索" v-model="keyword"></u-input>
			<image src="/static/common/img/index/recommend/Search.png"
				style="width:35rpx;height:36rpx;position:absolute;right:66rpx;top:calc( 50% - 18rpx )"></image>
		</view>
		<view style="margin-top: 20rpx;padding-left: 30rpx;">
			<view style="padding: 30rpx 0;border-bottom: 2rpx solid #59595d;">北京大学</view>
			<view style="padding: 30rpx 0;border-bottom: 2rpx solid #59595d;">清华大学</view>
			<view style="padding: 30rpx 0;border-bottom: 2rpx solid #59595d;">中国人民大学</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickName: '小丸子',
				keyword: '',
				searchStyle: {
					height: "90rpx",
					backgroundColor: '#2A2A34',
					borderRadius: '24rpx',
					paddingLeft: '36rpx'
				},
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

	.underfind::after {
		content: '没有找到？';
		position: absolute;
		width: 5em;
		right: 0;
		font-size: 30rpx;
		top: 10rpx;
	}
</style>
