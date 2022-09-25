<template>
	<view :class="{briefCard:detailLevel>1}" style="position:relative;padding:40rpx 28rpx;">
		<view class="flex-row-start-start">
			<view @tap="gotoArtistMain" class="centercover" style="position:relative;width:94rpx;height:94rpx;border:4rpx solid #423F55;margin-right:20rpx;"
			:style="{backgroundImage:`url(${imgBaseUrl}${brief.header}${imgSuffix})`}">
				<view v-if="detailLevel>1" :class="brief.rankIndex<3?clsOptions[brief.rankIndex]:''"></view>
			</view>
			<view class="flex-col-between-start" style="width:calc( 100% - 280rpx );min-height:100rpx;">
				<view style="font-size:28rpx;" :style="nickNameStyle">{{ brief.nickName }}</view>
				<view style="font-size:20rpx;color:#9BA3B3">
					<view>粉丝数{{brief.fans}}</view>
					<view>销售金额{{brief.orderAmount}} | 交易单量{{brief.orderCount}}单</view>
				</view>
			</view>
			<follow v-if="detailLevel>1" :detail="brief"></follow>
		</view>
	</view>
</template>

<script>
	import Follow from "@/components/mine/Follow.vue"
	export default{
		data(){
			return {
				clsOptions:{'1':'briefTop1','2':'briefTop2','3':'briefTop3'}
			}
		},
		props:{
			brief:{
				type:Object,
				default(){
					return {}
				}
			},
			detailLevel:{
				type:Number,
				default:3
			},
			nickNameStyle:{
				type:Object,
				default(){
					return {
						color:'white'
					}
				}
			}
		},
		components:{Follow},
		methods:{
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
	.briefCard{
		background-color:#2A2A34;
		border-radius: 32rpx;
		margin-bottom:20rpx;
	}
	.briefTop1,.briefTop2,.briefTop3{
		position:absolute;
		top:-10rpx;
		left:-10rpx;
		width:30rpx;
		height:30rpx;
		background-size:100% 100%;
	}
	.briefTop1{
		background-image:url("@/static/common/img/rank/top1.png")
	}
	.briefTop2{
		background-image:url("@/static/common/img/rank/top2.png")
	}
	.briefTop3{
		background-image:url("@/static/common/img/rank/top3.png")
	}
</style>