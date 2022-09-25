<template>
	<view class="card">
		<view class="flex-row-between-center">
			<view class="flex-row-start-center">
				<view :class="classOptions[brief.changeType]" style="width:76rpx;height:76rpx;background-size:100% 100%;margin-right:20rpx;"></view>
				<view class="flex-col-between-start">
					<view style="color:#F3F4F6;font-size:30rpx;">
						{{ statusOptions[brief.changeType] }}
						<u-icon @tap="toggleInfo" style="margin-left:20rpx" :name="isExtend?'arrow-up-fill':'arrow-down-fill'"></u-icon>
					</view>
					<view style="color:#9CA3AF;font-size:20rpx">{{ $u.timeFormat(brief.createdDate, 'yyyy-mm-dd hh:MM:ss') }}</view>
				</view>
			</view>
			<view style="height:76rpx;" class="flex-row-end-end">
				<view>¥ {{ cent2yuan(brief.changeAmount) }}</view>
			</view>
		</view>
		<view v-if="isExtend" style="color:#7A7B81;font-size:24rpx;padding-left:95rpx;line-height:50rpx;border-top:1rpx solid #7A7B81;margin-top:30rpx;padding-top:30rpx">
			<!-- <view>尚品：{{ detail.nftName }}</view> -->
			<view>订单编号：{{ detail.orderCode }}</view>
			<view>订单时间：{{ $u.timeFormat(detail.orderDate) }}</view>
			<view>订单金额：¥ {{ cent2yuan(detail.orderAmount) }}</view>
			<view>尚金：¥ {{ cent2yuan(detail.settlementAmount) }}</view>
		</view>
	</view>
</template>

<script> 
	import { cent2yuan } from "@/common/common.js"
	import FundApi from "@/common/apis/fund.js"
	export default{
		data(){
			return{
				statusOptions:{
					'1':'充值',
					'2':'销售',
					'3':'尚金',
					'4':'提现',
					'5':'购买'
				},
				classOptions:{
					'1':'buyIcon',
					'2':'sellIcon',
					'3':'deductIcon',
					'4':'withdrawIcon',
					'5':'buyIcon'
				},
				isExtend:false,
				detail:{}
			}
		},
		props:{
			brief:{
				type:Object,
				default(){
					return {}
				}
			},
			isTo:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			cent2yuan,
			toggleInfo(){
				this.isExtend = !this.isExtend
				if(this.isExtend&&(!this.detail||Object.keys(this.detail).length===0)){
					if(this.isTo){
						FundApi.toIncomeInfo({
							params:{
								id:this.brief.id
							}
						}).then(res=>{
							this.detail = res
						}).catch(err=>{
							this.$u.toast(err)
						})
					}else{
						FundApi.incomenexpenseInfo({
							params:{
								changeCode:this.brief.changeCode
							}
						}).then(res=>{
							this.detail = res
						}).catch(err=>{
							this.$u.toast(err)
						})
					}
				}
			}
			
			
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/css/index.scss';
	
	.sellIcon{
		background-image: url("@/static/common/img/mine/fund/sell.png");
	}
	.deductIcon{
		background-image: url("@/static/common/img/mine/fund/deduct.png");
	}
	.withdrawIcon{
		background-image: url("@/static/common/img/mine/fund/withdraw.png");
	}
	.buyIcon{
		background-image: url("@/static/common/img/mine/fund/buy.png");
	}

</style>