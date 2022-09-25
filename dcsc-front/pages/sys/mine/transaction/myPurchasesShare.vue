<template>
	<view class="wrap">
		<view class="pageHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			尚品详情<view></view>
		</view>
		<view>
			<scroll-view scroll-y="true" :style="{height:scrollViewHeight}">
				<view style="padding:30rpx;padding-bottom:60rpx">
					<view id="sharePoster" class="card" :style="{borderRadius:isCreating?'0':'32rpx'}"
						style="color:#7A83D2;font-size:24rpx;line-height:35rpx;margin-bottom:0;">
						<view style="font-size:32rpx;line-height:50rpx;">{{ brief.nftName }}</view>
						<view>发行方：{{ brief.artistName }}</view>
					<!-- 	<view class="preview" style="background-size:cover;margin-top:20rpx;"
							:style="{backgroundImage:`url(${imgBaseUrl}${brief.nftImg||brief.nftImgs}${imgSuffix})`}">
						</view> -->
						<u-image style="margin:20rpx 0" width="100%" height="640rpx" border-radius="56" :src="`${imgBaseUrl}${brief.nftImg||brief.nftImgs}${imgSuffix}`"></u-image>
						<view>收藏者：{{ brief.nickName }}</view>
						<view style="word-wrap: break-word;word-break: break-all;">尚品哈希：{{ brief.nftChainHash }}</view>
						<view>上链时间：{{ brief.nftChainHash==null?'':$u.timeFormat(brief.createdDate,'yyyy-mm-dd hh:MM:ss') }}</view>
						<view class="flex-row-between-center" style="margin-top:20rpx;">
							<view style="color:#AAAAAA;font-size:20rpx">
								<view class="logoBind"></view>
								<view>平台介绍</view>
								<view>https://h5.lanyueverse.com/</view>
							</view>
							<view style="width:140rpx;height:140rpx;border-radius:30rpx;overflow: hidden;">
								<canvas id="qrcode" canvas-id="qrcode"></canvas>
							</view>
						</view>
					</view>
					<view @tap="renderScript.createPoster" style="color:#AAAAAA;font-size:28rpx;text-align: center;padding-top:30rpx"><span>生成图片</span>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script lang="renderjs" module="renderScript">
	import html2canvas from 'html2canvas'
	import {
		base64ToBlob
	} from "@/common/common.js"
	export default{
		data(){
			
		},
		mounted(){
		
		},
		methods:{
			createPoster(event,ownerVm) { 
				ownerVm.callMethod('startLoading')
				let dom = document.querySelector('#sharePoster')
				setTimeout(() => {
					html2canvas(dom, {
						width: dom.clientWidth,
						height: dom.clientHeight,
						scrollY: 0,
						scrollX: 0,
						useCORS: true,
						allowTaint: false, 
						// proxy: jlConfig.imgUrl
					}).then((canvas) => {
						let base64 = canvas.toDataURL('image/png')
						ownerVm.callMethod('successCvs',base64)
					}).catch(err => {
						ownerVm.callMethod('errCvs',err)
					})
				},1000)
			}
		},
	}
</script>

<script>
	import MerchandiseApi from "@/common/apis/merchandise.js"
	import MineApi from "@/common/apis/mine"
	import uQRCode from '@/uni_modules/Sansnn-uQRCode/js_sdk/u-qrcode'
	import {
		calScrollHeight,
		base64ToBlob,
		base64ToPngApp
	} from "@/common/common.js"
	
	import jlConfig from '@/common/utils/jlConfig'
	export default {
		data() {
			return {
				brief: {},
				qrSize: uni.upx2px(140),
				scrollViewHeight: 0,
				isCreating: false,
				myInfo: {}
			}
		},
		onLoad(option) {
			this.scrollViewHeight = calScrollHeight(100)
			this.brief.id = option.id 
			this.queryContent()
			this.generateQRCode()
		},
		methods: {
			queryContent() {
				MineApi.myPurchasesInfo({
					params: {
						id: this.brief.id
					}
				}).then(res => {
					this.brief = res
					console.log(this.brief.nftImg)
					console.log(this.brief.nftImgs)
				}).catch(err => {
					this.$u.toast(err)
				})
			},
			generateQRCode() {
				const ctx = uni.createCanvasContext('qrcode');
				const uqrcode = new uQRCode({
						text: this.hostUrl +`#/pages/sys/merchandise/detail?nftCode=${this.brief.nftCode}`,
						size: this.qrSize,
						margin: 8,
						errorCorrectLevel: 1
					},
					ctx
				);
				uqrcode.make();
				uqrcode.draw();
			},
			startLoading(){
				this.isCreating = true
				uni.showLoading({
					title: '正在生成图片...',
					mask: true
				})
			},
			successCvs(base64){ 
				// #ifdef H5
				let blob = base64ToBlob(base64)
				this.imgUrl = URL.createObjectURL(blob)
				this.isCreating = false
				uni.hideLoading()
				this.showPoster()
				// #endif 
				// #ifdef APP-PLUS
				base64ToPngApp(base64,`myPurchase_${this.brief.nftCode}_${new Date().getTime()}`).then(event=>{
					this.imgUrl = event.target
					this.showPoster()
					this.isCreating = false
					uni.hideLoading()
				}).catch(err=>{
					this.$u.toast(err)
					this.isCreating = false
					uni.hideLoading()
				})    
				// #endif
			},
			errCvs(err){
				this.$u.toast(err)
				this.isCreating = false
				uni.hideLoading()
			},
			showPoster() {
				console.log(this.imgUrl)
				uni.previewImage({
					urls: [this.imgUrl],
					success: function() {
						console.log('success');
					}
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

	.logoBind {
		background-size: cover;
		background-image: url('@/static/common/img/login/logo.png');
		width: 60rpx;
		height: 60rpx;
		margin-bottom: 10rpx;
	}
</style>
