<template>
	<view class="wrap">
		<!-- #ifdef APP-PLUS -->
		<view class="fixedHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			分享<view style="color: #7A83D2;"></view>
		</view>
		<view style="height: 160rpx;"></view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view class="pageHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			分享<view style="color: #7A83D2;"></view>
		</view>
		<!-- #endif -->
		<view style="padding:0 50rpx">
			<scroll-view scroll-y="true" style="height:calc( 100vh - 100rpx );">
				<view>
					<view style="position:relative">
						<view style="position:absolute;top:0;width:100%;" class="flex-row-center-center">
							<view style="width:580rpx;height:500rpx;">
								<view class="main" style="border-bottom-left-radius: 0;border-bottom-right-radius: 0;"
									:style="{backgroundImage:`url(${imgBaseUrl}${nftDetail.nftImg}${imgSuffix})`}">
									<view class="clip clipLoaded"
										style="height:140rpx;border:none;border-bottom-left-radius: 0;border-bottom-right-radius: 0;"
										:style="{'--bgImg':`url(${imgBaseUrl}${nftDetail.nftImg}${imgSuffix})`}">
									</view>
									<view style="height:140rpx;" class="workBrief">
										<view class="briefWrap" style="width:100%;height:100%;padding-left: 24rpx;padding-right: 48rpx;text-shadow:1px 1px 1px rgba(0,0,0,0.3)">
											<view  class="flex-col-around-start" style="height:100%;padding:10rpx 0;">
												<view style="font-size:32rpx;">{{ nftDetail.nftName }}</view>
												<view class="flex-row-between-center" style="width:100%;">
													<view style="height:40rpx;line-height:40rpx;font-size:24rpx;" class="bibtn button"> 限量 {{ nftDetail.issueCount }}</view>
													<view style="font-size:32rpx;font-weight: bold;">￥{{ cent2yuan(nftDetail.price) }}</view>
												</view>
											</view>
										</view>		
									</view>
								</view>
							</view>
						</view>
						<view style="height:100rpx;"></view>
						<view style="height:400rpx;background-color: #2A2A34;border-top-left-radius: 40rpx;border-top-right-radius: 40rpx;"></view>
					</view>
					<view style="height:250rpx;background-color:#35353F;border-bottom-left-radius: 40rpx;border-bottom-right-radius: 40rpx;">
						<view style="margin:0 40rpx;">
							<view style="padding:30rpx 0rpx 0rpx;">
								<span style="font-size: 28rpx;font-family:SimSun;font-style: italic;font-weight:bold;color: #FFFFFF;line-height: 16px;">推荐文案</span>
							</view>
							<scroll-view scroll-y style="height: 120rpx;">
								<view class="postEdit">
									<u-input class="input" placeholder="请输入文案" style="font-size: 10px;"
										v-model="contentDesc" label-width="0" type="textarea" maxlength="100"
										:border-bottom="false" :clearable="false" @input="debounceWxShare">
									</u-input>
								</view>
							</scroll-view>
							<view style="color:#7A83D2;text-align: end; ">
								<u-icon name="plus-circle-fill"></u-icon>
								<span style="font-size: 12px;font-family:SimSun" @click.stop="copyWriteList">文案模板</span>
							</view>
						</view>
					</view>
				</view>
				
				<view style="margin-top: 40rpx;">
					<view style="height: 60rpx;font-size: 12px;padding: 0% 43%;">分享至</view>
					<view class="flex-row-around-center">
						<view class="share" @click="share('0')">
							<u-image shape="circle" width="96rpx" height="96rpx" style="border:1px solid #6B7280;"
								src="@/static/common/img/sns/wechat.png"></u-image>
							<view style="font-size: 12px;margin-top: 20rpx;text-align: center;">微信</view>
						</view>
						<view class="share" @click="share('1')">
							<u-image shape="circle" width="96rpx" height="96rpx" style="border:1px solid #6B7280;"
								src="@/static/common/img/sns/cmny.png"></u-image>
							<view style="font-size: 12px;margin-top: 20rpx;text-align: center;">社区</view>
						</view>
						<view class="share">
							<u-image shape="circle" width="96rpx" height="96rpx" style="border:1px solid #6B7280;"
								@click="share('2')" src="@/static/common/img/sns/link.png"></u-image>
							<view style="font-size: 12px;margin-top: 20rpx;">复制链接</view>
						</view>
					</view>
				</view>

			</scroll-view>
			<u-mask :show="visible" @click="show = false" :mask-click-able="true" :maskClickAble="true" :duration="400"
				:zoom="true" :custom-style="{background: 'rgba(0, 0, 0, 0.5)'}">
				<view class="warp">
					<view class="rect" @tap.stop>
						<u-image width="100%" height="35%" src="@/static/common/img/sns/guideShare1.png"></u-image>
						<view class="button" style="margin: 10% 40%;width: 160rpx;height: 70rpx;line-height:70rpx"
							@tap="close">
							<span style="text-align: center;font-size: 13px; ">知道了</span>
						</view>
					</view>
				</view>
			</u-mask>
		</view>
	</view>
</template>

<script>
	import SnsApi from "@/common/apis/sns.js"
	import MerchandiseApi from "@/common/apis/merchandise.js"
	import selectTopics from "@/components/sns/selectTopics"
	import CustomConfirm from "@/components/sns/CustomConfirm"
	import ShareSns from "@/components/merchandise/ShareSns"
	import BlurWorkBig from "@/components/home/BlurWorkBig"
	import imgLoading from '@/common/mixins/imgLoading'
	import Carousel from "@/components/home/Carousel"
	import {
		cent2yuan
	} from '@/common/common.js'
	import jlConfig from '@/common/utils/jlConfig.js'
	import LoginApi from "@/common/apis/login.js"
	// #ifdef H5
	var wx = require('jweixin-module')
	// #endif
	import uQRCode from '@/uni_modules/Sansnn-uQRCode/js_sdk/u-qrcode'


	export default {
		data() {
			return {
				postForm: {
					title: 'title',
					content: '',
					imgs: '',
					subjectCode: ''
				},
				imgList: [],
				allCount: 5,
				savedCount: 0,
				selectTopics: false,
				savedTopics: [],
				repostType: '',
				nftDetail: {},
				my: {},
				withTopic: undefined,
				wxsharetip: false,
				visible: false,
				contentDesc: "",
				wxShareTimer:undefined
			}
		},
		components: {
			selectTopics,
			CustomConfirm,
			ShareSns,
			Carousel,
			BlurWorkBig
		},
		props: {
			brief: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		onShow: function() {
			var sharePages = getCurrentPages();
			var currPage = sharePages[sharePages.length - 1]; //当前页面
			var info = currPage.info;
			this.contentDesc = info;
			this.debounceWxShare()
		},
		onLoad(option) {

			this.withTopic = option.withTopic
			if (this.withTopic) {
				this.savedTopics.push({
					subjectCode: option.topicCode,
					subjectName: option.topicName,
				})
			}
			this.repostType = option.repostType
			this.nftDetail.nftCode = option.nftCode
			SnsApi.myInfo().then(res => {
				this.my = res
			}).catch(err => {
				this.$u.toast(err)
			})
			if (this.repostType === 'merchandise') {
				MerchandiseApi.info({
					params: {
						nftCode: this.nftDetail.nftCode
					}
				}).then(res => {
					this.nftDetail = res
				}).catch(err => {
					this.$u.toast(err)
				})
			}
		},
		watch: {
			brief: {
				immediate: true,
				deep: true,
				handler() {
					this.checkImageLoad(this.brief.nftImg)
				}
			}
		},
		mixins: [imgLoading],
		mounted() {

		},
		methods: {
			cent2yuan,
			customGoBack() {
				uni.navigateBack({
					delta: 1
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
			close() {
				this.visible = false;
			},
			copyWriteList() {
				uni.navigateTo({
					url: '/pages/sys/sns/copyWriteList'
				});
			},
			debounceWxShare(){
				clearTimeout(this.wxShareTimer)
				this.wxShareTimer = setTimeout(()=>{
					this.wxshare()
				},800)
			},
			wxshare() {
				LoginApi.wxConfig().then(() => {
					let data = {
						desc: this.nftDetail.nftName,
						title: this.contentDesc ? this.contentDesc : '分享尚品',
						link: `${this.hostUrl}/#/pages/sys/merchandise/detail?nftCode=${this.nftDetail.nftCode}`,
						imgUrl: `${this.imgBaseUrl}${this.nftDetail.nftImg}${this.imgSuffix}`,
					}
					console.log('设置分享内容参数', data)
					wx.updateAppMessageShareData({
						...data,
						success: () => {
							// this.$u.toast("设置分享内容参数成功updateAppMessageShareData")
						}
					})
					wx.updateTimelineShareData({
						...data,
						success: () => {
							// this.$u.toast("设置分享内容参数成功updateTimelineShareData")
						}
					})
				}).catch(() => {
					this.$u.toast("授权失败，请稍后再试")
				});

			},
			share(item) {
				if (item == '0') {
					this.visible = true;
					this.wxshare()
				}
				if (item == '1') {
					uni.navigateTo({
						url: '/pages/sys/sns/publishShare?repostType=' + this.repostType + '&nftCode=' + this
							.nftDetail.nftCode + '&contentDesc=' + this.contentDesc
					});
				}
				if (item == '2') {
					var url = window.location.href.split('#')[0] + `#/pages/sys/merchandise/detail?nftCode=` + this
						.nftDetail.nftCode
					this.handleCopy(url);
				}
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

	.postEdit {
		padding-top: 2rpx;
		padding: 0 !important;

		/deep/ .input {
			.u-input__input {
				color: #fff !important;
				font-size: 12px;
			}
		}


	}


	.goods {
		height: auto;
		width: 100%;
		background-color: #35353F;
		border-top-right-radius: 40rpx;
		border-top-left-radius: 40rpx;

	}

	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}


	.rect {
		width: 100%;
		height: 100%;
	}
</style>
