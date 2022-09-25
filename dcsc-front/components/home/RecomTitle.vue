<template>
	<view style="display:flex;justify-content: space-between;align-items:center;margin:20rpx 30rpx 10rpx 30rpx;">
		<view style="display:flex;align-items:center;">
			<u-image :src="polySrc" width="54rpx" height="60rpx" style="margin-right:10rpx;"></u-image>{{ title }}
		</view>
		<view v-if="more" class="more" @tap="gotoMore">
			更多
			<view class="dots"></view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['title','type','more'],
		data(){
			return{
				polySrc: "/static/common/img/index/recommend/poly.png"
			}
		},
		methods:{
			gotoMore(){
				let url=''
				if(this.type==='2'){
					url= '/home/moreNft'
				}else if(this.type==='3'){
					url= '/home/moreArtist'
				}else if(this.type==="6"){
					url= '/sns/topicList'
				}else{
					return
				}
				uni.navigateTo({
					url:"/pages/sys"+url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.more{
		display: flex;
		align-items: center;
		color:#6B7280;
		font-size:24rpx;
		.dots{
			width:40rpx;
			height:40rpx;
			background-size:100% 100%;
			background-image:url('@/static/common/img/index/recommend/dots.png')
		}
	}
	
</style>