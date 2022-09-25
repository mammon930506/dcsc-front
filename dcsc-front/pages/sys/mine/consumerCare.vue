<template>
	<view class="wrap">
		<view class="fixedHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			联系客服<view></view>
		</view>
		<!-- #ifdef APP-PLUS -->
		<view style="height:160rpx;"></view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view style="height:100rpx;"></view>
		<!-- #endif -->
		<view class="contact">
			<view style="color:#9CA3AF;font-size:48rpx;padding-left:88rpx;padding-top:140rpx;">联系客服</view>
		</view>
		<view style="padding:0 30rpx;margin-top:280rpx;position:relative;z-index:5">
			<view class="card" style="display: flex;justify-content: space-between;align-items: center;">
				<view style="width:45%">
					<view class="ctitle">客服微信</view>
					<view class="cvalue">{{ detail.wechat }}</view>
				</view>
				<view style="width:2rpx;background-color:#F3F4F6;height:80rpx;"></view>
				<view style="width:45%">
					<view class="ctitle">客服电话</view>
					<view class="cvalue">{{ detail.phone }}</view>
				</view>
			</view>
			<view>
				<tabs-in-store bgColor="#18181c" :navList="navList" @navChange="tabChange"></tabs-in-store>
			</view> 
		</view>
		<view class="halfCard">
			<view style="position:relative;margin-bottom:30rpx;">
				<u-input :clearable="false" :custom-style="searchStyle" placeholder-style="color:#6B7280"
					@confirm="handleSearch" placeholder="请输入问题关键字" v-model="queryParams.question"></u-input>
				<image @tap="handleSearch" src="/static/common/img/index/recommend/Search.png"
					style="width:35rpx;height:36rpx;position:absolute;right:32rpx;top:calc( 50% - 18rpx )"></image>
			</view>
			<!-- #ifdef APP-PLUS -->
				<scroll-view scroll-y style="height:calc( 100vh - 880rpx );" @scrolltolower="queryContent">
			<!-- #endif -->
			<!-- #ifdef H5 -->
			    <scroll-view scroll-y style="height:calc( 100vh - 820rpx );" @scrolltolower="queryContent">
			<!-- #endif -->
				<view class="card" style="background-color: #35353F;" v-for="(ques,qindex) in qaList">
					<view style="color:#F3F4F6;display: flex;justify-content: space-between;margin-bottom:20rpx;">
						Q: {{ ques.question }}
						<u-icon @tap="ques.folding=!ques.folding" :name="ques.folding?'arrow-down':'arrow-up'"></u-icon>
					</view>
					<view v-show="!ques.folding" style="color:#999999;margin-left:40rpx;">{{ ques.answer }}</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import MineApi from "@/common/apis/mine.js"
	import TabsInStore from "@/components/merchandise/TabsInStore"
	export default{
		data(){
			return{
				navList:[
					{name:'全部', value:undefined},
					{name:'关于我们', value:"1"},
					{name:'账户', value:"2"},
					{name:'售后', value:"3"},
					{name:'产品', value:"4"},
					{name:'购买', value:"5"},
				],
				searchStyle: {
					height: "90rpx",
					backgroundColor: '#35353F',
					borderRadius: '24rpx',
					paddingLeft: '36rpx'
				},
				workPage:-1,
				queryParams:{
					pageSize:10,
					question:'',
					problemType:undefined,
				},
				qaList:[],
				detail:{},
			}
		},
		onLoad(){
			this.queryContent()
		},
		components:{
			TabsInStore
		},
		methods:{
			tabChange(index,item){
				this.workPage = -1
				this.queryParams.problemType = item.value
				this.queryContent()
			},
			handleSearch(){
				this.workPage = -1
				this.queryContent()
			},
			queryContent(){
				uni.showLoading({
					title:'正在查询...',
					mask:true
				})
				this.workPage++
				MineApi.consumerCare({
					params:{
						offset:this.workPage,
						...this.queryParams,
					}
				}).then(res=>{
					if(!res.commonproblem||res.commonproblem.length<10){
						this.workPage--
					}
					let offset = Math.floor(this.qaList.length/10)
					res.commonproblem.forEach(ques=>{
						ques.folding=false
					})
					this.qaList=this.qaList.splice(0,offset*10).concat(res.commonproblem)
					this.detail = res
					uni.hideLoading()
				}).catch(err=>{
					this.$u.toast(err)
					uni.hideLoading()
				})
			},
			customGoBack(){
				uni.switchTab({
					url:"/pages/sys/mine/index"
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
	.contact{
		width:100%;
		height:700rpx;
		background-position: center bottom;
		background-size: 100% auto;
		background-image: url("@/static/common/img/mine/index/consumerService.png");
		position:absolute;
		z-index: 3;
	}
	.ctitle{
		color:#9CA3AF;
		font-size:24rpx;
		text-align: center;
		margin-bottom:25rpx;
	}
	.cvalue{
		color:#F3F4F6;
		font-size:28rpx;
		text-align: center;
	}
	/* #ifdef H5 */
	.halfCard{
		position:fixed;
		bottom:0;
		width:100%;
		height:calc( 100vh - 640rpx );
		padding:50rpx 30rpx;
		background-color:#2A2A34;
		border-top-left-radius: 70rpx;
		border-top-right-radius: 70rpx;
		z-index:5;
	}
	/* #endif */
	/* #ifdef APP-PLUS */
	.halfCard{
		position:fixed;
		bottom:0;
		width:100%;
		height:calc( 100vh - 700rpx );
		padding:50rpx 30rpx;
		background-color:#2A2A34;
		border-top-left-radius: 70rpx;
		border-top-right-radius: 70rpx;
		z-index:5;
	}
	/* #endif */
</style>