<template>
	<view class="wrap">
		<view class="fixedHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			敬请期待<view></view>
		</view>
		<view style="height:130rpx;"></view>
		<view style="text-align: center;margin-top:30vh">建设中，敬请期待</view>
	</view>
</template>

<script>
	export default{
		methods:{
			customGoBack(){
				uni.switchTab({
					url: "/pages/sys/home/index"
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/css/index.scss";
</style> 