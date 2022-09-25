<template>
	<view>
		<view class="flex-row-start-start">
			<view v-if="isEdit" @tap="showChosenDel(chosen,chosenIndex)" class="chosenDelBtn" style="margin-right:30rpx;"></view>
			<view @tap="gotoDetail" class="centercover" :style="{backgroundImage:`url(${imgBaseUrl}${chosen.nftImgs}${imgSuffix})`}" style="position:relative;width:120rpx;height:120rpx;border-radius:20rpx;">
				<view class="subIcon">盲</view>
			</view>
			<view class="flex-col-around-start" style="line-height:40rpx;margin-left:30rpx;">
				<view style="font-size:24rpx;color:white">{{ chosen.nftName }}</view>
				<view style="font-size:24rpx;color:#9CA3AF">尚品编码：{{ chosen.nftSubCode||chosen.nftCode }}</view>
<!--				<view v-if="!isEdit" style="font-size:24rpx;color:#9CA3AF">库存：{{ chosen.issueCount }}</view>-->
			</view>
		</view>
		<view v-if="isEdit" class="flex-row-end-center" style="margin-right:20rpx;">
			<view style="font-size:20rpx;color:#9CA3AF;margin-right:20rpx;">库存</view>
			<u-number-box @change="handleBlindIssueCount(chosen)" :min="1" v-model="chosen.issueCount"></u-number-box>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			chosen:{
				type:Object,
				default(){
					return{}
				}
			},
			chosenIndex:{
				type:Number,
				default:0
			},
			isEdit:{
				type:Boolean,
				default:true
			}
		},
		methods:{
			gotoDetail(){
				uni.navigateTo({
					url:`/pages/sys/merchandise/detail?nftCode=${this.chosen.nftSubCode||this.chosen.nftCode}`
				})
			},
			showChosenDel(chosen,chosenIndex){
				this.$emit('showChosenDel',chosen,chosenIndex)
			},
			handleBlindIssueCount(chosen){
				this.$emit('handleBlindIssueCount',chosen)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/css/index.scss";

	.chosenDelBtn{
		width:40rpx;
		height:40rpx;
		background-image: url("@/static/common/img/mine/store/blind-sub-del.png");
		background-size:100% 100%;
	}
</style>
