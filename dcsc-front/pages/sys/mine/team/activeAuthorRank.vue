<template>
	<view class="wrap">
		<view class="pageHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			粉丝贡献排行榜<view></view>
		</view>
		<tabs-in-store style="margin:20rpx 0 0" inactiveColor="#ffffff" :navList="navList" bgColor="#18181c"
			@navChange="navChange"></tabs-in-store>
		<view>
			<view style="padding:30rpx">
				<view v-if="activeAuthorRankList && activeAuthorRankList.length>0">
					<view v-for="item in activeAuthorRankList"
						style="margin: 20rpx 20rpx;height: 140rpx;background-color: #2A2A34;border-radius: 30rpx;">
						<view style="display: flex;justify-content : flex-row;">
							<view @tap="gotoArtistMain(item)"
								style="width: 20%;background-color:#35353F;margin-left: 20rpx; margin-top:20rpx;margin-bottom: 20rpx;border-radius:55rpx;width:100rpx;height:100rpx;overflow:hidden;">
								<u-image width="100%" height="100%" :src="imgBaseUrl+item.header+imgSuffix"></u-image>
							</view>
							<view style="width: 48%; margin-left: 20rpx;margin-top:20rpx;margin-bottom: 20rpx;">
								<span style="font-size:30rpx;color: #F3F4F6;">{{ item.nickName }}</span>
								<br>
								<span style="font-size:12rpx;color: #9CA3AF;">
									销售金额{{item.amount/100}}元 | 交易单量{{ item.payCount }}单
								</span>
							</view>
							<view style="width: 20%; margin-left: 10rpx;margin-top:40rpx;color: #C850C0;">
								<follow :detail="item" style="width: 180rpx;"></follow>
							</view>
						</view>
					</view>
				</view>
				<view v-else>
					<view class="blankIcon"></view>
					<view style="color:#AAAAAA;font-size:32rpx;text-align: center;font-weight: bold;">
						<view>你还没有粉丝</view>
						<!-- <view v-else-if="!noFollowing&&noTimeline">你关注的用户暂时没有新动态</view> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import TabsInStore from "@/components/merchandise/TabsInStore"
	import Follow from "@/components/mine/Follow.vue"
	import MineApi from "@/common/apis/mine.js"
	import {
		calScrollHeight
	} from "@/common/common.js"
	export default {
		data() {
			return {
				activeAuthorRankList: [],
				navList: [{
					name: '周榜',
					value: '1'
				}, {
					name: '月榜',
					value: '2'
				}, {
					name: '总榜',
					value: '3'
				}],
				userCode: ""
			}
		},
		components: {
			Follow,
			TabsInStore
		},
		onLoad(option) {
			this.scrollViewHeight = calScrollHeight(200);
			this.userCode = option.userCode;
			this.queryArtFans('1')
		},
		methods: {
			navChange(index) {
				let rankType = this.navList[index].value;
				this.queryArtFans(rankType);
			},
			gotoArtistMain(item) {
				uni.navigateTo({
					url: `/pages/sys/merchandise/artistMain?userCode=${item.userCode}`
				})
			},
			queryArtFans(rankType) {
				let params = {
					rankType: rankType,
					userCode: this.userCode
				}
				MineApi.activeArtRank({
					params: params
				}).then(res => {
					this.activeAuthorRankList = [];
					this.activeAuthorRankList = res.data;
				}).catch(err => {
					this.$u.toast(err)
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

	.u-subsection {
		border-radius: 30rpx !important;

		/deep/ .u-item-bg {
			border-radius: 30rpx !important;
		}
	}
</style>
