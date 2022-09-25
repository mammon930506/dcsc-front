<template>
	<view class="wrap">
		<view class="pageHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			销售订单<view></view>
		</view>
		<scroll-view scroll-y :style="{height:scrollViewHeight}"  @scrolltolower="queryList">
			<view style="padding:0 30rpx;">
				<view class="card" v-for="brief in soldList">
					<view class="flex-row-between-start">
						<view class="flex-row-start-center" style="width:80%">
							<view @tap="gotoNft(brief.nftCode)" style="width:180rpx;height:180rpx;border-radius: 20rpx;background-size:cover;background-position:center;margin-right:20rpx;" :style="{backgroundImage:`url(${imgBaseUrl}${brief.nftImgs}${imgSuffix})`}"></view>
							<view @tap="gotoOrderDetail(brief)" class="flex-col-between-start" style="width:calc( 100% - 200rpx );height:180rpx;">
								<view style="color:white;font-size:32rpx;word-wrap: break-word;word-break: break-all;">{{ brief.nftName }}</view>
								<view style="color:#9CA3AF">
								{{ brief.nickName }}<br/>
								数量：{{ brief.orderCount }}<br/>
								编号：{{ brief.nftCode }}
								</view>
							</view>
						</view>
						<view style="color:#F87171;font-size:28rpx;line-height:50rpx;">{{ overallTitleOptions[brief.overallStatus] }}</view>
					</view>
					<view style="color:#F87171;font-size:28rpx;text-align: end;">实际金额：¥ {{ cent2yuan(brief.orderAmount) }}</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import MineApi from "@/common/apis/mine.js"
	import {cent2yuan,calScrollHeight} from '@/common/common.js'
	import {overallCodeOptions,overallTitleOptions } from '@/common/commonOptions.js'
	export default{
		data(){
			return{
				soldList:[],
				overallCodeOptions,
				overallTitleOptions,
				workPage:-1
			}
		},
		onLoad(option){
			this.scrollViewHeight = calScrollHeight(120)
			this.queryList()
		},
		methods:{
			cent2yuan,
			queryList(){
				this.workPage++
				MineApi.shopOrder({
					params:{
						offset:this.workPage,
						pageSize:10
					}
				}).then(res=>{
					if(!res.data||res.data.length<10){
						this.workPage--
					}
					res.data.forEach(this.classifyOverall)
					let lastOffset = Math.floor(this.soldList.length/10)
					this.soldList = this.soldList.splice(0,lastOffset*10).concat(res.data)
				}).catch(err=>{
					this.$u.toast(err)
				})
			},
			classifyOverall(order){
				for(let key in this.overallCodeOptions){
					if(this.overallCodeOptions[key].includes(order.orderStatus)){
						order.overallStatus = key
						break
					}
				}
			},
			gotoNft(nftCode){
				uni.navigateTo({
					url:`/pages/sys/merchandise/detail?nftCode=${nftCode}`
				})
			},
			gotoOrderDetail(order){
				uni.navigateTo({
					url:`/pages/sys/order/orderDetail?orderCode=${order.orderCode}&overallStatus=${order.overallStatus}&isMySold=1`
				})
			},
			customGoBack(){
				uni.navigateTo({
					url:'/pages/sys/mine/store/myStore'
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
	@import "@/common/css/index.scss";
</style>
