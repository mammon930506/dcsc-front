<template>
	<view class="wrap">
		<view class="fixedHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			提交订单<view></view>
		</view>
		<!-- #ifdef APP-PLUS -->
		<view style="height:170rpx;"></view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view style="height:130rpx;"></view>
		<!-- #endif -->
		<view style="padding:0 34rpx 50rpx;position:relative">
			<view class="card">
				<view class="preview" @tap="handleZoom" :style="{backgroundImage:`url(${imgBaseUrl}${detail.nftImg}${imgSuffix})`}">
					<view class="iconGroup"><view v-if="detail.nftType==='2'" class="blindIcon centercover"></view></view>
					<view class="zoombg">
						<view class="zoom"></view>
					</view>
				</view>
				<view class="authRow">
					<view class="authTitle">作品名称</view>
					<view class="authContent nowrapellipsis">{{ detail.nftName }}</view>
				</view>
				<view class="authRow">
					<view class="authTitle">艺术家</view>
					<view class="authContent nowrapellipsis">{{ detail.nickName }}</view>
				</view>
			</view>
<!--			<view v-if="detail.nftType==='2'" class="card">-->
<!--				<view class="authRow" style="margin-bottom:40rpx;">-->
<!--					<view class="authTitle">盲盒内容</view>-->
<!--				</view>-->
<!--				<view v-for="(chosen,chosenIndex) in detail.sub" style="margin:20rpx 0">-->
<!--					<blind-brief :isEdit="false" :chosen="chosen" :chosenIndex="chosenIndex" @showChosenDel="showChosenDel" @handleBlindIssueCount="handleBlindIssueCount"></blind-brief>-->
<!--				</view>-->
<!--			</view>-->
			<view class="card" style="border-bottom-right-radius:0rpx;border-bottom-left-radius:0rpx;margin-bottom:0rpx">
				<view class="authRow">
					<view class="authTitle">购买数量</view>
					<view class="authContent nowrapellipsis" style="display: flex;align-items: center;">
						<view style="color:#F87171;margin-right:10rpx;">库存{{ detail.nftStock }}件</view>
						<u-number-box :min="1" :max="detail.nftStock" v-model="detail.nftCount" @change="countChange"></u-number-box>
					</view>
				</view>
				<view class="authRow">
					<view class="authTitle">单价</view>
					<view class="authContent nowrapellipsis">￥{{ cent2yuan(detail.price) }}</view>
				</view>
				<view class="authRow">
					<view class="authTitle">总价</view>
					<view class="authContent nowrapellipsis">￥{{ detail.total }}</view>
				</view>
				<!-- <view class="authRow">
					<view class="authTitle">余额</view>
					<view class="authContent nowrapellipsis">
						<u-switch></u-switch>
					</view>
				</view> -->
			</view>
			<view style="height:2rpx;background-color:#59595D"></view>
			<view class="card"
				style="border-top-right-radius:0rpx;border-top-left-radius:0rpx;font-size:24rpx;display: flex;justify-content: space-between;
				font-size:34rpx;color:#F3F4F6">
				<view>需付款：</view>
				<view>￥{{ detail.total }}</view>
			</view>
			<!-- 	<view class="card">
				<view style="color:#666666;font-size:24rpx;">支付方式</view>
				<view style="color:#F3F4F6;font-size:28rpx;display: flex;justify-content: space-between;margin-top:32rpx;">
					<view>聚合支付</view><u-checkbox></u-checkbox>
				</view>
			</view> -->
			<view style="height:220rpx;"></view>
			<view style="background-color:#2A2A34;height:220rpx;border-top:2rpx solid #59595D;padding:30rpx;position:fixed;width:100%;bottom:0;left:0;z-index:10">
				<view style="display:flex;justify-content: space-between;">
					<view>
						<view style="color:#999999;font-size:24rpx;margin-bottom:20rpx;">合计：</view>
						<view style="color:#F87171;font-size:40rpx">￥{{ detail.total }}</view>
					</view>
					<view class="button" @click="nextStep"><text>立即购买</text></view>
				</view>
			</view>
		</view>
		<u-mask :show="maskShow">
			<view style="width:100%;height:100%;text-align: center;line-height:100vh;">
				<u-loading size="18rpx" style="margin-right:20rpx;position:relative;top:-3rpx;" mode="flower"></u-loading>
				正在创建订单...
			</view>
		</u-mask>
	</view>
</template>

<script>
	import MerchandiseApi from "@/common/apis/merchandise.js"
	import jlCatche from '@/common/utils/jlCatche'
	import {cent2yuan} from '@/common/common.js'
	import BlindBrief from '@/components/mine/BlindBrief'
	export default{
		data(){
			return {
				detail:{},
				maskShow:false
			}
		},
		components:{
			BlindBrief
		},
		onLoad(option){
			this.nftCode = option.nftCode
			MerchandiseApi.info({
				params:{
					nftCode:this.nftCode
				}
			}).then(res=>{
				res.nftCount = 1
				res.total = this.cent2yuan(res.price)
				this.detail = res
			}).catch(err=>{
				this.$u.toast(err)
			})
		},
		methods:{
			cent2yuan,
			countChange(count){
				let temp = Number(this.detail.price)*Number(this.detail.nftCount)
				this.detail.total = this.cent2yuan(temp)
			},
			nextStep(){
				this.maskShow = true
				let {nftCode, nftCount} = this.detail
				MerchandiseApi.createOrder({
					params:{
						nftCode,nftCount,paymentType:''
						// ,userCode:jlCatche.getStorageSync("userCode")
					}
				}).then(res=>{
					this.maskShow = false
					uni.navigateTo({
						url:`/pages/sys/order/orderDetail?orderCode=${res.orderCode}&overallStatus=0010`
					})
				}).catch(err=>{
					this.maskShow = false
					this.$u.toast(err)
				})
			},
			customGoBack(){
				uni.navigateBack({
					delta:1
				})
			},
			handleZoom(){
				let url = this.imgBaseUrl+this.detail.nftImg
				uni.previewImage({
					urls: [url] ,
					success: function () {
						console.log('success');
					}
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

	.authRow {
		display: flex;
		justify-content: space-between;
		align-items: center;
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

	.button {
		width:60%;
		border-radius: 28rpx;
		color: #ffffff;
		font-size: 32rpx;
		height: 120rpx;
		line-height: 120rpx;
		text-align: center;
		background-size: 100% 100%;
		background-image: url("@/static/common/img/index/recommend/colorfulbg.png");
	}

</style>
