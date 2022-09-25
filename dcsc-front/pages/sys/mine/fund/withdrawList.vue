<template>
	<view class="wrap">
		<view class="pageHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			提现记录<view></view>
		</view>
		<view>
			<scroll-view  scroll-y="true"  :style="{height:scrollViewHeight}" @scrolltolower="loadData">
				<view style="padding:30rpx">		
					<view v-for="brief in withdrawList">
						<withdraw-detail :brief="brief"></withdraw-detail>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import WithdrawDetail from "@/components/mine/withdrawDetail"
	import { cent2yuan } from "@/common/common.js"
	import {calScrollHeight} from "@/common/common.js"
	import FundApi from "@/common/apis/fund.js"
	export default{
		data(){
			return{
				workPage:-1,
				withdrawList:[],
				scrollViewHeight:0,
			}
		},
		components:{
			WithdrawDetail
		},
		onLoad(){
			this.scrollViewHeight = calScrollHeight(120)
			this.loadData()
		},
		methods:{
			loadData(){
				this.workPage++
				FundApi.withdrawList({
					params:{
						offset:this.workPage,
						pageSize:10,
					}
				}).then(res=>{
					this.withdrawList = this.withdrawList.concat(res.data)
				}).catch(err=>{
					this.$u.toast(err)
				})
			},
			customGoBack(){
				uni.navigateBack({
					delta:1
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
</style>