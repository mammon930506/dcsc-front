<template>
	<view class="wrap">
		<view class="fixedHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			间接队员<view ></view>
		</view>
		
		<view style="height: 100rpx;"></view>
		<view v-if="directUser!==undefined">
			<view  style="margin: 10rpx 40rpx;height: 120rpx;background-color: #2A2A34;border-radius: 30rpx;display: flex;justify-content:space-between;">
				<view  style="margin-left:40rpx;margin-top:40rpx;margin-bottom: 40rpx;">上级</view>
				<view style="margin-right:40rpx;display: flex;justify-content:space-between;">
					<view style="background-color:#35353F;margin-top:10rpx;margin-bottom: 10rpx;border-radius:55rpx;width:100rpx;height:100rpx;overflow:hidden;">
							<u-image width="100%" height="100%"  :src="imgBaseUrl+directHeader+imgSuffix" ></u-image>
					</view>
					<view style="margin-top:40rpx;margin-bottom: 40rpx;margin-left: 20rpx;color: rgba(243, 244, 246, 1);">
					{{directUser}}
					</view>
				</view>
				
			</view>
			<view style="margin: 30rpx 40rpx;height: 20rpx;color: rgba(107, 114, 128, 1);">间接队员</view>
		</view>
		
		<scroll-view scroll-y="true"  @scrolltolower="indirectTeamPage"  @refresherrefresh="pullDownRefresh"
		:style="{height:scrollViewHeight}"  :refresher-enabled="true" :refresher-triggered="refreshTriggered" 
		refresher-background="#18181c" >
			 <view v-if="indirectTeamList && indirectTeamList.length>0" >
				<view   v-for="indirectTeam in indirectTeamList"    style="margin: 30rpx 40rpx;height: 120rpx;background-color: #2A2A34;border-radius: 30rpx;">
					<view style="display: flex;flex-direction: row;">
						<view style="background-color:#35353F;margin-left: 30rpx; margin-top:10rpx;margin-bottom: 10rpx;border-radius:55rpx;width:100rpx;height:100rpx;overflow:hidden;">
								<u-image width="100%" height="100%"  :src="imgBaseUrl+indirectTeam.header+imgSuffix" ></u-image>
						</view>
						<view style="margin-left: 50rpx;margin-top:20rpx;margin-bottom: 20rpx;display: flex;flex-direction: column;">
							<view  style="font-size:30rpx;color: #F3F4F6;">{{indirectTeam.nickName}}</view>
							<view  style="font-size:16rpx;color: #9CA3AF;margin-top: 10rpx;">入驻日期:{{ indirectTeam.createdDate && $u.timeFormat(indirectTeam.createdDate, 'yyyy-mm-dd') }} </view>
						</view>
					</view>
				</view>
			</view>
			<view  v-else>
				<view class="blankIcon"></view>
				<view style="color:#AAAAAA;font-size:32rpx;text-align: center;font-weight: bold;">
					<view>暂无间接队员</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import MineApi from "@/common/apis/mine.js"
	export default {
		data() {
			return {
				indirectTeamList:[],
				scrollViewHeight:"calc( 100vh - 140rpx )",
				refreshTriggered:false,
				directUser:undefined,
				directHeader:"",
				currPage:0
			}
		},
		onLoad(option) {
			let userCode =	option.userCode
			if(userCode===undefined){ 
				this.loadData();
			}else{
				this.indirectTeamUserCode(userCode);
			}
		},
		onShow(){
			setTimeout(()=>{
				this.scrollViewHeight = calScrollHeight()
			},1000)
		},
		methods: {
			loadData(){
				
					let params = {
						offset: this.currPage,
						pageSize: 10
					}
					MineApi.referencesIndirectPage({
						params:params
					}).then(res=>{
						if(this.refreshTriggered){
							this.indirectTeamList=[]
						}
						
						this.indirectTeamList = res.data
						setTimeout(()=>{
							this.refreshTriggered=false
						},1000)
					})
				
			},
			indirectTeamUserCode(userCode){
				let params = {
					offset: 0,
					pageSize: 10,
					userCode:userCode
				}
				MineApi.referencesPage({
					params:params
				}).then(res=>{
					this.indirectTeamList=res.data;
					this.directUser=res.name;
					this.directHeader=res.header;
				}).catch(err=>{
				  this.$u.toast(err)
				})
			},
			indirectTeamPage(){
				uni.showLoading({
					title:'正在加载...',
					mask:true,
				})
				this.currPage++;
				let params = {
					offset: this.currPage,
					pageSize: 10
				}
				MineApi.referencesIndirectPage({
					params:params
				}).then(res=>{
					if(this.refreshTriggered){
						this.indirectTeamList=[]
					}
					if(res.data.length<10){
						this.currPage--
					}
					let lastOffset = Math.floor(this.indirectTeamList.length/10)
					this.indirectTeamList = this.indirectTeamList.splice(0,lastOffset*10).concat(res.data)
					this.directUser=res.name;
					this.directHeader=res.header;
					setTimeout(()=>{
						this.refreshTriggered=false
					},1000)
					uni.hideLoading()
				}).catch(err=>{
				  this.$u.toast(err);
				  uni.hideLoading()
				})
			},
			pullDownRefresh(){
				this.refreshTriggered = true;
				this.currPage = -1;
				this.loadData();
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
