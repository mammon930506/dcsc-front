<template>
	<view class="wrap">
		<view class="pageHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			我的等级<view></view>
		</view>
		<view>
			<scroll-view scroll-y :style="{height:scrollViewHeight}">
				<view style="padding:30rpx;">
					<view class="flex-row-between-center" style="position:relative;width:100%;padding-bottom: 30rpx;">
						<view class="centercover" style="border:4rpx solid #9CA3AF;position:relative;width:176rpx;height:176rpx;" :style="{backgroundImage:`url(${imgBaseUrl}${brief.header}${imgSuffix})`}">
						</view>
						<view class="flex-col-around-start" style="width:calc( 100% - 200rpx );">
							<view style="font-size: 40rpx;word-wrap: break-word;word-break: break-all;"> 
								{{ brief.nickName }}
								<span class="brokerLabel">{{ brokerLevelOptions[brokerInfo.level] }}</span>
							</view>
							<view style="width:100%;font-size:24rpx;color:#9CA3AF;">
								<view class="nowrapellipsis">邀请码：{{ brokerInfo.recommenderCode }}</view>
							</view>
						</view>
					</view>
					<view class="card">
						<view @tap="showExplain" style="color:#9AA3B7;font-size: 24rpx;text-align: end;">说明</view>
						<view class="flex-row-center-center" style="font-size: 32rpx;">
							<view class="deco0"></view>
							升级高级经济人任务
							<view class="deco1"></view>
						</view>
						<view style="color:#9AA3B7;font-size: 24rpx;text-align: center;margin-top:10rpx;">通过以下任意一种途径都可升级</view>
						<view class="card grayCard">
							<view class="method1"></view>
							<view class="flex-row-between-center">
								<view style="width:calc( 100% - 170rpx )">
									<view class="flex-row-between-start">
										<view>直属活粉≥10个</view>
										<view>{{ brokerInfo.userActive }}/10</view>
									</view>
									<view style="width:100%;height:10rpx;background-color:#2A2A34;margin-top:20rpx;">
										<view :style="{width:brokerInfo.userActive?brokerInfo.userActive/10*100+'%':'0%'}" style="height:10rpx;background-color:#7A83D2"></view>
									</view>
								</view>
								<view @tap="gotoDoInvite" class="methodbtn">去邀请</view>
							</view>	
						</view>
						<view class="card grayCard">
							<view class="method2"></view>
							<view class="flex-row-between-center">
								<view class="flex-row-start-end" style="font-size:24rpx;">
									<span style="color:#7A83D2;">年费</span>
									￥
									<span style="font-size:36rpx;line-height:36rpx;">288.00</span>
									/年
								</view>
								<view class="methodbtn">立即升级</view>
							</view>	
						</view>
					</view>
					<view class="card">
						<view class="flex-row-center-center" style="font-size: 32rpx;">
							<view class="deco0"></view>
							升级权益
							<view class="deco1"></view>
						</view>
						<view class="flex-row-between-start" style="margin-top:20rpx;font-size: 12px;">
							<view style="color:#9CA3AF;">销售排行</view>
							<view style="width:calc( 100% - 100rpx );word-wrap: break-word;word-break: break-all;padding-left: 16rpx;">对单个创作者和单个尚品的销售额排行</view>
						</view>
						<view class="flex-row-between-start" style="margin-top:20rpx;font-size: 12px;">
							<view style="color:#9CA3AF;">消费排行</view>
							<view style="width:calc( 100% - 100rpx );word-wrap: break-word;word-break: break-all;padding-left: 16rpx;">对单个创作者和单个尚品的消费用户排行</view>
						</view>
						<view class="flex-row-between-start" style="margin-top:20rpx;font-size: 12px;">
							<view style="color:#9CA3AF;">转发排行</view>
							<view style="width:calc( 100% - 100rpx );word-wrap: break-word;word-break: break-all;padding-left: 16rpx;">对单个尚品的发行量与转发量排行</view>
						</view>
						<view class="flex-row-between-start" style="margin-top:20rpx;font-size: 12px;">
							<view style="color:#9CA3AF;">收藏排行</view>
							<view style="width:calc( 100% - 100rpx );word-wrap: break-word;word-break: break-all;padding-left: 16rpx;">对创作者主页和单个尚品的收藏排行</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<u-modal class="likenstarModal" v-model="explainShow" :titleStyle="{paddingBottom:'40rpx',fontSize:'40rpx'}" :show-title="true" title="升级说明" :show-confirm-button="false">
			<view v-html="brokerInfo.explain" style="color:#D4D4D6;padding: 0 40rpx"> 
			</view>
			<view class="button" style="width:240rpx;height:80rpx;line-height:80rpx;border-radius: 20rpx;margin:50rpx auto" @tap = "explainShow = false">我知道了</view>
		</u-modal>
	</view>
</template>

<script>
	import BrokerApi from "@/common/apis/broker.js"
	import MineApi from "@/common/apis/mine.js"
	import { calScrollHeight } from "@/common/common.js"
	export default{
		data(){
			return{
				brief:{},
				brokerInfo:{},
				brokerLevelOptions:{
					'1':'初级经济人',
					'2':'高级经济人'
				},
				explainShow:false,
				scrollViewHeight:0,
			}
		},
		onLoad(){
			this.scrollViewHeight = calScrollHeight(100)
			MineApi.content({}).then(res=>{
			  this.brief = res
			}).catch(err=>{
			  this.brief = {}
			  this.$u.toast(err)
			})
			BrokerApi.brokerInfo().then(res=>{
				res.explain = res.explain.replace(/(\r\n|\n|\r){1,2}/gm , "<br/>")
				this.brokerInfo = res
			}).catch(err=>{
				this.$u.toast(err)
			})
		},
		methods:{
			showExplain(){
				this.explainShow = true
			},
			gotoDoInvite(){
				uni.navigateTo({
					url:"/pages/sys/mine/doInvite"
				})
			},
			customGoBack(){
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
	@import url('@/common/css/index.scss');
	.deco0,.deco1{
		width:40rpx;
		height:30rpx;
		background-size:100% 100%;
		vertical-align: middle;
	}
	.deco0{
		margin-right:20rpx;
		background-image: url("@/static/common/img/mine/broker/deco0.png");
	}
	.deco1{
		margin-left:20rpx;
		background-image: url("@/static/common/img/mine/broker/deco1.png");
	}
	
	.grayCard{
		margin-top:50rpx;
		position:relative;
		background-color: #35353F;
		border-radius:20rpx;
	}
	
	.method1,.method2{
		position:absolute;
		width:176rpx;
		height:60rpx;
		background-size:100% 100%;
		left:0;
		top:-30rpx;
	}
	.method1{
		background-image: url("@/static/common/img/mine/broker/method1.png");
	}
	.method2{
		background-image: url("@/static/common/img/mine/broker/method2.png");
	}
	
	.methodbtn{
		width:156rpx;
		height:72rpx;
		background-image: url("@/static/common/img/login/Button@3x.png");
		background-size:100% 100%;
		border-radius: 106rpx;
		line-height:72rpx;
		text-align: center;
		font-size:24rpx;
	}
</style>