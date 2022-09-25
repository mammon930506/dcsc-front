<template>
	<view style="height:calc( 100vh - 210rpx );position:relative;margin: 40rpx;box-sizing:border-box">
		<view id="sharePoster" class="main" :style="{backgroundImage:`url(${imgBaseUrl}${shareContent.imgUrl}${imgSuffix})`,borderRadius:isCreating?'0':'56rpx'}">
			<view class="clip" :class="{clipLoaded:imgLoaded?true:false}" :style="{'--bgImg':`url(/${shareContent.imgUrl})`,borderBottomLeftRadius:isCreating?'0':'56rpx',borderBottomRightRadius:isCreating?'0':'56rpx'}">
			</view>
			<view class="workBrief">
				<view class="briefWrap"
					style="padding-left: 30rpx;padding-right: 20rpx;text-shadow:1px 1px 1px rgba(0,0,0,0.3);display:flex;justify-content: space-between;">
					<view style="display: flex;flex-direction: column;justify-content: space-between;">
						<view v-if="shareType==='merchandise'" style="color:#F3F4F6;font-size:20rpx;line-height:40rpx;border-bottom:1rpx solid #F3F4F6">
							发现一张超棒的数字尚品！快来看看！</view>
						<view v-else-if="shareType==='post'" style="position:relative;display:flex;align-items: center;">
							<view  style="width:80rpx;height:80rpx;border-radius:40rpx;background-size:100% 100%;margin-right:10rpx;"
								:style="{backgroundImage:`url(${imgBaseUrl}${brief.header}${imgSuffix})`}"></view>
							<view>
								<view style="color:white;font-size:32rpx" >{{ brief.nickName }}</view>
								<view class="nowrapellipsis" style="width:340rpx;color:#white;font-size:20rpx;">{{ brief.content }}</view>
							</view>
						</view>
						<view style="font-size:30rpx;">
							<view>扫描打开APP</view>
							<view>探索青春数据尚品</view>
						</view>
					</view>
					<!-- <u-image src="/static/common/img/qrcode.jpg" width="160" height="160" shape="circle"></u-image> -->
					<!-- <view style="width:160rpx;height:160rpx;background-color:white"></view> -->
					<view style="width:160rpx;height:160rpx;border-radius:30rpx;overflow: hidden;">
						<canvas id="qrcode" canvas-id="qrcode"></canvas>
					</view>
				</view>
			</view>
		</view>
		<view style="position:absolute;bottom:20rpx;width:100%;">
			<view style="display:flex;justify-content: space-between;margin-bottom:90rpx">
				<view v-for="(item,index) in shareOptions"
					style="display:flex;flex-direction: column;align-items: center;" @tap="handleShare(index)">
					<view :class="[item.cls]" style="width:80rpx;height:80rpx;background-size:100% 100%"></view>
					{{ item.title }}
					<!-- :style="{backgroundImage:`url(${item.src})`}" -->
				</view>
			</view>
			<view @tap="closeShare"
				style="background-color:#18181c;width:300rpx;height:70rpx;border-radius: 20rpx;font-size:32rpx;line-height:65rpx;text-align: center;position:relative;margin:0 auto">
				取消</view>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	import LoginApi from "@/common/apis/login.js"
	import SnsApi from "@/common/apis/sns.js"
	// #ifdef H5
	var wx = require('jweixin-module')
	// #endif
	import uQRCode from '@/uni_modules/Sansnn-uQRCode/js_sdk/u-qrcode'
	import html2canvas from 'html2canvas'
	import {base64ToBlob} from "@/common/common.js"
	export default {
		props: {
			brief: {
				type: Object,
				default () {
					return {}
				}
			},
			shareType:{
				type:String,
				default: "merchandise"
			}
		},
		data() {
			return {
				// brief: {
				// 	nftImg: "https://cdn.uviewui.com/uview/swiper/1.jpg",
				// 	nftName: "我是作品",
				// 	nickName: "我是艺术家",
				// 	price: "999"
				// }
				shareOptions: [{
						title: '社区',
						cls: 'shareicon1'
					},
					{
						title: '微信',
						cls: 'shareicon2'
					},
					{
						title: '朋友圈',
						cls: 'shareicon3'
					},
					{
						title: '微博',
						cls: 'shareicon4'
					},
					{
						title: 'QQ',
						cls: 'shareicon5'
					},
					{
						title: '复制链接',
						cls: 'shareicon6'
					}
				],
				qrSize: uni.upx2px(160),
				qrCodeUrl: '',
				isCreating:false,
				shareContent:{
					url:"",
					imgUrl:""
				},
				creatingPoster:false
			}
		},
		mounted() {
			this.prepareData()
			this.generateQRCode()
			LoginApi.wxConfig().then(() => {
				let data = {
					title: this.shareContent.title, // 分享标题
					link: this.shareContent.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: this.shareContent.imgUrl, // 分享图标
				}
				console.log('设置分享内容参数', data)
				wx.updateAppMessageShareData({
					...data,
					desc: this.shareContent.content, // 分享描述
					success: function() {
						this.$u.toast("分享成功")
					}
				})
				wx.updateTimelineShareData({
					...data,
					success: function() {
						this.$u.toast("分享成功")
					}
				})
			}).catch(() => {
				this.$u.toast("授权失败，请稍后再试")
			})
			// {
			//         "signature": "43983c7831a0bd0e15e543b95513637b50b2a5c7",
			//         "appId": "wx8572527a74abf766",
			//         "nonceStr": "qk4yussblpbvvqgb",
			//         "timestamp": "1657627827"
			//     }
		},
		methods: {
			prepareData(){
				if(this.shareType==="merchandise"){
					this.shareContent.url = window.location.href
					this.shareContent.imgUrl = this.brief.nftImg
					this.shareContent.title = this.brief.nftName
					this.shareContent.content = '尚品描述：'+this.brief.description
				}else if(this.shareType==="post"){
					this.shareContent.url = window.location.href.split('#')[0]+`#/pages/sys/sns/postDetail?postCode=${this.brief.noteCode}`
					this.shareContent.imgUrl = (this.brief.imgCount>0&&this.brief.realImgs[0]) || "static/common/img/mine/publish/inviteposter.jpg"
					this.shareContent.title = this.brief.nickName+'的帖子'
					this.shareContent.content = this.brief.content
				}
			},
			generateQRCode() {
				const ctx = uni.createCanvasContext('qrcode');
				const uqrcode = new uQRCode({
						text:this.shareContent.url,
						size: this.qrSize,
						margin: 8,
						errorCorrectLevel: 1
				 },
					ctx
				);
				uqrcode.make();
				uqrcode.draw();
			},
			closeShare() {
				this.$emit('closeShare')
			},
			handleShare(index) {
				if(this.creatingPoster)return
				if(index===0){
					if(this.shareType==="post")return
					uni.navigateTo({
						url:`/pages/sys/sns/publishPost?repostType=merchandise&nftCode=${this.brief.nftCode}`
					})
				}else if (index === 5) {
					uni.setClipboardData({
						data: this.shareContent.url,
						success: ()=>{
							this.$u.toast("复制链接成功")
						}
					})
					return
				}else{
					this.creatingPoster = true
					this.$refs.uToast.show({
						title:'正在生成图片,请自行复制并发送,或点击右上角分享',
						duration: 3000,
						callback:()=>{
							this.createPoster()
						}
					})
				}
			},
			createPoster(){
				let dom = document.querySelector('#sharePoster'); // 获取dom元素
				this.isCreating = true
				this.$nextTick(()=>{
					html2canvas(dom, {
						width: dom.clientWidth,
						height: dom.clientHeight,
						scrollY: 0,
						scrollX: 0,
						useCORS: true,
					}).then((canvas) => {
						let base64 = canvas.toDataURL('image/png')
						let blob = base64ToBlob(base64)
						this.qrCodeUrl = URL.createObjectURL(blob)
						uni.previewImage({
							urls: [this.qrCodeUrl],
							success: function() {
								console.log('success');
							}
						})
						this.creatingPoster = false
						this.isCreating = false
						if(this.shareType==="post"){
							SnsApi.forward({
								params:{
									noteType:'7',
									noteCode:this.brief.noteCode
								}
							}).then(res=>{

							}).catch(err=>{
								this.$u.toast(err)
							})
						}
					});
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/css/index.scss";
	.main {
		// border-radius: 56rpx;
		position: relative;
		height: 600rpx;
		background-size: cover;
	}

	.workBrief {
		position: absolute;
		bottom: 0px;
		left: 0px;
		width: 100%;
		height: 200rpx;
		display: flex;
		align-items: center;

		.briefWrap {
			width: 100%;
		}
	}

	.clip {
		position: absolute;
		bottom: 0px;
		left: 0px;
		width: 100%;
		height: 200rpx;
		border: 1rpx solid rgba(96, 96, 96, 0.2);
		box-sizing: border-box;
		background: rgba(255, 255, 255, 0.5) border-box;
		overflow: hidden;
	}

	.clipLoaded:before {
		content: '';
		background-image: var(--bgImg);
		background-size: cover;
		background-position: center bottom;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		margin: -10rpx;
		filter: blur(10rpx);
	}

	.shareicon1 {
		background-image: url("@/static/common/img/merchandise/detail/shareicon1.png");
	}

	.shareicon2 {
		background-image: url("@/static/common/img/merchandise/detail/shareicon2.png");
	}

	.shareicon3 {
		background-image: url("@/static/common/img/merchandise/detail/shareicon3.png");
	}

	.shareicon4 {
		background-image: url("@/static/common/img/merchandise/detail/shareicon4.png");
	}

	.shareicon5 {
		background-image: url("@/static/common/img/merchandise/detail/shareicon5.png");
	}

	.shareicon6 {
		background-image: url("@/static/common/img/merchandise/detail/shareicon6.png");
	}
</style>
