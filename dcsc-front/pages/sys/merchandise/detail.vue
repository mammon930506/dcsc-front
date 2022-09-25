<template>
	<view class="wrap">
		<!-- #ifdef H5 -->
		<view class="pageHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="gotoList"></u-icon>
			<view v-if="inMine">尚品详情</view>
			<view v-if="!inMine" style="width:100rpx;display: flex;justify-content: space-between;">
				<view @tap="handleFav" :class="[detail.isStore?'redHeart':'normalHeart']"
					style="width:40rpx;height:40rpx;background-size:100% 100%"></view>
				<view @tap="handleShare" class="shareIcon" style="width:40rpx;height:40rpx;background-size:100% 100%">
				</view>
			</view>
			<view v-else></view>
		</view>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS -->
		<view class="fixedHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="gotoList"></u-icon>
			<view v-if="inMine">尚品详情</view>
			<view v-if="!inMine" style="width:100rpx;display: flex;justify-content: space-between;">
				<view @tap="handleFav" :class="[detail.isStore?'redHeart':'normalHeart']"
					style="width:40rpx;height:40rpx;background-size:100% 100%"></view>
				<view @tap="handleShare" class="shareIcon" style="width:40rpx;height:40rpx;background-size:100% 100%">
				</view>
			</view>
			<view v-else></view>
		</view>
		<view style="height: 160rpx;"></view>
		<!-- #endif -->
		<view>
			<scroll-view scroll-y="true" :style="{height:scrollViewHeight}">
				<view style="padding:0 40rpx 40rpx;position:relative">
					<view class="preview" @tap="handleZoom"
						:style="{backgroundImage:`url(${imgBaseUrl}${detail.nftImg||detail.nftImgs}${imgSuffix})`}">
						<view class="iconGroup">
							<view v-if="detail.nftType==='2'" class="blindIcon centercover"></view>
						</view>
						<view class="zoombg">
							<view class="zoom"></view>
						</view>
					</view>
					<view class="card"
						style="border-bottom-right-radius:0rpx;border-bottom-left-radius:0rpx;margin-bottom:2rpx">
						<view v-if="!inMine" style="color:#F87171;font-size:42rpx;">¥ {{ cent2yuan(detail.price) }}
						</view>
						<view class="title flex-row-between-center">
							<view>{{ detail.nftName }}</view>
							<view v-if="inMine">
								<view class="graLabel" style="margin-bottom: 10rpx;"><span class="hotTitle"
										style="font-size:24rpx;"><span class="innerHotTitle"
											style="font-size:24rpx;background-color: #2A2A34;">{{ detail.nftChainHash?'已上链':'上链中' }}</span></span>
								</view>
								<view class="graLabel"><span class="hotTitle" style="font-size:24rpx;"><span
											class="innerHotTitle"
											style="font-size:24rpx;background-color: #2A2A34;">海峡链</span></span></view>
							</view>
						</view>
					</view>
					<view class="card"
						style="border-top-right-radius:0rpx;border-top-left-radius:0rpx;font-size:24rpx;">
						<view v-if="!inMine" class="flex-row-between-center">
							<view style="color:#AAAAAA;display:flex" @tap="gotoArtistMain(detail.userCode)">
								<view
									style="width:40rpx;height:40rpx;border-radius:20rpx;background-size:100% 100%;margin-right:10rpx;"
									:style="{backgroundImage:`url(${imgBaseUrl}${detail.header}${imgSuffix})`}"></view>
								{{ detail.nickName }}
							</view>
							<view style="color:#F87171">发行数量{{ detail.issueCount }}</view>
						</view>
						<view v-if="inMine" class="flex-row-end-center" style="width:100%">
							<view @tap="handleShare" class="shareIcon"
								style="width:30rpx;height:30rpx;background-size:100% 100%;margin-right:20rpx;"></view>
							<u-icon @tap="handleSave" size="40" name="download"></u-icon>
						</view>
					</view>
					<view v-if="!inMine" class="card">
						<view class="title">认证信息</view>
						<view class="authRow">
							<view class="authTitle">用户HASH：</view>
							<view class="authContent">{{ detail.chainWallet||detail.userHash }}</view>
							<view class="authCopy" @tap="handleCopy(detail.chainWallet||detail.userHash)">
								<view></view>
							</view>
						</view>
						<!-- 		<view class="authRow">
							<view class="authTitle">作品HASH：</view>
							<view class="authContent">zp33333331345667u6149999999999999999999999999</view>
							<view class="authCopy">
								<view @tap="handleCopy(detail.nftHash)"></view>
							</view>
						</view>
						<view class="authRow">
							<view class="authTitle">认证网络：</view>
							<view class="authContent">BSN</view>
							<view class="authCopy"></view>
						</view> -->
					</view>
					<view v-if="inMine" class="card">
						<view class="authRow">
							<view class="authTitle inMineStyle">尚品HASH：</view>
							<view class="authContent inMineStyle">{{ detail.nftChainHash }}</view>
							<view class="authCopy" @tap="handleCopy(detail.nftChainHash)">
								<view></view>
							</view>
						</view>
						<view class="authRow">
							<view class="authTitle inMineStyle">收藏者：</view>
							<view class="authContent inMineStyle">{{ detail.nickName }}</view>
						</view>
						<view class="authRow">
							<view class="authTitle inMineStyle">发行时间：</view>
							<view class="authContent inMineStyle">
								{{ $u.timeFormat(detail.publishingDate,'yyyy-mm-dd hh:MM:ss') }}
							</view>
						</view>
						<view v-if="detail.nftChainHash" class="authRow">
							<view class="authTitle inMineStyle">上链时间：</view>
							<view class="authContent inMineStyle">
								{{ $u.timeFormat(detail.createdDate,'yyyy-mm-dd hh:MM:ss') }}
							</view>
						</view>
					</view>
					<view v-if="!inMine" class="card">
						<view class="flex-row-between-center">
							<view class="title">最近购买</view>
							<view class="flex-row-between-center" @tap="showRecentBuyers">
								<view v-for="header in recentAbbrList" class="centercover"
									style="width:40rpx;height:40rpx;"
									:style="{backgroundImage:`url(${imgBaseUrl}${header.header}${imgSuffix})`}">
								</view>
								<view>
									<u-icon name="arrow-right"></u-icon>
								</view>
							</view>
						</view>
					</view>
					<!--					<view v-if="!inMine&&detail.nftType==='2'" class="card">-->
					<!--						<view class="title" style="margin-bottom: 40rpx;">盲盒内容</view>-->
					<!--						<view v-for="(chosen,chosenIndex) in detail.sub" style="margin:20rpx 0">-->
					<!--							<blind-brief :isEdit="false" :chosen="chosen" :chosenIndex="chosenIndex" @showChosenDel="showChosenDel" @handleBlindIssueCount="handleBlindIssueCount"></blind-brief>-->
					<!--						</view>-->
					<!--					</view>-->
					<view class="card">
						<view class="title">作品介绍</view>
						<view class="article">
							{{ detail.description }}
						</view>
					</view>
					<view v-if="!inMine" class="card">
						<view class="title">购买须知</view>
						<view class="article">
							数字尚品为虚拟数字尚品，而非实物，仅限实名认证为年满14周岁的中国大陆用户购买。数字尚品的版权由发行方或原创者拥有，除另行取得版权拥有者书面同意外，用户不得将数字尚品用于任何商业用途。本尚品一经售出，不支持退换。本尚品源文件不支持本地下载。请勿对数字尚品进行炒作、场外交易、欺诈，或以任何其他非法方式进行使用。为保证您顺利获取数字尚品，请您先完成实名认证，再进行购买。
						</view>
					</view>
					<view v-if="inMine" class="card">
						<view class="article">
							提示: 本数字尚品的知识产权或其他权益属发行方或权力人所有,除另行取得发行方或权利人授权外，您不得将数字尚品用于任何商业用途。请远离非理性炒作,防范欺诈风险。
						</view>
					</view>
					<custom-popup ref="sharePop">
						<template v-slot>
							<share-sns @closeShare="closeShare" :brief="detail"></share-sns>
						</template>
					</custom-popup>
				</view>
			</scroll-view>
		</view>
		<view v-if="!inMine" style="position: fixed;bottom:0;width:100%">
			<view style="padding:20rpx;background-color:#18181c;border-top:2rpx solid rgba(255,255,255,0.3);">
				<view v-if="detail.nftStock>0" class="button" @click="gotoSubmitOrder">立即购买</view>
				<view v-else class="soldoutButton">已售罄</view>
			</view>
			<view v-if="!ifrealname" class="authMask">
				<view style="font-size:30rpx;color:#D8D8D8;margin-top:90rpx;">为了保证您的权益，请先完成
					<span v-if="iflogin&&!ifrealname" style="color:#F87171;font-weight:bold"
						@tap="realNameAuth">实名认证</span>
					<span v-if="!iflogin" style="color:#F87171;font-weight:bold" @tap="gotoLogin">登录</span>
				</view>
			</view>
		</view>
		<custom-confirm ref="recentBuyers" :showHandler="false" :showBtns="false" :touchmoveClose="false">
			<view class="flex-row-between-center" style="padding:30rpx 0;">
				<view></view>
				<view style="font-size:32rpx;">最近购买</view>
				<u-icon @tap="closeRecentBuyers" name="close-circle-fill" style="font-size: 40rpx;opacity: 0.8;">
				</u-icon>
			</view>
			<view>
				<scroll-view scroll-y="true" @scrolltolower="queryRecentBuyers"
					style="height:700rpx;margin-bottom:20rpx;">
					<view class="card flex-row-between-center" style="background-color: #18181c;border-radius:30rpx"
						v-for="item in recentBuyerList">
						<view class="flex-row-start-center">
							<view @tap="checkSetOpen(item)" class="centercover"
								style="width:70rpx;height:70rpx;margin-right:20rpx;"
								:style="{backgroundImage:`url(${imgBaseUrl}${item.header}${imgSuffix})`}"></view>
							<view class="flex-col-around-start">
								<view style="color:#F3F4F6;font-size: 24rpx;">{{ item.nickName }}</view>
								<view style="color:#AAAAAA;font-size: 20rpx;">{{ item.orderType }}</view>
							</view>
						</view>
						<view class="flex-col-around-end">
							<view style="color:#F3F4F6;font-size: 24rpx;">¥ {{ cent2yuan(item.payAmount) }}</view>
							<view style="color:#AAAAAA;font-size: 20rpx;">
								{{ $u.timeFormat(item.updateDate, 'yyyy-mm-dd hh:MM:ss') }}
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</custom-confirm>
		<custom-confirm ref="setOpen" @confirmOk="setIsOpen(1)" @confirmCancel="setIsOpen(0)" :showHandler="false"
			:showBtns="true" :touchmoveClose="false" :showMask="false" :confirmStyle="{backgroundColor:'#1A1A1A'}"
			:cancelStyle="{backgroundColor:'#767676'}" :btnGroupStyle="{padding:'0 60rpx 60rpx'}" :cancelText="'拒绝'"
			:ok-text="'同意'">
			<view style="font-size:32rpx;text-align: left;padding:50rpx 0 30rpx">公开展示您的头像、昵称及购买信息</view>
			<view style="font-size:24rpx;color:#AAAAAA;text-align: left;line-height:30rpx">
				用于在商品详情页展示您的购买信息，关闭后将不能从最近购买中访问您的个人主页信息</view>
			<view class="card" style="margin:30rpx 0;border-radius: 32rpx">
				<view class="flex-row-start-center">
					<view class="centercover" style="width:70rpx;height:70rpx;margin-right:20rpx"
						:style="{backgroundImage:`url(${imgBaseUrl}${myInfo.header}${imgSuffix})`}"></view>
					<view class="flex-col-around-start">
						<view style="color:#F3F4F6;font-size:24rpx;">{{ myInfo.nickName }}</view>
						<view style="color:#AAAAAA;font-size:20rpx">获取您的购买信息</view>
					</view>
				</view>
			</view>
		</custom-confirm>
	</view>
</template>

<script>
	import MerchandiseApi from "@/common/apis/merchandise.js"
	import MineApi from "@/common/apis/mine.js"
	import LoginApi from "@/common/apis/login.js"
	import CustomPopup from "@/components/merchandise/CustomPopup"
	import ShareSns from "@/components/merchandise/ShareSns"
	import CustomConfirm from "@/components/sns/CustomConfirm"
	import {
		calScrollHeight
	} from "@/common/common.js"
	import BlindBrief from '@/components/mine/BlindBrief'
	import {
		cent2yuan
	} from '@/common/common.js'
	export default {
		data() {
			return {
				nftCode: '',
				detail: {},
				hearted: false,
				ifrealname: true,
				iflogin: true,
				recentBuyersWorkPage: -1,
				recentBuyerList: [],
				recentAbbrList: [],
				scrollViewHeight: 0,
				inMine: false,
				id: '',
				myInfo: {}
			}
		},
		components: {
			CustomPopup,
			ShareSns,
			CustomConfirm,
			BlindBrief,
		},
		onLoad(option) {
			this.inMine = option.inMine
			this.id = option.id
			this.scrollViewHeight = this.inMine ? calScrollHeight(110) : calScrollHeight(260)
			this.nftCode = option.nftCode
			if (!this.inMine) this.queryRecentBuyers()
			
		},
		onShow() {
			this.queryContent();
			this.checkIfRealName();
		},
		methods: {
			cent2yuan,
		    async saveHistory(title){
				MineApi.saveHistory({
					params: {
						browseType:'3',
						browseCode:this.nftCode,
						title:title
					}
				}).then(res => {
					
				}).catch(err => {
					//this.$u.toast(err)
				})
			},
			checkIfRealName() {
				uni.showLoading({
					title:'正在查询...',
					mask:true
				})
				LoginApi.ifrealname().then(res => {
					this.iflogin = Number(res.iflogin)
					this.ifrealname = Number(res.ifrealname)
					if (this.iflogin) {
						MineApi.content({}).then(res => {
							this.myInfo = res
						}).catch(err => {
							this.myInfo = {}
							this.$u.toast(err)
						})
					}
					uni.hideLoading()
				}).catch(err => {
					uni.hideLoading()
					this.$u.toast(err)
				})
			},
			setIsOpen(isOpen) {
				LoginApi.updateUserIsOpen({
					params: {
						isOpen
					}
				}).then(res => {
					if (!this.inMine) {
						this.recentBuyersWorkPage = -1
						this.recentBuyerList = []
						this.queryRecentBuyers()
					}
					this.$u.toast('设置成功')
				}).catch(err => {
					this.$u.toast(err)
				})
			},
			showRecentBuyers() {
				this.recentBuyersWorkPage = -1
				this.recentBuyerList = []
				this.queryRecentBuyers()
				this.$refs.recentBuyers.showup()
				this.$refs.setOpen.showup()
			},
			closeRecentBuyers() {
				this.$refs.recentBuyers.close()
				this.$refs.setOpen.close()
			},
			queryRecentBuyers() {
				this.recentBuyersWorkPage++
				MerchandiseApi.recentBuyers({
					params: {
						pageSize: 10,
						offset: this.recentBuyersWorkPage,
						nftCode: this.nftCode
					}
				}).then(res => {
					if (!res.data || res.data.length < 10) {
						this.recentBuyersWorkPage--
					}
					let lastOffset = Math.floor(this.recentBuyerList.length / 10)
					this.recentBuyerList = this.recentBuyerList.splice(0, lastOffset * 10).concat(res.data)
					if (this.recentBuyerList.length < 3) {
						this.recentAbbrList = this.recentBuyerList.concat()
					} else {
						this.recentAbbrList = this.recentBuyerList.slice(0, 3)
					}
				}).catch(err => {
					this.$u.toast(err)
				})
			},
			queryContent() {
				if (this.inMine) {
					MineApi.myPurchasesInfo({
						params: {
							id: this.id
						}
					}).then(res => {
						if(res.nftName!==undefined){
							this.saveHistory(res.nftName);
						}
						this.detail = res
					}).catch(err => {
						this.$u.toast(err)
					})
				} else {
					MerchandiseApi.info({
						params: {
							nftCode: this.nftCode
						}
					}).then(res => {
						if(res.nftName!==undefined){
							this.saveHistory(res.nftName);
						}
						this.detail = res
					}).catch(err => {
						this.$u.toast(err)
					})
				}
			},
			handleFav() {
				MerchandiseApi.storeUp({
					params: {
						nftCode: this.detail.nftCode
					}
				}).then(res => {
					this.detail.isStore = res.isStore
				}).catch(err => {
					this.$u.toast(err)
				})
			},
			handleCopy(data) {
				uni.setClipboardData({
					data,
					success: function() {
						console.log('success');
					}
				})
			},
			handleZoom() {
				let url = this.imgBaseUrl + (this.detail.nftImg || this.detail.nftImgs)
				uni.previewImage({
					urls: [url],
					success: function() {
						console.log('success');
					}
				});
			},
			handleShare() {
				// this.$refs.sharePop.show = true
				uni.navigateTo({
					url: `/pages/sys/sns/publishPost?repostType=merchandise&nftCode=${this.detail.nftCode}`
				})
			},
			handleSave() {
				uni.navigateTo({
					url: `/pages/sys/mine/transaction/myPurchasesShare?id=${this.id}`
				})
			},
			closeShare() {
				this.$refs.sharePop.show = false
			},
			gotoLogin() {
				uni.navigateTo({
					url: "/pages/sys/login/index"
				})
			},
			realNameAuth() {
				uni.navigateTo({
					url: "/pages/sys/mine/auth/authenticate"
				})
			},
			gotoList() {
				let pages = getCurrentPages()
				if(!pages||pages.length===1){
					uni.switchTab({
						url: "/pages/sys/home/index",
					})
					return
				}
				uni.navigateBack({
					delta: 1
				})
			},
			checkSetOpen(item) {
				if (item.isOpen === '0') {
					return this.$u.toast('该用户已设置不公开信息')
				}
				this.gotoArtistMain(item.purchaser)
			},
			gotoArtistMain(userCode) {
				uni.navigateTo({
					url: `/pages/sys/merchandise/artistMain?userCode=${userCode}`
				})
			},
			gotoSubmitOrder() {
				uni.navigateTo({
					url: `/pages/sys/order/submit?nftCode=${this.detail.nftCode}`
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

	.shareIcon {
		background-image: url('@/static/common/img/merchandise/detail/share.png')
	}

	.card {
		background-color: #2A2A34;
		border-radius: 56rpx;
		padding: 24rpx 36rpx;
		width: 100%;
		margin-bottom: 20rpx;

		.title {
			color: #D8D8D8;
			font-size: 32rpx;
		}

		.article {
			margin-top: 20rpx;
			color: #AAAAAA;
			font-size: 28rpx;
		}
	}

	.authRow {
		display: flex;
		justify-content: flex-start;
		font-size: 28rpx;
		margin-top: 20rpx;

		.inMineStyle {
			color: #AAAAAA !important;
		}

		.authTitle {
			width: 30%;
			color: #666666;
		}

		.authContent {
			width: 60%;
			color: #AAAAAA;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.authCopy {
			width: 10%;

			view {
				width: 40rpx;
				height: 35rpx;
				background-image: url('@/static/common/img/merchandise/detail/copy.png');
				background-size: 100% 100%;
			}
		}
	}

	.button {
		color: #ffffff;
		font-size: 32rpx;
		height: 120rpx;
		line-height: 120rpx;
		text-align: center;
		background-size: 100% 100%;
		background-image: url("@/static/common/img/login/Button@3x.png");
	}

	.authMask {
		position: absolute;
		bottom: 0rpx;
		left: 0rpx;
		width: 100%;
		height: 290rpx;
		background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0%, rgba(0, 0, 0, 0.7) 50%, rgba(255, 255, 255, 0.7) 100%);
		border-top-left-radius: 56rpx;
		border-top-right-radius: 56rpx;
		text-align: center;
	}


	.graLabel {
		border-radius: 20rpx;
		padding: 2rpx 20rpx;
		border: 1rpx solid rgba(255, 255, 255, 0.3);
	}
</style>
