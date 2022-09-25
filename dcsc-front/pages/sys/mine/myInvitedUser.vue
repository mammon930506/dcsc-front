<template>
	<view class="wrap">
		<!-- #ifdef H5 -->
		<view class="pageHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			<view style="margin-left:80rpx;">我的邀请</view>
			<view @tap="gotoBrokerRankArtist">排行榜</view>
		</view>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS -->
		<view class="fixedHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			<view style="margin-left:80rpx;">我的邀请</view>
			<view @tap="gotoBrokerRankArtist">排行榜</view>
		</view>
		<view style="height: 160rpx;"></view>
		<!-- #endif -->
		<view>
			<scroll-view scroll-y="true" :style="{height:scrollViewHeight}" @scrolltolower="loadMore" >
				<view v-if="invitedList&&invitedList.length>0">
					<view style="padding:30rpx;">
						<view class="monthItem" v-for="monthItem in invitedList">
							<view style="color:#6B7280;font-size:28rpx;padding-bottom:10rpx;">{{ monthItem.date}}<u-icon name="arrow-down-fill" @tap="toggleFolding(monthItem)" :class="{folding:monthItem.folding}" style="margin-left:20rpx;font-size:20rpx;"></u-icon></view>
							<template v-if="!monthItem.folding">
								<view v-for="brief in monthItem.shareUsers">
									<share-brief :brief="brief"></share-brief>
								</view>
							</template>
						</view>
					</view>
				</view>
				<view v-else>
					<view class="blankIcon"></view>
					<view style="color:#AAAAAA;font-size:32rpx;text-align: center;font-weight: bold;">
						<view>您还没有邀请</view>
						<!-- <view v-else-if="!noFollowing&&noTimeline">你关注的用户暂时没有新动态</view> -->
					</view>
				</view>

			</scroll-view>
		</view>
	</view>
</template>

<script>
	import MineApi from "@/common/apis/mine.js"
	import ShareBrief from "@/components/mine/ShareBrief"
	import {calScrollHeight} from "@/common/common.js"
	export default{
		data(){
			return{
				workPage:-1,
				invitedList:[],
				scrollViewHeight:0,
			}
		},
		onLoad(){
			this.scrollViewHeight = calScrollHeight(120)
			this.loadMore()
		},
		components:{
			ShareBrief
		},
		methods:{
			loadMore(){
				this.workPage++
				MineApi.myInvitedUser({
					params:{
						offset:this.workPage,
						pageSize:10
					}
				}).then(res=>{
					res.data.forEach(obj=>{
						obj.folding = false
					})
					this.invitedList = this.invitedList.concat(res.data)
				}).catch(err=>{
					this.$u.toast(err)
				})	
			},
			toggleFolding(monthItem){
				monthItem.folding = !monthItem.folding
			},
			gotoBrokerRankArtist(){
				uni.navigateTo({
					url:"/pages/sys/mine/broker/rankArtist"
				})
			},
			customGoBack(){
				uni.navigateTo({
					url:"/pages/sys/mine/doInvite"
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

	.folding{
		transform:rotate(-90deg)
	}
	
	view.monthItem:last-child{
		margin-bottom:60rpx;
	}

</style>