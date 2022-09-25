<template>
	<view class="wrap">
		<!-- #ifdef APP-PLUS -->
		<view class="fixedHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			{{ overallTitleOptions[overallStatus] }}
			<view></view>
		</view>
		<view style="height: 170rpx;"></view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view class="pageHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			{{ overallTitleOptions[overallStatus] }}
			<view></view>
		</view>
		<!-- #endif -->
		<view>
			<scroll-view scroll-y :style="{height:scrollViewHeight}">
				<view style="padding:0 34rpx 50rpx;position:relative">
					<view class="card"
						style="border-bottom-right-radius:0rpx;border-bottom-left-radius:0rpx;margin-bottom:0rpx">
						<view style="color:#AAAAAA;display:flex" @tap="gotoStore(artist.userCode)">
							<view
								style="position:relative;width:40rpx;height:40rpx;border-radius:20rpx;background-size:cover;margin-right:10rpx;background-position: center;"
								:style="{backgroundImage:`url(${imgBaseUrl}${artist.header}${imgSuffix})`}">
							</view>
							{{ artist.nickName }}
						</view>
						<view style="display: flex;margin-top:20rpx;position:relative">
							<view @tap="gotoNftDetail"
								style="position:relative;width:192rpx;height:192rpx;border-radius:32rpx;background-size:cover;margin-right:30rpx;background-position: center;"
								:style="{backgroundImage:`url(${imgBaseUrl}${order.nftImgs}${imgSuffix})`}">
								<template v-if="nft.nftType==='2'">
									<view v-if="['9913'].includes(overallStatus)" class="subIcon">主</view>
									<view v-else class="iconGroup" style="right:10rpx;top:10rpx">
										<view class="blindIcon centercover"></view>
									</view>
								</template>
							</view>
							<view
								style="color:#F3F4F6;width:65%;display: flex;flex-direction: column;align-items: flex-end">
								<view class="wordbreak">{{order.nftName}}</view>
								<view
									style="background-color:#35353F;padding:10rpx;border-radius: 10rpx;margin-top:20rpx;">
									x {{ order.orderCount }}</view>
							</view>
						</view>
						<template v-if="nft.nftType==='2'&&['9913'].includes(overallStatus)">
							<view v-for="(chosen,chosenIndex) in order.orderNftVoList"
								style="padding:20rpx;margin-top:10rpx;border-radius:20rpx;border:1rpx solid #505056">
								<blind-brief :isEdit="false" :chosen="chosen" :chosenIndex="chosenIndex"
									@showChosenDel="showChosenDel" @handleBlindIssueCount="handleBlindIssueCount">
								</blind-brief>
							</view>
						</template>
						<view class="authRow">
							<view class="authTitle">尚品总额</view>
							<view class="authContent nowrapellipsis">￥{{ cent2yuan(order.orderAmount) }}</view>
						</view>
						<view v-if="!isMySold" class="authRow">
							<view class="authTitle">余额</view>
							<view class="authContent nowrapellipsis">￥0</view>
						</view>
					</view>
					<view style="height:2rpx;background-color:#59595D"></view>
					<view class="card" style="border-top-right-radius:0rpx;border-top-left-radius:0rpx;font-size:24rpx;display: flex;justify-content: space-between;
						font-size:34rpx;color:#F3F4F6">
						<view>实付款：</view>
						<view style="color:#F87171">￥{{ cent2yuan(order.orderAmount) }}</view>
					</view>
					<view class="card"  style="border-bottom-right-radius:0rpx;border-bottom-left-radius:0rpx;margin-bottom:0rpx">
						<view class="authRow" style="margin-top:0">
							<view class="authTitle" style="width:100%">订单编号：{{ order.orderCode }}</view>
						</view>
						<view class="authRow">
							<view class="authTitle" style="width:100%">
								下单时间：{{ order.createdDate&&$u.timeFormat(order.createdDate, 'yyyy-mm-dd hh:MM:ss') }}
							</view>
						</view>
						<view v-if="['9913'].includes(overallStatus)" class="authRow">
							<view class="authTitle" style="width:100%">
								支付时间：{{ order.payTime&&$u.timeFormat(order.payTime, 'yyyy-mm-dd hh:MM:ss') }}</view>
						</view>
					</view>
					<view class="card flex-row-around-center"  v-if="['9913'].includes(overallStatus)" style="border-top-right-radius:0rpx;border-top-left-radius:0rpx;font-size:24rpx;display: flex;justify-content: space-between;font-size:34rpx;color:#F3F4F6">
						<template>
							<view v-if="isMySold" @tap="gotoBuyerOrSellerChat(order.purchaser)" class="plainbutton bibtn"  style="border:0px solid #7A83D2;width: 200rpx;"><u-image width="30rpx" height="30rpx" style="float: left;" src="@/static/common/img/order/message-dots-circle@2x.png"></u-image><view style="color: #ffffff;">联系买家</view></view>
							<view v-else @tap="gotoBuyerOrSellerChat(artist.userCode)" class="plainbutton bibtn"  style="border:0px solid #7A83D2;width: 200rpx;"><u-image width="30rpx" height="30rpx" style="float: left;" src="@/static/common/img/order/message-dots-circle@2x.png"></u-image><view style="color: #ffffff;">联系卖家</view></view>
						</template>
						<view @tap="gotoSellerGroupChat" class="plainbutton bibtn" style="border:0px solid #7A83D2;width: 200rpx;"><u-image width="30rpx" height="30rpx"  style="float: left;"  src="@/static/common/img/order/users-02@2x.png"></u-image><view style="color: #ffffff;" >卖家粉丝群</view></view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view v-if="!isMySold"
			style="background-color:#2A2A34;height:200rpx;border-top:2rpx solid #59595D;padding:30rpx;position:fixed;width:100%;bottom:0;left:0">
			<view style="display:flex;justify-content: flex-end">
				<template v-if="['0010','0012'].includes(overallStatus)">
					<view class="bibtn plainbutton" @click="cancelPay">取消支付</view>
					<view class="bibtn button" @click="gotoPayNow">立即支付</view>
				</template>
				<view v-else-if="['9913'].includes(overallStatus)">
					<view class="bibtn button" @click="gotoNftDetail">查看尚品</view>
				</view>
				<view v-else-if="['9912'].includes(overallStatus)">
					<view class="bibtn plainbutton" @click="customGoBack">返回</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import MerchandiseApi from "@/common/apis/merchandise.js"
	import StoreApi from "@/common/apis/store.js"
	import jlCatche from '@/common/utils/jlCatche'
	import {
		cent2yuan,
		payJump,
		calScrollHeight
	} from '@/common/common.js'
	import {
		overallTitleOptions
	} from '@/common/commonOptions.js'
	import BlindBrief from '@/components/mine/BlindBrief'
	import {
		MyIM
	} from "@/common/im/im.js"
	export default {
		data() {
			return {
				overallStatus: '',
				order: {},
				nft: {},
				artist: {},
				shop: {},
				overallTitleOptions,
				scrollViewHeight: 0
			}
		},
		components: {
			BlindBrief
		},
		onLoad(option) {
			this.scrollViewHeight = calScrollHeight(300)
			this.isMySold = option.isMySold ? Number(option.isMySold) : undefined
			this.overallStatus = option.overallStatus
			MerchandiseApi.payInfo({
				params: {
					orderCode: option.orderCode,
					isSeller: this.isMySold
				}
			}).then(res => {
				console.log('订单详情:', res)
				this.order = res
				MerchandiseApi.info({
					params: {
						nftCode: this.order.nftCode
					}
				}).then(res => {
					this.nft = res
					StoreApi.artistInfo({
						params: {
							userCode: res.userCode
						}
					}).then(res => {
						this.artist = res
					}).catch(err => {
						this.$u.toast(err)
					})
					StoreApi.storeInfo({
						params: {
							userCode: res.userCode
						}
					}).then(res => {
						this.shop = res
					}).catch(err => {
						this.$u.toast(err)
					})
				}).catch(err => {
					this.$u.toast(err)
				})
			}).catch(err => {
				this.$u.toast(err)
			})

		},
		methods: {
			cent2yuan,
			payJump,
			gotoNftDetail() {
				uni.navigateTo({
					url: `/pages/sys/merchandise/detail?nftCode=${this.order.nftCode}`
				})
			},
			gotoStore(userCode) {
				uni.navigateTo({
					url: `/pages/sys/merchandise/store?userCode=${userCode}`
				})
			},
			cancelPay() {
				MerchandiseApi.orderCancel({
					params: {
						orderCode: this.order.orderCode
					}
				}).then(res => {
					this.$u.toast('取消成功')
					setTimeout(() => {
						uni.navigateTo({
							url: `/pages/sys/order/list`
						})
					}, 500)
				}).catch(err => {
					this.$u.toast(err)
				})
			},
			gotoPayNow() {
				uni.navigateTo({
					url: `/pages/sys/order/payNow?orderCode=${this.order.orderCode}`
				})
			},
			gotoBuyerOrSellerChat(chatterUserCode) {
				let userCode = jlCatche.getCacheUserInfo('userCode')
				MyIM.getInstance(userCode).checkLogin().then(() => {
					uni.$TUIKit.getUserProfile({
						userIDList: [chatterUserCode]
					}).then(imRes => {
						if (imRes.data.length > 0) {
							uni.navigateTo({
								url: `/pages/im/TUI-Chat/chat?conversationID=C2C${imRes.data[0].userID}`
							})
						} else {
							this.$u.toast('用户不存在')
						}
					});
				})
			},
			gotoSellerGroupChat() {
				let userCode = jlCatche.getCacheUserInfo('userCode')
				MyIM.getInstance(userCode).checkLogin().then(() => {
					let groupId = `${this.imPrefix}${this.shop.shopCode}`
					uni.$TUIKit.searchGroupByID(groupId).then(res0 => {
						let groupID = res0.data.group.groupID
						uni.$TUIKit.joinGroup({
							groupID
						}).then(imres => {
							 switch (imres.data.status) {
							    case uni.$TUIKitTypes.JOIN_STATUS_WAIT_APPROVAL: 
									this.$u.toast('已向群主提交加群申请')
									break;
							    case uni.$TUIKitTypes.JOIN_STATUS_SUCCESS: 
							    case uni.$TUIKitTypes.JOIN_STATUS_ALREADY_IN_GROUP: 
									uni.navigateTo({
										url: `/pages/im/TUI-Chat/chat?conversationID=GROUP${groupID}`
									})
									break;
							    default:
									break;
							  }
						}).catch(err => {
							this.$u.toast(err)
						})
					}).catch(err => {
						this.$u.toast(err.message)
					})
				})
			},
			customGoBack() {
				uni.navigateBack({
					delta: 1
				})
			},
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

	.authRow {
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		margin-top: 30rpx;

		.authTitle {
			width: 30%;
			color: #9CA3AF;
		}

		.authContent {
			max-width: 70%;
			color: #F3F4F6;
		}
	}
</style>
