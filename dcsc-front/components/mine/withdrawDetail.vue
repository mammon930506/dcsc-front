<template>
	<view class="card">
		<view class="flex-row-start-center">
			<view :class="classOptions[brief.cashoutBankName]" style="width:76rpx;height:76rpx;"></view>
			<view class="flex-col-around-start">
				<view class="text0">提现至-{{ brief.cashoutBankName }}({{ brief.cashoutBankCode }})</view>
				<view class="text1">{{ $u.timeFormat(brief.createdDate) }}</view>
			</view>
		</view>
		<view class="flex-row-between-center" style="padding:30rpx 0;padding-left:100rpx;border-bottom:1rpx solid #7A7B81">
			<view class="flex-col-around-center">
				<view class="text1">服务费</view>
				<view class="text0">¥ {{ cent2yuan(brief.cashoutServiceCharge) }}</view>
			</view>
			<view class="flex-col-around-center">
				<view class="text1">提现金额</view>
				<view class="text0">¥ {{ cent2yuan(brief.cashoutAmount) }}</view>
			</view>
		</view>
		<view class="flex-row-between-center" style="margin-top:30rpx">
			<view class="text1">状态</view>
			<view v-if="brief.cashoutStatus==='0'" class="text1">预计1-3个工作日到账</view>
			<view :style="{color:brief.cashoutStatus==='0'?'#7A83D2':'#7A7B81'}" class="text1">{{ statusOptions[brief.cashoutStatus] }}</view>
		</view>
	</view>
</template>

<script>
	import { cent2yuan } from "@/common/common.js"
	import FundApi from "@/common/apis/fund.js"
	export default{
		data(){
			return{
				classOptions:{
					'中国工商银行':'bank-com',
					'中国农业银行':'bank-agri',
					'中国银行':'bank-cn',
					'中信银行':'bank-cn',
				},
				statusOptions:{
					'0':'提现中',
					'1':'已提现',
				}
			}
		},
		props:{
			brief:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		methods:{
			cent2yuan,
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/css/index.scss';
	.text0{
		color:#F3F4F6;
		font-size:28rpx;
	}
	.text1{
		color:#7A7B81;
		font-size:20rpx;
	}
</style>