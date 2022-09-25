<template>
	<view @tap="gotoDetail" class="card" style="display: flex;">
		<view style="width:160rpx;height:160rpx;border-radius: 20rpx;background-size: cover;background-position: center;margin-right:30rpx;" :style="{backgroundImage:`url(${imgBaseUrl}${nftDetail.nftImg}${imgSuffix})`}"></view>
		<view  style="width:calc( 100% - 200rpx );display: flex;flex-direction: column;padding:5rpx 0;justify-content: space-between;align-items: flex-start;">
			<view  class="nowrapellipsis" style="width:100%;color:#F3F4F6;font-size:28rpx;">{{ nftDetail.nftName }}</view>
			<view>
				<view style="color:#F3F4F6;font-size:28rpx;">¥ {{ cent2yuan(nftDetail.price) }}</view>
				<view style="color:#9CA3AF;font-size:20rpx;">限量{{ nftDetail.issueCount }}件</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {cent2yuan} from '@/common/common.js'
	export default{
		props:{
			nftDetail:{
				type:Object,
				default(){
					return{}
				}
			},
			status:{
				type:String,
				default:"detail"
			}
		},
		methods:{
			cent2yuan,
			gotoDetail(){
				if(this.status==='edit')return
				uni.navigateTo({
					url:`/pages/sys/merchandise/detail?nftCode=${this.nftDetail.nftCode}`
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/css/index.scss";
</style>
