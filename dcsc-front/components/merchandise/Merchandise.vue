<template>
	<view style="position:relative;padding:10rpx;">
		<view class="iconGroup"><view v-if="brief.nftType==='2'" class="blindIcon centercover"></view></view>
		<view class="main">
			<view  @tap="gotoDetail" class="imgBrief" :style="{backgroundImage:imgLoaded?`url(${imgBaseUrl}${brief.nftImg||brief.nftImgs}${imgSuffix})`:'',backgroundColor:imgLoaded?'none':'#2A2A34'}">
				<view v-if="type==='merchandise'" class="clip" :class="{clipLoaded:imgLoaded?true:false}" :style="{'--bgImg':`url(${imgBaseUrl}${brief.nftImg||brief.nftImgs}${imgSuffix})`,'background':imgLoaded?'background: rgba(255, 255, 255, 0.5) border-box':'none'}">
				</view>
			</view>
			<view class="workBrief">
				<view class="briefWrap">
					<view class="name nowrapellipsis">{{ brief.nftName }}</view>
					<view class="nickName" :style="{color:type==='merchandise'?'#F3F4F6':'#AAAAAA'}">{{ brief.nickName}}</view>
					<view v-if="brief.issueCount<100000&&brief.price<10000000" style="display: flex;justify-content: space-between;color:#EF4444;">
						<view v-if="!inMine" class="price">¥{{ cent2yuan(brief.price||brief.nftUnitprice) }}</view>
						<view v-if="!inStars&&!inMine" >限量{{ brief.issueCount }}件</view>
					</view>
					<view v-else style="color:#EF4444;">
						<view v-if="!inMine">¥{{ cent2yuan(brief.price||brief.nftUnitprice) }}</view>
						<view v-if="!inStars&&!inMine" >限量{{ brief.issueCount }}件</view>
					</view>
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
			},
			type:{
				type: String,
				default: 'merchandise'
			},
			inMine:{
				type: Boolean,
				default: false
			},
			inStars:{
				type: Boolean,
				default: false
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
			gotoDetail(){
				let str = ''
				if(this.inMine){
					str+= `?id=${this.brief.id}&inMine=1`
				}else{
					str = `?nftCode=${this.brief.nftCode}`
				}
				uni.navigateTo({
					url:'/pages/sys/merchandise/detail'+str
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/css/index.scss";
	.main {
		position:relative;
		border-radius: 56rpx;
		width: 100%;
		height: 470rpx;
		.imgBrief{
			position: relative;
			height:300rpx;
			border-top-left-radius: 56rpx;
			border-top-right-radius: 56rpx;
			background-size: cover;
			background-position: center;
			// textShadow:'1px 1px 1px rgba(0,0,0,0.3)'
			.clip {
				position: absolute;
				bottom: 0px;
				left: 0px;
				width: 100%;
				height: 64rpx;
				border: 1rpx solid rgba(24, 24, 28, 0.5);
				border-bottom: 1rpx solid rgb(24, 24, 28);
				box-sizing: border-box;
				background: rgba(255, 255, 255, 0.5) border-box;
				border-top-left-radius: 56rpx;
				border-top-right-radius: 56rpx;
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
		}

	}

	.workBrief {
		position: absolute;
		bottom: 0px;
		left: 0px;
		width: 100%;
		height: calc( 100% - 298rpx );
		display: flex;
		align-items: center;
		background-color: rgb(44,44,48);
		border: 2rpx solid rgb(74,74,78);
		border-bottom-left-radius: 56rpx;
		border-bottom-right-radius: 56rpx;
		.briefWrap{
			display:flex;
			flex-direction: column;
			justify-content: space-around;
			width:100%;
			height:90%;
			padding-left: 24rpx;
			padding-right: 24rpx;
			.name {
				font-size: 32rpx;
				font-weight: bold;
				color:#F3F4F6;
			}
			.nickName {
				font-size: 20rpx;
				color:#F3F4F6;
			}
			.price {
				font-size: 32rpx;
				font-weight: bold;
				text-align: end;
			}
		}
	}




</style>
