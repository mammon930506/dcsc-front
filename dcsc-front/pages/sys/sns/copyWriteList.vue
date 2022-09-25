<template>
	<view class="wrap">
		<view class="pageHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			推荐文案<view style="color: #7A83D2;"></view>
		</view>
		<view style="height:80rpx;margin: 10rpx 0rpx;" >
			<view  class="catePanel" :style="{backgroundImage:isExtend?'linear-gradient(to bottom right, rgba(44,44,48,0.8), rgba(24,24,28,0.8), rgba(44,44,48,0.8))':'none'}">
				<view :animation="titleAnimation" class="cateTitle"><view>全部类别</view></view>
				<view :animation="mainAnimation" class="cateMain">
					<view v-if="!isExtend" class="extendIcon" @tap="toggleExtend(true)"><u-icon name="list-dot"></u-icon></view>
					<span v-for="cate in copyClassifyList" @tap="changeActive(cate)"  class="cateBtn" :class="{'normal':!cate.isActive,'active':cate.isActive}">{{ cate.copyclassifyName }}</span>
				</view> 
			</view>
		</view>
			<!--
			<scroll-view :refresher-enabled="true" :refresher-triggered="refreshTriggered" refresher-background="#18181c" @refresherrefresh="pullDownRefresh" 
			 @touchstart="touchstart" @touchend="touchend" @scrolltolower="loadMore" scroll-y="true" :style="{height:scrollViewHeight}">
			-->
		<scroll-view style="margin-top: 200rpx;" :refresher-enabled="true" scroll-y="true"  refresher-background="#18181c" >
			<view style="margin: 30rpx 10rpx;">
				<view  v-for="copyWrite in copyWriteList"  >
					<view style="font-size: 12px;margin: 20rpx 10rpx;padding: 14rpx 14rpx;height: auto;background-color: #2A2A34;border-radius: 30rpx;" @click="backPrePage(copyWrite.content)">
							<span  style="padding:30rpx 10rpx;">{{copyWrite.content}}</span>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import MerchandiseApi from "@/common/apis/merchandise.js"
	import {calScrollHeight} from "@/common/common.js"
	export default{
		data(){
			return {
				copyWriteList:[],
				copyClassifyList:[],
				workPage:-1,
				scrollViewHeight:0,
				refreshTriggered:false,
				keyword:'',
				classifyCode:undefined,
				currentActiveCode:undefined,
				searchDisabled:true,
				isExtend:false,
				titleAnimation:undefined,
				mainAnimation:undefined
				
			}
		},
		onShow(){
			setTimeout(()=>{
				this.searchDisabled = false
			},1000)
		},
		onLoad(option){
			
		},
		mounted(){
			MerchandiseApi.copyClassifyList({}).then(res=>{
				this.copyClassifyList.forEach(cate=>{
					cate.isActive = false
				})
				this.copyClassifyList = res.data
			})
			this.refreshTriggered = true
			this.queryCopyWriteList("");
		},
		methods:{
			customGoBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			pullDownRefresh(){
				this.refreshTriggered = true
				this.workPage = -1
				this.merchandiseList=[]
			},
			changeActive(cateTapped){
				if(cateTapped.copyclassifyType===this.currentActiveCode){
					this.copyClassifyList.forEach(cate=>{
						if(cate.copyclassifyType===cateTapped.copyclassifyType){
							this.$set(cate,'isActive',false)
							this.currentActiveCode = undefined
							this.$emit("changeActive",undefined)
						}
					})
				}else{
					this.copyClassifyList.forEach(cate=>{
						if(cate.copyclassifyType===cateTapped.copyclassifyType){
							this.$set(cate,'isActive',true)
							this.currentActiveCode = cateTapped.copyclassifyType
							this.$emit("changeActive",cate.copyclassifyType)
						}else{
							this.$set(cate,'isActive',false)
						}
					})
				}
				
				this.queryCopyWriteList(this.currentActiveCode)
			},
			toggleExtend(isExtend){
				if(this.isExtend === isExtend)return
				this.isExtend = isExtend
				this.titleAnimation= uni.createAnimation({
					duration: 300,
					timingFunction: 'ease',
				})
				this.titleAnimation.height(this.isExtend?this.titleHeight:0).step();
				this.titleAnimation = this.titleAnimation.export()
				this.mainAnimation = uni.createAnimation({
					duration: 300,
					timingFunction: 'ease',
				})
				this.mainAnimation.height(this.isExtend?this.mainHeight:this.oneRowHeight).step();
				this.mainAnimation = this.mainAnimation.export()
			},
			queryCopyWriteList(copyclassifyCode){
				let  params ={
					copyclassifyType:copyclassifyCode
				}
				
				MerchandiseApi.copyWriteList({
					params: params,
					isLoading: false
				}).then(res=>{
					this.copyWriteList = res.data
				}).catch(err=>{
					this.$u.toast(err)
				})
			},
			backPrePage(val){
				var copyWritePages = getCurrentPages();
				var prePage = copyWritePages[copyWritePages.length - 2]; //上个页面
				prePage.info=val;  //赋值
				uni.navigateBack({
					delta: 1
				});
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
	.catePanel{
		position:absolute;
		padding:0 20rpx;
		width:100%;
		z-index:1;
		border-radius:56rpx;
	}
	.cateTitle{
		color:#D8D8D8;
		font-size:32rpx;
		text-align: center;
		overflow: hidden;
		&>view{
			padding:30rpx;
		}
	}
	.cateBtn{
		display: inline-block;
		height: 28px;
		line-height: 28px;
		border-radius: 30rpx;
		font-size: 24rpx;
		padding:0 32rpx;
		margin:0 10rpx;
		margin-bottom:20rpx;
	}
	.cateBtn.active {
		color: #ffffff;
		border: 1rpx solid transparent;
		background-size: 100% 100%;
		background-image: url("@/static/common/img/index/recommend/colorfulbg.png");
		background-repeat: no-repeat;
	}
	.cateBtn.normal{
		color:#D8D8D8;
		border:1rpx solid #444;
		background-image:linear-gradient(to bottom right, rgb(44,44,48), rgb(24,24,28), rgb(44,44,48));
	}
	.cateMain{
		position:relative;
		overflow: hidden;
	}
	.extendIcon{
		width:64rpx;
		height:30px;
		background-color: #18181c;
		line-height:30px;
		text-align: center;
		position:absolute;
		right:0;
		top:0;
		margin-bottom:20rpx;
	}
</style>