<template>
	<view class="wrap">
		<headnavbar title="艺术家详情">
			<template slot="right">
				<view class="shareIcon" style="width:40rpx;height:40rpx;background-size:100% 100%"></view>
			</template>
		</headnavbar>
		<view class="artistBrief">
			<view class="rowAvatar">
				<view class="centercover avatar"
					:style="{backgroundImage:`url(${imgBaseUrl}${detail.header}${imgSuffix})`}"></view>
				<!--				<view class="centercover avatar" :style="{backgroundImage:`url(${imgUrl})`}"></view>-->
				<view class="social">
					<view @tap="gotoRelationship(0)" class="item">
						<view class="num">{{ detail.attention }}</view>
						<view class="sub">关注</view>
					</view>
					<view @tap="gotoRelationship(1)" class="item">
						<view class="num">{{ detail.fans }}</view>
						<view class="sub">粉丝</view>
					</view>
					<view class="item">
						<view class="num">{{ detail.storeup }}</view>
						<view class="sub">获赞与收藏</view>
					</view>
				</view>
			</view>
			<view class="rowProfile">
				<view class="flex-row-between-center">
					<view class="nickName">{{ detail.nickName }}</view>
					<follow :detail="detail"></follow>
				</view>
				<view class="profile">
					<view class="blockchain">
						<view>ID:{{ detail.userCode }}</view>
						<view>区块链地址:{{ detail.userHash }}</view>
					</view>
				</view>
			</view>
			<view @tap="toggleExtend" style="text-align: center;">
				<u-icon :name="isExtend?'arrow-up':'arrow-down'"></u-icon>
			</view>
			<view class="extendBriefWrap" :animation="shrinkAni" :style="{'--contentHeight':delta1}">
				<view class="extendBrief">
					<view v-if="detail.briefIntroduction" class="rowBrief">
						简介:{{ detail.briefIntroduction }}
					</view>
					<view v-if="detail.userMarker" style="display:flex;flex-wrap: wrap;padding-bottom:30rpx;">
						<view v-for="word in detail.userMarker" class="userMarker">
							<view></view>
							<view>{{ word }}</view>
						</view>
					</view>
				</view>
			</view>
			<view @tap="gotoStore" class="gotoStore">店铺</view>
			<tabs-in-store style="margin-top:20rpx;" :navList="navList" @navChange="tabChange"></tabs-in-store>
		</view>
		<view>
			<!-- #ifdef APP-PLUS -->
			<scroll-view scroll-y="true" @scrolltolower="loadMore" @scroll="handleScroll">
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<scroll-view scroll-y="true" @scrolltolower="loadMore" :style="{height:scrollViewHeight}"
					@scroll="handleScroll">
					<!-- #endif -->

					<view v-show="currentTabIndex==0" style="padding:30rpx;padding-top:30rpx;">
						<view v-if="postList&&postList.length>0">
							<view v-for="postContent in postList">
								<!--  #ifdef  H5 -->
								<post :content="postContent" :detailLevel="0" @toggleShare="handleScrollHeight"></post>
								<!--  #endif -->
								<!--  #ifdef  APP-PLUS -->
								<post :content="postContent" :detailLevel="0"></post>
								<!--  #endif -->
							</view>
						</view>
						<view v-else>
							<view class="blankIcon"></view>
							<view style="color:#AAAAAA;font-size:32rpx;text-align: center;font-weight: bold;">
								<view>您还没有笔记</view>
								<!-- <view v-else-if="!noFollowing&&noTimeline">你关注的用户暂时没有新动态</view> -->
							</view>
						</view>
					</view>
					<view v-show="currentTabIndex==1" style="padding:30rpx;padding-top:30rpx;">
						<view v-show="nftList&&nftList.length>0">
							<work-flow :flowList="nftList">
								<template v-slot='{item}'>
									<blur-work-small :brief="item"></blur-work-small>
								</template>
							</work-flow>
						</view>
						<view v-show="!nftList || nftList.length==0">
							<view class="blankIcon"></view>
							<view style="color:#AAAAAA;font-size:32rpx;text-align: center;font-weight: bold;">
								<view>您还没有尚品</view>
								<!-- <view v-else-if="!noFollowing&&noTimeline">你关注的用户暂时没有新动态</view> -->
							</view>
						</view>
					</view>
				</scroll-view>
		</view>
	</view>
</template>

<script>
	import headnavbar from "@/components/headnavbar/index.vue"
	import storeApi from "@/common/apis/store.js"
	import TabsInStore from "@/components/merchandise/TabsInStore"
	import post from "@/components/sns/post"
	import {
		snsImgs,
		calScrollHeight
	} from "@/common/common.js"
	import WorkFlow from "@/components/home/WorkFlow"
	import BlurWorkSmall from "@/components/home/BlurWorkSmall"
	import Follow from "@/components/mine/Follow"
	import SnsApi from "@/common/apis/sns.js"
	export default {
		data() {
			return {
				detail: {},
				isExtend: true,
				scrollViewHeight: 0,
				navList: [{
					name: '笔记',
					affix: ''
				}, {
					name: '尚品',
					affix: ''
				}],
				workPageNft: -1,
				workPagePost: -1,
				nftList: [],
				postList: [],
				nftLock: false,
				postLock: false,
				currentTabIndex: 0,
				delta0: 0,
				delta1: 0,
				briefblock: undefined,
				extendBrief: undefined,
				shrinkAni: undefined
			}
		},
		components: {
			TabsInStore,
			post,
			WorkFlow,
			BlurWorkSmall,
			Follow,
			headnavbar
		},
		onLoad(option) {
			this.detail.userCode = option.userCode
			this.loadHisPosts()
			this.loadHisNfts()
			this.loadArtistInfo()
		},
		methods: {
			loadArtistInfo() {
				storeApi.artistInfo({
					params: {
						userCode: this.detail.userCode
					}
				}).then(res => {
					if (res.userMarker && typeof res.userMarker === "string") {
						res.userMarker = JSON.parse(res.userMarker)
					}
					this.detail = res
					// #ifdef H5
					this.$nextTick(() => {

						this.briefblock = document.querySelector(".artistBrief")
						this.extendBrief = document.querySelector(".extendBrief")
						this.extendBriefWrap = document.querySelector(".extendBriefWrap")
						this.delta0 = this.briefblock.clientHeight
						this.delta1 = this.extendBrief.clientHeight
						this.extendBriefWrap.style.height = this.delta1 + 'px'
						this.scrollViewHeight = calScrollHeight(this.delta0 + 50, 1)
					})
					// #endif
				}).catch(err => {
					this.$u.toast(err)
				})
			},
			gotoRelationship(tabIndex) {
				let type = ''
				if (tabIndex === 0) {
					type = 'followings'
				} else if (tabIndex === 1) {
					type = 'followers'
				}
				uni.navigateTo({
					url: `/pages/sys/mine/relationship?mine=0&relation=${type}&userCode=${this.detail.userCode}`
				})
			},
			loadMore() {
				if (this.currentTabIndex === 0) {
					this.loadHisPosts()
				} else if (this.currentTabIndex === 1) {
					this.loadHisNfts()
				}
			},
			loadHisPosts() {
				if (this.postLock) return
				this.postLock = true
				this.workPagePost++
				storeApi.artistNoteInfo({
					params: {
						offset: this.workPagePost,
						pageSize: 10,
						userCode: this.detail.userCode
					}
				}).then(res => {
					this.navList[0].affix = '(' + res.recordsTotal + ')'
					if (!res.noteVoList || res.noteVoList.length < 10) {
						this.workPagePost--
					}
					let lastOffset = Math.floor(this.postList.length / 10)
					res.noteVoList.forEach(snsImgs)
					res.noteVoList.forEach(post => {
						post.forward = post.forwards
						post.comment = post.replys
						post.storeUp = post.storeup
						post.likes = post.stars
					})
					this.postList = this.postList.splice(0, lastOffset * 10).concat(res.noteVoList)
					this.postLock = false
				}).catch(err => {
					this.$u.toast(err)
				})
			},
			loadHisNfts() {
				if (this.nftLock) return
				this.nftLock = true
				this.workPageNft++
				storeApi.artistNftInfo({
					params: {
						offset: this.workPageNft,
						pageSize: 10,
						userCode: this.detail.userCode
					}
				}).then(res => {
					this.navList[1].affix = '(' + res.recordsTotal + ')'
					if (!res.nftVoList || res.nftVoList.length < 10) {
						this.workPageNft--
					}
					let lastOffset = Math.floor(this.nftList.length / 10)
					this.nftList = this.nftList.splice(0, lastOffset * 10).concat(res.nftVoList)
					this.nftLock = false
				}).catch(err => {
					this.$u.toast(err)
				})
			},
			handleScroll(e) {
				let deltaY = e.detail.deltaY
				let isExtend = deltaY > 0 ? true : false
				if (isExtend === false) {
					this.toggleExtend(isExtend)
				}
			},
			toggleExtend(isExtend) {
				if (isExtend !== this.isExtend) {
					this.isExtend = !this.isExtend
					this.shrinkAni = uni.createAnimation({
						duration: 500,
						timingFunction: 'ease',
					})
					this.shrinkAni.height(this.isExtend ? this.delta1 : 0).step()
					this.shrinkAni = this.shrinkAni.export()
				} else return
				let delay = this.isExtend ? 1000 : 0
				setTimeout(() => {
					let delta = this.isExtend ? this.delta0 : this.delta0 - this.delta1
					this.scrollViewHeight = calScrollHeight(delta + 60, 1)
				}, delay)
			},
			tabChange(index) {
				this.currentTabIndex = index
			},
			customGoBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			gotoStore() {
				uni.navigateTo({
					url: `/pages/sys/merchandise/store?userCode=${this.detail.userCode}`
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

	.shareIcon {
		background-image: url('@/static/common/img/merchandise/detail/share.png')
	}

	.artistBrief {
		padding: 0 40rpx;
		background-color: #2A2A34;
		border-top-left-radius: 56rpx;
		border-top-right-radius: 56rpx;
		overflow: visible;

		.rowAvatar {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 176rpx;
			position: relative;
			overflow: visible;
			z-index: 999;

			.avatar {
				width: 176rpx;
				height: 176rpx;
				position: absolute;
				left: 30rpx;
				top: -30rpx;
			}

			.social {
				display: flex;
				justify-content: space-around;
				width: calc(100% - 220rpx);

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;

					.num {
						color: #FFFFFF;
						font-size: 36rpx;
						font-weight: bold;
					}

					.sub {
						color: #999999;
						font-size: 24rpx;
					}
				}

			}
		}

		// .rowProfile{
		// 	display:flex;
		// 	justify-content: space-between;
		.profile {
			.nickName {
				font-size: 40rpx;
				margin-bottom: 20rpx;
			}

			.blockchain {
				color: #999999;
				font-size: 24rpx;
			}
		}

		// }
		.rowBrief {
			color: #D8D8D8;
			font-size: 24rpx;
			margin-bottom: 30rpx;
		}

		.gotoStore {
			background-image: url('@/static/common/img/index/recommend/colorfulbg.png');
			border-radius: 36rpx;
			height: 80rpx;
			background-size: 100% 100%;
			font-size: 36rpx;
			text-align: center;
			line-height: 80rpx;
		}
	}

	.extendBriefWrap {
		overflow: hidden;
	}
</style>
