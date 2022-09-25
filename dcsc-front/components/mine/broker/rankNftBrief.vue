<template>
	<view style="position:relative;background-color:#2A2A34;border-radius: 32rpx;padding:30rpx 24rpx;margin-bottom:20rpx;">
		<view class="flex-row-between-start">
			<view @tap="gotoDetail" class="centercover" style="position:relative;width:208rpx;height:208rpx;border-radius:20rpx;"
			:style="{backgroundImage:`url(${imgBaseUrl}${brief.nftImgs}${imgSuffix})`}">
				<view class="rankPos">
					<view class="trapezoid" :class="brief.rankIndex<3?'rankNftTop':'rankNftNormal'"></view>
					<view class="rankNum">{{ brief.rankIndex }}</view>
				</view>
			</view>
			<view class="flex-col-between-start" style="width:calc( 100% - 300rpx );min-height:208rpx;word-wrap: break-word;word-break: break-all;">
				<view style="font-size:28rpx;">{{ brief.nftName }}</view>
				<view style="font-size:20rpx;color:#9BA3B3">
					<view>收藏量{{brief.storeup}}</view>
					<view>销售金额{{brief.orderAmount}} | 交易单量{{brief.orderCount}}单</view>
				</view>
				<view class="flex-row-start-center">
					<view @tap="gotoArtistMain" class="centercover" style="width:36rpx;height:36rpx;margin-right:20rpx;"
					:style="{backgroundImage:`url(${imgBaseUrl}${brief.header}${imgSuffix})`}"></view>
					<view style="color:#EAE5F8;font-size:20rpx;">{{ brief.nickName }}</view>
				</view>
			</view>
			<view @tap="handleStore" :class="Number(brief.isStoreup)===1?'briefHearted':'briefUnHearted'" style="width:48rpx;height:48rpx;background-size:100% 100%;"></view>
		</view>
	</view>
</template>

<script>
	import MerchandiseApi from "@/common/apis/merchandise.js"
	export default{
		props:{
			brief:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		methods:{
			handleStore() {
				MerchandiseApi.storeUp({
					params: {
						nftCode: this.brief.nftCode
					}
				}).then(res => {
					this.brief.isStore = res.isStore
				}).catch(err => {
					this.$u.toast(err)
				})
			},
			gotoDetail(){
				uni.navigateTo({
					url:`/pages/sys/merchandise/detail?nftCode=${this.brief.nftCode}`
				})
			},
			gotoArtistMain(){
				uni.navigateTo({
					url:`/pages/sys/merchandise/artistMain?userCode=${this.brief.userCode}`
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import url('@/common/css/index.scss');
	.briefHearted{
		background-image: url("@/static/common/img/rank/icon2.png");
	}
	.briefUnHearted{
		background-image: url("@/static/common/img/rank/icon1.png");
	}
	
	.rankPos{
		position:absolute;
		width:90rpx;
		height:40rpx;
		left:-24rpx;
		top:10rpx;
		.rankNum{
			width:100%;
			height:100%;
			position:absolute;
			top:0;
			left:0;
			font-weight: bold;
			font-size:24rpx;
			text-align: center;
		}
	}
	.trapezoid{
		width:100%;
		height:100%;
		border-radius: 8rpx;
		transform: perspective(30rpx) rotateX(-10deg);
		transform-origin: left top;
	}
	.rankNftTop{
		background-size: 100% 100%;
		background-image:url("@/static/common/img/login/Button@3x.png")
	}
	.rankNftNormal{
		background-color:#7A83D2;
	}
</style>