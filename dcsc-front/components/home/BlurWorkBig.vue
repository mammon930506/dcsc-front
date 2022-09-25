<template>
	<view @tap="gotoNft" class="main" :style="{backgroundImage:imgLoaded?`url(${imgBaseUrl}${brief.nftImg}${imgSuffix})`:'none',backgroundColor:imgLoaded?'none':'#2A2A34'}">
		<view class="clip" :class="{clipLoaded:imgLoaded?true:false}" :style="{'--bgImg':`url(${imgBaseUrl}${brief.nftImg}${imgSuffix})`,'background':imgLoaded?'rgba(255, 255, 255, 0.5)':'none'}">
		</view>
		<view class="workBrief">
			<view class="briefWrap" style="width:100%;padding-left: 24rpx;padding-right: 48rpx;text-shadow:1px 1px 1px rgba(0,0,0,0.3)">
				<template v-if="!isCustom">
					<view class="nowrapellipsis" style="width:100%;font-size: 36rpx;font-weight: bold;margin-bottom:10rpx;">{{ brief.nftName }}</view>
					<view class="flex-row-between-center">
						<view @tap.stop='gotoArtistMain' class="flex-row-start-center" style="width:400rpx;position:relative">
							<view class="centercover" style="width:80rpx;height:80rpx;margin-right:10rpx" :style="{backgroundImage:`url(${imgBaseUrl}${brief.header}${imgSuffix})`}"></view>
							<view style="width:calc( 100% - 100rpx )">
								<view style="font-size:24rpx">艺术家</view>
								<view style="font-size:32rpx;font-weight:bold">{{ brief.nickName }}</view>
							</view>
						</view>
						<view>
							<view v-if="brief.issueCount<100000&&brief.price<10000000" style="text-align: end;">
								<view class="nowrapellipsis" style="font-size:24rpx;">限量{{ brief.issueCount }}件</view>
								<view class="nowrapellipsis" style="font-size:32rpx;font-weight:bold">¥ {{ cent2yuan(brief.price) }}</view>
							</view>
						</view>
					</view>
					<view v-if="brief.issueCount>=100000||brief.price>=10000000" class="flex-row-around-center">
						<view class="nowrapellipsis" style="font-size:24rpx;">限量{{ brief.issueCount }}件</view>
						<view class="nowrapellipsis" style="font-size:32rpx;font-weight:bold">¥ {{ cent2yuan(brief.price) }}</view>
					</view>
					<!-- <view class="nickName">{{ brief.nickName}}</view>
					<view class="price">¥{{ brief.price }}</view> -->			
				</template>
				<template v-else>
					<slot></slot>
				</template>
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
				imgSuffix: "?x-oss-process=image/quality,q_60/format,jpg/resize,w_800",
			}
		},
		props: {
			brief:{
				type: Object,
				default(){
					return {}
				}
			},
			isCustom:{
				type: Boolean,
				default: false
			}
		},
		watch:{
			brief:{
				immediate:true,
				deep:true,
				handler(){
					this.checkImageLoad(this.brief.nftImg)
				}
			}
		},
		mixins:[imgLoading],
		created() {

		},
		mounted() {

		},
		methods:{
			cent2yuan,
			gotoArtistMain() {
				uni.navigateTo({
					url: `/pages/sys/merchandise/artistMain?userCode=${this.brief.userCode}`
				})
			},
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
		height: 100%;
		background-size: cover;
		background-position: center;
	}
	
	.clip {
		position: absolute;
		bottom: 0px;
		left: 0px;
		width: 100%;
		height: 200rpx;
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
	
	.workBrief {
		position: absolute;
		bottom: 0px;
		left: 0px;
		width: 100%;
		height: 200rpx;
		display: flex;
		align-items: center;
		.briefWrap{
			width:100%;
		}
	}
	
</style>
