<template>
	<view>
		<view v-if="brief.isNewDate" style="color:#9CA3AF;font-size:30rpx;padding:20rpx 0;">{{ brief.browseDate }}</view>
		<view class="flex-row-between-start" style="position:relative;padding:20rpx 0">
			<view @tap="gotoArtistMain" class="centercover" style="width:94rpx;height:94rpx"
			 :style="{backgroundImage:`url(${imgBaseUrl}${brief.header}${imgSuffix})`}"></view>
			<view @tap="gotoDetail" class="flex-col-start-start" style="width:calc( 100% - 120rpx );position:relative">
				<view style="font-size: 26rpx;margin-bottom:10rpx;">{{ brief.nickName }}</view>
				<view class="nowrapellipsis" style="width:100%;font-size:24rpx;color:#9BA3B3;margin-bottom:20rpx;">
					<template v-if="brief.historyType==='2'">{{ brief.content }}</template>
					<template v-else-if="brief.historyType==='3'">{{ brief.nftName }}</template>
				</view>
				<view class="flex-row-start-center" style="flex-wrap: nowrap;">
					<view v-for="(img,imgIndex) in brief.imgList" :key="imgIndex">
						<view class="centercover" :style="{backgroundImage:`url(${imgBaseUrl}${img}${imgSuffix})`}"
						style="width:132rpx;height:132rpx;border-radius:16rpx;margin-right:12rpx;"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
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
			gotoArtistMain() {
				uni.navigateTo({
					url: `/pages/sys/merchandise/artistMain?userCode=${this.brief.userCode}`
				})
			},
			gotoDetail(){
				if(this.brief.historyType==='2'){
					uni.navigateTo({
						url:`/pages/sys/sns/postDetail?postCode=${this.brief.historyCode}`
					})
				}else if(this.brief.historyType==='3'){
					uni.navigateTo({
						url:`/pages/sys/merchandise/detail?nftCode=${this.brief.historyCode}`
					})
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
	@import url('@/common/css/index.scss');
</style>