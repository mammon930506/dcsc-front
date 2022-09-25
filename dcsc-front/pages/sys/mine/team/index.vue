<template>
	<view class="wrap">
		<view class="fixedHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			我的团队<view  @tap="gotoArtist">排行榜</view>
		</view>
		<!-- #ifdef APP-PLUS -->
		<view style="height:240rpx;"></view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view style="height:180rpx;"></view>
		<!-- #endif -->
		<view style="margin: 10rpx 40rpx;height: 80rpx;background-color: #2A2A34;border-radius: 30rpx;display: flex;justify-content:space-between;">
			<view  style="margin-left:40rpx;margin-top:20rpx;margin-bottom: 20rpx;">我的推荐人</view>
			
			<view  v-if="reference===undefined" style="margin-top:20rpx;margin-bottom: 20rpx;margin-right: 20rpx;">
				暂无推荐人
			</view>
			<view v-else  style="margin-right:40rpx;display: flex;justify-content:space-between;">
				<view style="background-color:#35353F;margin-top:5rpx;margin-bottom: 5rpx;border-radius:55rpx;width:70rpx;height:70rpx;overflow:hidden;">
						<u-image width="100%" height="100%"  :src="imgBaseUrl+myGroup.referenceHeader+imgSuffix" ></u-image>
				</view>
				<view style="margin-top:20rpx;margin-bottom: 20rpx;margin-left: 20rpx;">
				{{myGroup.referenceNickName}}
				</view>
			</view>
			
		</view>
		<view style="margin: 50rpx 40rpx;">团队数据汇总</view>
		<view style="margin: 50rpx 40rpx;height: 270rpx;background-color: #2A2A34;border-radius: 30rpx;">
			<custom-tab class="tabs" ref="collectionTabs" :navList="navList" @navChange="navChange" ></custom-tab>
			<view class="collection_card">
				<view v-if="groupType===0?true:false" style="display: flex;justify-content: space-between;margin-top: 30rpx;">
					<view style="width: 33%;text-align: center;">
						<view style="margin: 0rpx;height:50%;color: #FFFFFF;">{{directUsers}}</view>
						<view style="margin: 0rpx;height:50%;color: #9CA3AF;" @tap="directTeam">全部队员</view>
					</view>
					<view style="width: 33%;text-align: center;">
						<view style="margin: 0rpx;height:50%;color: #FFFFFF;">{{directSellers}}</view>
						<view style="margin: 0rpx;height:50%;color: #9CA3AF;">活性买家</view>
					</view>
					<view style="width: 33%;text-align: center;">
						<view style="margin: 0rpx;height:50%;color: #FFFFFF;">{{directPurchases}}</view>
						<view style="margin: 0rpx;height:50%;color: #9CA3AF;" @tap="activeAuthor">活性创作者</view>
					</view>
				</view>
				<view v-if="groupType===1?true:false" style="display: flex;justify-content: space-between;margin-top: 30rpx;">
					<view style="width: 48%;text-align: center;">
						<view style="margin: 0rpx;height:50%;color: #FFFFFF;">{{indirectUsers}}</view>
						<view style="margin: 0rpx;height:50%;color: #9CA3AF;"  @tap="indirectTeam">全部队员</view>
					</view>
					<view style="width: 48%;text-align: center;">
						<view style="margin: 0rpx;height:50%;color: #FFFFFF;">{{indirectPurchases}}</view>
						<view style="margin: 0rpx;height:50%;color: #9CA3AF;">活性买家</view>
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
  import BrokerApi from "@/common/apis/broker.js"
  import MineApi from "@/common/apis/mine.js"
  import CustomTab from "@/components/merchandise/TabsInStore.vue"
  import jlCatche from "@/common/utils/jlCatche.js"
	export default {
		components: {
			CustomTab,
		},
		data() {
			return {
				myGroup:[],	
				reference:undefined,
				groupType:0,
				directUsers:0,
				directSellers:0,
				directPurchases:0,
				indirectUsers:0,
				indirectPurchases:0,
				navList: [{
					name: '直属队员',
					value: '1'
				}, {
					name: '间接队员',
					vaue: '2'
				}]
			}
		},
		onLoad() {
			
			MineApi.myGroup({}).then(res=>{
				this.myGroup=res;
				this.directUsers=this.myGroup.directUsers;				this.directSellers=this.myGroup.directSellers;				this.directPurchases=this.myGroup.directPurchases;
				this.reference=this.myGroup.reference;
			}).catch(err=>{
			  this.$u.toast(err)
			})
			
		},
		methods: {
			navChange(index,item) {
				this.$refs.collectionTabs.current = index
				if(index===0){
					this.directUsers=this.myGroup.directUsers;
					this.directSellers=this.myGroup.directSellers;
					this.directPurchases=this.myGroup.directPurchases;
					this.groupType=index;
				}
				if(index===1){
					this.indirectUsers=this.myGroup.indirectUsers;
					this.indirectPurchases=this.myGroup.indirectPurchases;
					this.groupType=index;
				}
			},
			gotoArtist(){
				BrokerApi.rankArtist({
					params:{
						offset:0,
						pageSize:10,
						rankType:'1',
						orderType:'1'
					}
				}).then(res=>{
					uni.navigateTo({
						url: "/pages/sys/mine/broker/rankArtist"
					})
				}).catch(err=>{
					this.$u.toast(err)
					uni.hideLoading()
				})
			},
			directTeam(){
				uni.navigateTo({
					url: "/pages/sys/mine/team/directTeam",
				})
			},
			indirectTeam(){
				uni.navigateTo({
					url: "/pages/sys/mine/team/indirectTeam",
				})
			},
			activeAuthor(){
				uni.navigateTo({
					url: "/pages/sys/mine/team/activeAuthor",
				})
			},
			customGoBack() {
				uni.switchTab({
					url:'/pages/sys/mine/index'
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


	/* #ifdef APP-PLUS */
	.tabs {
		padding: 30rpx 0 20rpx;
		top: 140rpx;
		left: 0;
		z-index: 999;
	}
	/* #endif */
	/* #ifdef H5 */
	.tabs {
		padding: 30rpx 0 20rpx;
		top: 80rpx;
		left: 0;
		z-index: 999;
	}
	/* #endif */

	.left {
		width: 208rpx;
		text-align: center;
		color: #C850C0;

		.hot_icon {
			width: 25rpx;
			height: 26rpx;
			margin-right: 5rpx;
		}
	}

	.share {
		margin-right: 40rpx;
		font-size: 25rpx;
		font-weight: bold;
		color: #7A83D2;
	}

	.avatar {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		margin-right: 7rpx;
		background-color: #fff;
		background-repeat: no-repeat;
		background-size: cover;
	}

	.levels {
		color: #fff;
		font-weight: bold;
		background: url('@/static/common/img/rank/level.png') no-repeat;
		background-size: cover;
		width: 80rpx;
		height: 56rpx;
		line-height: 82rpx;
		text-align: center;
		position: absolute;
		left: 0;
		top: 10rpx;
	}

	.levels0 {
		background: url('@/static/common/img/rank/level1.png') no-repeat;
	}

	.levels1 {
		background: url('@/static/common/img/rank/level2.png') no-repeat;
	}

	.levels2 {
		background: url('@/static/common/img/rank/level3.png') no-repeat;
	}
</style>
