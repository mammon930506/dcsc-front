<template>
	<view class="wrap">
		<!-- #ifdef APP-PLUS -->
		<view class="fixedHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			邀请订单<view></view>
		</view>
		<view style="height: 160rpx;"></view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view class="pageHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			邀请订单<view></view>
		</view>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS -->
				<tabs-in-store style="margin:20rpx 0 0;position: fixed;top: 160rpx;z-index: 999;" :initial="current"  inactiveColor="#ffffff" :navList="navList" bgColor="#18181c" @navChange="navChange"></tabs-in-store>
		<!-- #endif -->
		<!-- #ifdef H5 -->
				<tabs-in-store style="margin:20rpx 0 0" :initial="current"  inactiveColor="#ffffff" :navList="navList" bgColor="#18181c" @navChange="navChange"></tabs-in-store>
		<!-- #endif -->

		<view>
			<scroll-view scroll-y="true" :style="{height:scrollViewHeight}" @scrolltolower="queryList" >
				<view v-if="invitedList&&invitedList.length>0">
					<view style="padding:30rpx;">
						<view v-for="brief in invitedList">
							<share-brief :brief="brief" :isInvitedOrder="true"></share-brief>
						</view>
					</view>
				</view>
				<view v-else>
					<view class="blankIcon"></view>
					<view style="color:#AAAAAA;font-size:32rpx;text-align: center;font-weight: bold;">
						<view>您还没有邀请订单</view>
						<!-- <view v-else-if="!noFollowing&&noTimeline">你关注的用户暂时没有新动态</view> -->
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import MineApi from "@/common/apis/mine.js"
	import TabsInStore from "@/components/merchandise/TabsInStore"
	import ShareBrief from "@/components/mine/ShareBrief"
	import {calScrollHeight} from "@/common/common.js"
	export default{
		data(){
			return{
				workPage:-1,
				invitedList:[],
				navList:[
					{
						name:'销售',value:1
					},{
						name:'购买',value:2
					}
				],
				current:0,
				scrollViewHeight:0,
			}
		},
		components:{
			TabsInStore,ShareBrief
		},
		onLoad(){
			this.scrollViewHeight = calScrollHeight(180)
			this.queryList()
		},
		methods:{
			navChange(index,item){
				this.current = index
				this.invitedList = []
				this.workPage = -1
				this.queryList()
			},
			queryList(){
				this.workPage++
				MineApi.myInvitedOrder({
					params:{
						offset:this.workPage,
						pageSize:10,
						orderType:this.navList[this.current].value
					}
				}).then(res=>{
					if(!res.data||res.data.length<10){
						this.workPage--
					}
					let lastOffset = Math.floor(this.invitedList.length/10)
					this.invitedList = this.invitedList.splice(0,lastOffset*10).concat(res.data)
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