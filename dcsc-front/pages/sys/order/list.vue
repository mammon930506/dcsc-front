<template>
	<view class="wrap">
		<view class="fixedHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			全部订单<view></view>
		</view>
		<!-- #ifdef APP-PLUS -->
		<view style="height:160rpx;"></view>
		<tabs-in-store  :initial="current" :navList="orderStatusList"
			bgColor="#18181c" @navChange="navChange"></tabs-in-store>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view style="height:100rpx;"></view>
		<tabs-in-store :initial="current" :navList="orderStatusList" bgColor="#18181c" @navChange="navChange">
		</tabs-in-store>
		<!-- #endif -->

		<scroll-view scroll-y :style="{height:scrollViewHeight}" @scrolltolower="queryOrder">
			<view  v-if="orderList&&orderList.length>0" >
				<view style="padding:0 30rpx">
					<view v-for="(order,index) in orderList">
						<view class="card">
							<view class="flex-row-between-center" style="color:#AAAAAA;"
								@tap="gotoStore(order.userCode)">
								<view class="flex-row-start-center">
									<view
										style="width:40rpx;height:40rpx;border-radius:20rpx;background-size:cover;margin-right:10rpx;background-position: center;"
										:style="{backgroundImage:`url(${imgBaseUrl}${order.header}${imgSuffix})`}">
									</view>
									{{order.nickName }}
								</view>
								<view style="color:#7A83D2">{{ overallTitleOptions[order.overallStatus] }}</view>
							</view>
							<view style="display: flex;margin-top:20rpx;position:relative">
								<view @tap="gotoNft(order.nftCode)"
									style="width:192rpx;height:192rpx;border-radius:10rpx;background-size:cover;margin-right:30rpx;background-position: center;"
									:style="{backgroundImage:`url(${imgBaseUrl}${order.nftImgs}${imgSuffix})`}"></view>
								<view @tap="gotoOrderDetail(order)"
									style="color:#F3F4F6;width:65%;display: flex;flex-direction: column;align-items: flex-end">
									<view
										style="width: 100%;word-wrap: break-word;word-break: break-all;text-align: end;">
										{{order.nftName}}</view>
									<view
										style="background-color:#35353F;padding:10rpx;border-radius: 10rpx;margin-top:20rpx;">
										x {{ order.orderCount }}</view>
									<view style="font-size:24rpx;color:#9CA3AF;margin-top:20rpx;">销售金额 <span
											style="font-size:30rpx;color:white">￥{{cent2yuan(order.orderAmount)}}</span>
									</view>
								</view>
							</view>
							<view>
								<view v-if="['0010','0012'].includes(order.overallStatus)"
									style="display:flex;justify-content: flex-end">
									<view class="plainbutton" @tap="cancelPay(order)">取消支付</view>
									<view class="button" @tap="gotoPayNow(order)">立即支付</view>
								</view>
							</view>
						</view>

					</view>

				</view>
			</view>
			<view v-else>
				<view class="blankIcon"></view>
				<view style="color:#AAAAAA;font-size:32rpx;text-align: center;font-weight: bold;">
					<view>您还没有订单</view>
					<!-- <view v-else-if="!noFollowing&&noTimeline">你关注的用户暂时没有新动态</view> -->
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import TabsInStore from "@/components/merchandise/TabsInStore"
	import MerchandiseApi from "@/common/apis/merchandise.js"
	import {
		cent2yuan,
		calScrollHeight,
		payJump
	} from '@/common/common.js'
	import {
		overallCodeOptions,
		overallTitleOptions
	} from '@/common/commonOptions.js'
	export default {
		data() {
			return {
				current: 0,
				orderStatusList: [{
						name: '全部',
						value: undefined
					},
					{
						name: '待支付',
						value: '9911'
					},
					{
						name: '支付取消',
						value: '9912'
					},
					{
						name: '支付成功',
						value: '9913'
					},
				],
				overallCodeOptions,
				overallTitleOptions,
				query: {
					offset: -1,
					pageSize: 10,
					orderStatus: undefined
				},
				orderList: [],
			}
		},
		components: {
			TabsInStore
		},
		onLoad() {
			this.scrollViewHeight = calScrollHeight(180)
			this.queryOrder()
		},
		methods: {
			cent2yuan,
			payJump,
			queryOrder() {
				this.query.offset++
				MerchandiseApi.orderList({
					params: {
						...this.query
					}
				}).then(res => {
					res.data.forEach(this.classifyOverall)
					this.orderList = this.orderList.concat(res.data)
				}).catch(err => {
					this.$u.toast(err)
				})
			},
			classifyOverall(order) {
				for (let key in this.overallCodeOptions) {
					if (this.overallCodeOptions[key].includes(order.orderStatus)) {
						order.overallStatus = key
						break
					}
				}
			},
			cancelPay(order) {
				MerchandiseApi.orderCancel({
					params: {
						orderCode: order.orderCode
					}
				}).then(res => {
					this.$u.toast('取消成功')
					this.query.offset = -1
					this.orderList = []
					this.queryOrder()
				}).catch(err => {
					this.$u.toast(err)
				})
			},
			gotoPayNow(order) {
				uni.navigateTo({
					url: `/pages/sys/order/payNow?orderCode=${order.orderCode}`
				})
			},
			gotoOrderDetail(order) {
				uni.navigateTo({
					url: `/pages/sys/order/orderDetail?orderCode=${order.orderCode}&overallStatus=${order.overallStatus}`
				})
			},
			navChange(index, item) {
				this.current = index
				this.orderList = []
				this.query.offset = -1
				this.query.orderStatus = item.value
				this.queryOrder()
			},
			gotoStore(userCode) {
				uni.navigateTo({
					url: `/pages/sys/merchandise/store?userCode=${userCode}`
				})
			},
			gotoNft(nftCode) {
				uni.navigateTo({
					url: `/pages/sys/merchandise/detail?nftCode=${nftCode}`
				})
			},
			customGoBack() {
				uni.switchTab({
					url: "/pages/sys/mine/index",
					success: (res) => {}
				});
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

	.button,
	.plainbutton {
		width: 160rpx;
		border-radius: 28rpx;
		font-size: 28rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
	}

	.button {
		color: #ffffff;
		background-size: 100% 100%;
		background-image: url("@/static/common/img/index/recommend/colorfulbg.png");
		line-height: 86rpx;
	}

	.plainbutton {
		border: 2rpx solid #7A83D2;
		color: #7A83D2;
		margin-right: 20rpx;
	}
</style>
