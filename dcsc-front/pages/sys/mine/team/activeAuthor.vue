<template>
	<view class="wrap">
		<view class="fixedHeader" style="height: 100rpx;">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			活性创作者<view ></view>
		</view>
		<view style="height: 100rpx;"></view>
		<scroll-view scroll-y="true" @scrolltolower="activeAuthorPage"  @refresherrefresh="pullDownRefresh"
		:style="{height:scrollViewHeight}"  :refresher-enabled="true" :refresher-triggered="refreshTriggered" refresher-background="#18181c" 
		 >
		 <view v-if="activeAuthorList && activeAuthorList.length>0" >
			<view v-for="activeAuthor in activeAuthorList"    style="margin: 30rpx 40rpx;height: 120rpx;background-color: #2A2A34;border-radius: 30rpx;">
				<view style="margin-right:40rpx;display: flex;flex-direction: row;">
					<view style="background-color:#35353F;margin-left: 30rpx; margin-top:10rpx;margin-bottom: 10rpx;border-radius:55rpx;width:100rpx;height:100rpx;overflow:hidden;">
							<u-image width="100%" height="100%"  :src="imgBaseUrl+activeAuthor.header+imgSuffix" ></u-image>
					</view>
					<view style="width: 36%; margin-left: 50rpx;margin-top:20rpx;margin-bottom: 20rpx;display: flex;flex-direction: column;">
						<view  style="font-size:30rpx;color: #F3F4F6;">{{activeAuthor.nickName}}</view>
						<view  style="font-size:16rpx;color: #9CA3AF;margin-top: 10rpx;">入驻日期:{{ activeAuthor.createdDate && $u.timeFormat(activeAuthor.createdDate, 'yyyy-mm-dd') }} </view>
					</view>
					<view style=" margin-left: 90rpx;margin-top:40rpx;color: #C850C0;" @tap="goIndirectTeam(activeAuthor.userCode)">
						粉丝贡献<u-icon style="font-size:16rpx;" name="arrow-right" ></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view  v-else>
			<view class="blankIcon"></view>
			<view style="color:#AAAAAA;font-size:32rpx;text-align: center;font-weight: bold;">
				<view>暂无活性创作者</view>
			</view>
		</view>
			
		</scroll-view>
	</view>
</template>

<script>
	import MineApi from "@/common/apis/mine.js"
	import {calScrollHeight} from "@/common/common.js"
	export default {
		data() {
			return {
				activeAuthorList:[],
				refreshTriggered:false,
				scrollViewHeight:"calc( 100vh - 140rpx )",
				currPage: 0
			}
		},
		onShow(){
			setTimeout(()=>{
				this.scrollViewHeight = calScrollHeight()
			},1000)
			this.loadData();
		},
		methods: {
			loadData(){
				if(this.currPage>=0){
					let params = {
						offset: this.currPage,
						pageSize: 10
					}
					MineApi.activeArtPage({
						params:params
					}).then(res=>{
						if(this.refreshTriggered){
							this.activeAuthorList=[]
						}
						
						this.activeAuthorList = res.data
						setTimeout(()=>{
							this.refreshTriggered=false
						},1000)
					})
				}
			},
			activeAuthorPage(){
				uni.showLoading({
					title:'正在加载...',
					mask:true,
				})
				this.currPage++;
				let params = {
					offset: this.currPage,
					pageSize: 10
				}
				MineApi.activeArtPage({
					params:params
				}).then(res=>{
					if(this.refreshTriggered){
						this.activeAuthorList=[]
					}
					
					if(res.data.length<10){
						this.currPage--
					}
					let lastOffset = Math.floor(this.activeAuthorList.length/10)
					this.activeAuthorList = this.activeAuthorList.splice(0,lastOffset*10).concat(res.data)
					setTimeout(()=>{
						this.refreshTriggered=false
					},1000)
					uni.hideLoading()
				}).catch(err=>{
				  this.$u.toast(err);
				  uni.hideLoading();
				})
			},
			pullDownRefresh(){
				this.refreshTriggered = true;
				this.currPage = -1;
				this.loadData();
			},
			goIndirectTeam(userCode){
				uni.navigateTo({
					url: "/pages/sys/mine/team/activeAuthorRank?userCode="+userCode,
				})
			},
			customGoBack() {
				uni.navigateBack({
					delta: 1
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