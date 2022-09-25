<template>
	<view class="wrap">
		<view class="pageHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			资金管理<view></view>
		</view>
		<view style="padding: 0 30rpx;">
			<view class="card" style="position:relative;border-bottom-left-radius:0rpx;border-bottom-right-radius:0rpx;border-bottom:2rpx solid #59595D;margin-bottom:0rpx;">
				<view class="centercover" style="margin:50rpx auto 0;width:176rpx;height:176rpx;" :style="{backgroundImage:`url(${imgBaseUrl}${myown.header}${imgSuffix})`}"></view>
				<view style="color:#F3F4F6;font-size: 40rpx;text-align: center;">{{ myown.nickName }}</view>
				<view class="flex-row-between-center" style="margin:30rpx 0">
					<view class="flex-col-around-center" style="width:50%">
						<view style="color:#9CA3AF;font-size:24rpx">账户余额</view>
						<view style="color:##F3F4F6;font-size:36rpx;font-weight:bold;margin-top:10rpx;">¥ {{ cent2yuan(myown.accountBalance) }}</view>
					</view>
					<view @tap="gotoToIncomeList" class="flex-col-around-center" style="width:50%">
						<view style="color:#9CA3AF;font-size:24rpx">待入账</view>
						<view style="color:##F3F4F6;font-size:36rpx;font-weight:bold;margin-top:10rpx;">¥ {{ cent2yuan(myown.toBeSettled) }}</view>
					</view>
				</view>
			</view>
			<view class="card flex-row-between-center"
				style="padding:0;border-top-right-radius:0rpx;border-top-left-radius:0rpx;font-size:24rpx;">
					<view @tap="gotoIncomeList" style="width:50%;border-right:2rpx solid #59595D;padding:30rpx 0" class="flex-row-center-center"><view class="incomeEntry" style="width:48rpx;height:48rpx;background-size:100% 100%;margin-right:10rpx;"></view>收入明细</view>
					<view @tap="gotoAllList" style="width:50%;padding:30rpx 0" class="flex-row-center-center"><view class="allEntry" style="width:48rpx;height:48rpx;background-size:100% 100%;margin-right:10rpx;"></view>账户明细</view>
			</view>
			<view class="button" @tap="gotoWithdrawForm">提现</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import FundApi from "@/common/apis/fund.js"
	import { cent2yuan } from "@/common/common.js"
	export default{
		data(){
			return{
				procedure:'index',
				myown:{},
			}
		},
		onLoad(){
			FundApi.myown().then(res=>{
				this.myown = res
			}).catch(err=>{
				this.$u.toast(err)
			})
		},
		methods:{
			cent2yuan,
			gotoWithdrawForm(){
				uni.navigateTo({
					url:'/pages/sys/mine/fund/withdrawForm'
				})
			},
			gotoAllList(){
				uni.navigateTo({
					url:'/pages/sys/mine/fund/allList'
				})
			},
			gotoIncomeList(){
				uni.navigateTo({
					url:'/pages/sys/mine/fund/incomeList'
				})
			},
			gotoToIncomeList(){
				uni.navigateTo({
					url:'/pages/sys/mine/fund/toIncomeList'
				})
			},
			customGoBack(){
				if(this.procedure==='sms'){
					this.procedure='index'
					return
				}
				uni.switchTab({
					url:"/pages/sys/mine/index"
				})
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
	@import '@/common/css/index.scss';
	.incomeEntry{
		background-image: url('@/static/common/img/mine/fund/incomeEntry.png');
	}
	.allEntry{
		background-image: url('@/static/common/img/mine/fund/allEntry.png');
	}
</style>
