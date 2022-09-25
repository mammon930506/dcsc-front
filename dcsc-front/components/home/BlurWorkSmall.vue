<template>
	<view style="position:relative;padding:10rpx;">
		<view class="iconGroup"><view v-if="brief.nftType==='2'" class="blindIcon centercover"></view></view>
		<view @tap="gotoNft" class="main" :style="{backgroundImage:imgLoaded?`url(${imgBaseUrl}${brief.nftImg||brief.nftImgs}${imgSuffix})`:'none',backgroundColor:imgLoaded?'none':'#2A2A34',textShadow:'1px 1px 1px rgba(0,0,0,0.3)'}">
			<view class="clip" :class="{clipLoaded:imgLoaded?true:false}" :style="{'--bgImg':`url(${imgBaseUrl}${brief.nftImg||brief.nftImgs}${imgSuffix})`,'background':imgLoaded?'rgba(255, 255, 255, 0.5)':'none'}">
			</view>
			<view class="workBrief">
				<view class="briefWrap">
					<view class="name nowrapellipsis">{{ brief.nftName }}</view>
					<view class="nickName nowrapellipsis">{{ brief.nickName}}</view>
					<view class="price nowrapellipsis">¥{{ cent2yuan(brief.price)}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {cent2yuan} from '@/common/common.js'
    import imgLoading from '@/common/mixins/imgLoading'
	export default {
		data(){
			return{
				imgSuffix: "?x-oss-process=image/quality,q_60/format,jpg/resize,w_500",
			}
		},
		props: {
			brief:{
				type: Object,
				default(){
					return {}
				}
			}
		},
		watch:{
		  brief:{
			immediate:true,
			deep:true,
			handler(){
			  this.checkImageLoad(this.brief.nftImg||this.brief.nftImgs)
			}
		  }
		},
		mixins:[imgLoading],
		methods:{
			cent2yuan,
			gotoNft(){
				uni.navigateTo({
					url:`/pages/sys/merchandise/detail?nftCode=${this.brief.nftCode}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/css/index.scss";
	.main {
		border-radius: 56rpx;
		position: relative;
		width: 100%;
		height: 320rpx;
		background-size: cover;
		background-position: center;
	}

	.workBrief {
		position: absolute;
		bottom: 0px;
		left: 0px;
		width: 100%;
		height: 120rpx;
		display: flex;
		align-items: center;
		.briefWrap{
			width:100%;
			padding: 0 30rpx;
			.name {
				font-size: 28rpx;
				font-weight: bold;
			}
			.nickName {
				font-size: 24rpx;
			}
			.price {
				font-size: 20rpx;
				font-weight: bold;
				text-align: end;
			}
		}
	}

	.clip {
		position: absolute;
		bottom: 0px;
		left: 0px;
		width: 100%;
		height: 120rpx;
		border: 5rpx solid rgba(96, 96, 96, 0.2);
		box-sizing: border-box;
		border-bottom-left-radius: 56rpx;
		border-bottom-right-radius: 56rpx;
		overflow: hidden;
	}

	.clipLoaded:before {
		content: '';
		background-image: var(--bgImg);
		background-size: cover;
		background-position: center bottom;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		margin: -10rpx;
		filter: blur(10rpx);
	}
</style>
