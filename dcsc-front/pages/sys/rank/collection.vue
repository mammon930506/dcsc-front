<template>
	<view class="wrap">
		<view class="fixedHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			尚品排行榜<view style="font-size: 24rpx;" @tap="gotoArtist">艺术家</view>
		</view>
		<!-- #ifdef APP-PLUS -->
		<view style="height:240rpx;"></view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view style="height:180rpx;"></view>
		<!-- #endif -->
		<custom-tab class="tabs" ref="collectionTabs" :navList="navList" @navChange="navChange" bgColor="#18181c">
		</custom-tab>
		<view style="margin:25rpx 30rpx 80rpx;">
			<view v-for="(item,index) in itemList" :key="index">
				<view class="collection_card">
					<view style="display: flex;justify-content: space-between;">
						<view style="display: flex;">
							<view @tap="gotoDetail(item)"
								style="width:208rpx;height:208rpx;border-radius: 20rpx;background-size:cover;margin-right:20rpx;"
								:style="{backgroundImage:`url(${imgBaseUrl}${item.nftImgs}${imgSuffix})`}">
								<view class="levels" :class="[index<3 ? 'levels'+index : 'levels']">
									{{(index+1)<10 ? '0'+(index+1) : (index+1)}}
								</view>
							</view>
							<!-- 默认样式 -->
							<view class="flex-colum-between" style="width:324rpx">
								<view class="text-overlfow text-line-clamp3" style="color:#F3F4F6;font-size:28rpx;">{{item.nftName}}
								</view>

								<view class="flex-start" style="color:#9CA3AF;font-size:20rpx;padding-bottom: 20rpx;">
									<view @tap="gotoArtistMain(item)" class="avatar" :style="{backgroundImage:`url(${imgBaseUrl}${item.userMarker}${imgSuffix})`}">
									</view>
									{{item.nickName}}
								</view>
							</view>
						</view>
						<view class="thumbs-up" @tap="thumbs(item)">
							<image v-if="Number(item.isStoreup)" src="@/static/common/img/rank/icon2.png" mode="aspectFill"></image>
							<image v-else src="@/static/common/img/rank/icon1.png" mode="aspectFill"></image>
						</view>
					</view>
					<view style="width:100%;margin-top: 20rpx;" class="flex-between">
						<view class="left flex-center">
							<image class="hot_icon" src="@/static/common/img/rank/hot.png" mode="aspectFill"></image>
							{{transfromNum(item.tradeAmount)}}
						</view>
						<view class="flex-center">
							<view @tap="handleShare(item)" class="share flex-center">
								<u-icon style="font-size:26rpx;margin-right: 5rpx;" name="share"></u-icon>
								分享
							</view>
							<view @tap="gotoStore(item)" class="button flex-center"
								style="width:132rpx;height:58rpx;border-radius:20rpx;font-size:24rpx;font-weight: bold;">
								<u-icon style="font-size:30rpx;margin-right: 5rpx;" name="shopping-cart"></u-icon>
								购买
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
  import MerchandiseApi from "@/common/apis/merchandise";
	export default {
		components: {
			CustomTab,
		},
		data() {
			return {
				bannerType: '3',
				workPage: 0,
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
				}],
			}
		},
		onLoad() {
			this.getDefaultContent('1')
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
			thumbs(item) {
        MerchandiseApi.storeUp({
          params:{
            nftCode:item.nftCode
          }
        }).then(res=>{
          this.$set(item,'isStoreup',res.isStore)
        }).catch(err=>{
          this.$u.toast(err)
        })
			},
			getDefaultContent(rankType) {
				uni.showLoading({
					title:'加载中..'
				})
				HomeApi.content({
					params: {
						channelType: '5',
						rankingType: rankType
					}
				}).then(res => {
					console.log(res, '尚品排行榜');
					this.itemList = res.ranking
					uni.hideLoading()
				}).catch(err => {
					this.$u.toast(err)
					uni.hideLoading()
				})
			},
      handleShare(item){
        // this.$refs.sharePop.show = true
        uni.navigateTo({
          url:`/pages/sys/sns/publishPost?repostType=merchandise&nftCode=${item.nftCode}`
        })
      },
			gotoStore(item) {
				uni.navigateTo({
					url: `/pages/sys/merchandise/store?userCode=${item.userCode}`
				})
			},
      gotoDetail(item){
        uni.navigateTo({
          url:`/pages/sys/merchandise/detail?nftCode=${item.nftCode}`
        })
      },
			gotoArtistMain(item) {
				uni.navigateTo({
					url: `/pages/sys/merchandise/artistMain?userCode=${item.userCode}`
				})
			},
			gotoArtist(){
				uni.navigateTo({
					url: "/pages/sys/rank/artists"
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
		padding: 26rpx;
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
