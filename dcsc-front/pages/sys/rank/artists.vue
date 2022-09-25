<template>
	<view class="wrap">
		<view class="fixedHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			艺术家排行榜<view style="font-size: 24rpx;" @tap="gotoCollection">尚品</view>
		</view>
		<!-- #ifdef APP-PLUS -->
		<view style="height:240rpx;"></view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view style="height:180rpx;"></view>
		<!-- #endif -->
			<custom-tab class="tabs" ref="collectionTabs" :navList="navList" @navChange="navChange" bgColor="#18181c"></custom-tab>
		<view style="margin:25rpx 30rpx 80rpx;">
			<view v-for="(item,index) in itemList" :key="index">
				<view class="collection_card">
					<view style="display: flex;justify-content: space-between;">
						<view class="flex-row-around-start">
							<view class="num" :class="[index<3 ? 'num'+index : 'num']">
								{{(index+1)<10 ? '0'+(index+1) : (index+1)}}
							</view>
							<view @tap="gotoArtistMain(item)" class="top" :class="[index<3 ? 'top'+index : '']" :style="{backgroundImage:`url(${imgBaseUrl}${item.header}${imgSuffix})`}">
							</view>
							<!-- 默认样式 -->
							<view class="flex-colum-between" style="width:290rpx">
								<view style="color:#F3F4F6;font-size:26rpx;padding-bottom: 12rpx;">{{item.nickName}}</view>

								<view style="color:#9CA3AF;font-size:20rpx;">
									<view class="flex-row-start-start">
                    <view style="width:130rpx;">用户标签：</view>
                    <view style="width:220rpx;overflow: hidden;word-wrap: break-word;word-break: break-all">
                      <span v-if="item.userMarkerList&&item.userMarkerList.length>0">
                          <span style="display: inline-block;padding-right:10rpx;" v-for="(item,index) in item.userMarkerList" :key="index">{{item}}</span>
                      </span>
                      <span v-else>暂无标签</span>
                    </view>
                  </view>
									<view>作品 {{ item.works }} ｜ 粉丝 {{ item.fans }}</view>
								</view>
							</view>
						</view>
						<view class="flex-col-between-end">
							<view class="left flex-center">
								<image class="hot_icon" src="@/static/common/img/rank/hot.png" mode="aspectFill">
								</image>
								{{transfromNum(item.tradeAmount)}}
							</view>
							<view >
                <follow :detail="item"></follow>
							</view>
						</view>
					</view>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import HomeApi from "@/common/apis/home.js"
	import CustomTab from "@/components/merchandise/TabsInStore.vue"
  import Follow from "@/components/mine/Follow.vue"
	export default {
		components: {
			CustomTab,Follow
		},
		data() {
			return {
				bannerType: '3',
				workPage: 0,
				isThumbs: false,
				itemList: [],
				navList: [{
					name: '周榜',
					value: '1'
				}, {
					name: '月榜',
					value: '2'
				}, {
					name: '总榜',
					value: '3'
				}, {
					name: '新人榜',
					value: '4'
				}],
			}
		},
		onLoad() {
			this.getDefaultContent('1')
		},
		onReachBottom() {

		},
		methods: {
			navChange(index,item) {
				console.log(item);
				this.$refs.collectionTabs.current = index
				this.getDefaultContent(item.value)
			},
			transfromNum(num) {
				num = Number(num);
				if (num == 0) {
					return num + '';
				} else
				if (num > 1 && num < 10000) {
					return num + '';
				} else {
					return (num / 10000).toFixed(2) + 'w';
				}

			},
			getDefaultContent(rankType) {
				uni.showLoading({
					title:'加载中..'
				})
				HomeApi.content({
					params: {
						channelType: '4',
						rankingType:rankType
					}
				}).then(res => {
					console.log(res, '艺术家排行榜');
          res.ranking.forEach(artist=>{
            artist.userMarker = artist.userMarker||'[]'
            artist.userMarkerList = JSON.parse(artist.userMarker)
            artist.isAttention = Number(artist.isLikes)
          })
					this.itemList=res.ranking
					uni.hideLoading()
				}).catch(err => {
					this.$u.toast(err)
					uni.hideLoading()
				})
			},
			gotoStore(item) {
				uni.navigateTo({
					url: `/pages/sys/merchandise/store?userCode=${item.userCode}`
				})
			},
			gotoArtistMain(item) {
				uni.navigateTo({
					url: `/pages/sys/merchandise/artistMain?userCode=${item.userCode}`
				})
			},
			gotoCollection(){
				uni.navigateTo({
					url: "/pages/sys/rank/collection"
				})
			},
			customGoBack() {
				uni.switchTab({
					url:'/pages/sys/home/index'
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

	.collection_card {
		background-color: #2A2A34;
		border-radius: 32rpx;
		padding: 32rpx;
		margin-bottom: 20rpx;
		position: relative;

		.thumbs-up {
			width: 48rpx;
			height: 48rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.num {
		font-weight: bold;
		font-size: 24rpx;
		color: #6B7280;
		margin-right: 24rpx;
	}

	.num0 {
		color: #FBB645;
	}

	.num1 {
		color: #B4B8BF;
	}

	.num2 {
		color: #C88C6D;
	}
	/* #ifdef APP-PLUS */
	.tabs {
		position: fixed;
		background: #18181c;
		padding: 30rpx 0 20rpx;
		top: 140rpx;
		left: 0;
		z-index: 999;
	}
	/* #endif */
	/* #ifdef H5 */
	.tabs {
		position: fixed;
		background: #18181c;
		padding: 30rpx 0 20rpx;
		top: 80rpx;
		left: 0;
		z-index: 999;
	}
	/* #endif */

	.left {
		color: #C850C0;
		padding-bottom: 12rpx;

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

	.top {
		width: 94rpx;
		height: 94rpx;
		border-radius: 50%;
		background-size: cover;
		margin-right: 20rpx;
		background-color: #fff;
		border: 2px solid #423F55;
		position: relative;
	}

	.top0::before {
		content: '';
		width: 30rpx;
		height: 32rpx;
		top: -10rpx;
		left: -15rpx;
		position: absolute;
		z-index: 99;
		background: url('@/static/common/img/rank/top1.png') no-repeat;
		background-size: cover;
	}

	.top1::before {
		content: '';
		width: 30rpx;
		height: 32rpx;
		top: -10rpx;
		left: -15rpx;
		position: absolute;
		z-index: 99;
		background: url('@/static/common/img/rank/top2.png') no-repeat;
		background-size: cover;
	}

	.top2::before {
		content: '';
		width: 30rpx;
		height: 32rpx;
		top: -10rpx;
		left: -15rpx;
		position: absolute;
		z-index: 99;
		background: url('@/static/common/img/rank/top3.png') no-repeat;
		background-size: cover;
	}
</style>
