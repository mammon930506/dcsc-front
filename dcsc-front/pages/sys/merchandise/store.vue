<template>
	<view class="wrap">
		<!-- #ifdef H5 -->
		<view class="pageHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			<u-search v-model="queryParams.nftName" shape="square" class="realSearch" placeholder="请输入关键字搜索" bg-color="#2A2A34"
				color="#767676" @custom="customGoBack"  margin="0 20rpx"
				search-icon="/static/common/img/index/recommend/Search.png" placeholder-color="#767676"
				 @search="keyWordChange" :show-action="false" @clear="keyWordChange"></u-search>
			<!-- <follow :detail="detail"></follow> -->
		</view>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS -->
		<view class="fixedHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			<u-search v-model="queryParams.nftName" shape="square" class="realSearch" placeholder="请输入关键字搜索" bg-color="#2A2A34"
				color="#767676" @custom="customGoBack"  margin="0 20rpx"
				search-icon="/static/common/img/index/recommend/Search.png" placeholder-color="#767676"
				 @search="keyWordChange" :show-action="false" @clear="keyWordChange"></u-search>
			<!-- <follow :detail="detail"></follow> -->
		</view>
		<view style="height: 170rpx;"></view>
		<!-- #endif -->
		
		<view style="padding:0 30rpx;position:relative;">
			<view style="position:absolute;width:100%;background-color:#2A2A34;height:200rpx;left:0;bottom:0;z-index:1"></view>
			<view class="storeBrief" style="position:relative;display:flex;justify-content:space-between;margin-bottom:40rpx;z-index:2">
				<view style="width:60%;height:100%;display:flex;flex-direction:column;justify-content: space-between;">
					<view>
						<view style="font-size:36rpx;margin-bottom:10rpx">{{ detail.shopName }}</view>
						<star-level level="3.5"></star-level>
					</view>
					<view style="font-size:24rpx;color:#999999;">来自账号: {{ detail.nickName }}</view>
				</view>
				<view  @tap='gotoArtistMain' style="width:160rpx;height:160rpx;border-radius: 20rpx;background-size: cover;background-position: center;" :style="{backgroundImage:`url(${imgBaseUrl}${detail.header}${imgSuffix})`}"></view>
			</view>
			<view style="position:relative;display: flex;align-items: flex-end;justify-content: space-between;z-index:3">
				<tabs-in-store style="width:350rpx" :navList="navList" @navChange="tabChange"></tabs-in-store>
				<floating-panel style="width:240rpx"  :list="['综合排序','新品优先','价格从高到低','价格从低到高']" :defaultIndex="0" @cateChange="sortChange"></floating-panel>
			</view>
		</view>
		<scroll-view @scrolltolower="queryList" scroll-y  style="height: calc( 100vh - 460rpx )">
			<view v-if="merchandiseList&&merchandiseList.length>0">
				<work-flow ref="merchandiseFlow" style="padding:30rpx" :flowList="merchandiseList">
					<template v-slot='{item}'>
						<blur-work-small :brief="item"></blur-work-small>
					</template>
				</work-flow>
			</view>
			<view v-else>
				<view class="blankIcon"></view>
				<view style="color:#AAAAAA;font-size:32rpx;text-align: center;font-weight: bold;">
					<view>您还没有商品</view>
					<!-- <view v-else-if="!noFollowing&&noTimeline">你关注的用户暂时没有新动态</view> -->
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import storeApi from "@/common/apis/store.js"
	import StarLevel from "@/components/merchandise/StarLevel"
	import TabsInStore from "@/components/merchandise/TabsInStore"
	import FloatingPanel from "@/components/merchandise/FloatingPanel"
	import WorkFlow from "@/components/home/WorkFlow"
	import BlurWorkSmall from "@/components/home/BlurWorkSmall"
	import Follow from "@/components/mine/Follow"
	export default{
		data(){
			return{
				detail:{},
				merchandiseList:[],
				queryParams:{
					shopCode:"",
					offset:-1,
					pageSize:10,
					nftName:'',
					nftStatus:undefined,
					sqlSort:undefined
				},
				sqlSortList:[undefined,'updateDate,desc','nftUnitprice,desc','nftUnitprice,asc'],
				navList:[{
					name:'全部'
				},{
					name:'新品'
				}]
			}
		},
		components:{
			StarLevel,TabsInStore,FloatingPanel,WorkFlow,BlurWorkSmall,Follow
		},
		onLoad(option){
			storeApi.storeInfo({
				params:{userCode:option.userCode}
			}).then(res=>{
				this.detail = res
				this.queryParams.shopCode = this.detail.shopCode
				this.queryList()
			}).catch(err=>{
				this.$u.toast(err)
			})
		},
		methods:{
			gotoArtistMain(){
				uni.navigateTo({
					url:`/pages/sys/merchandise/artistMain?userCode=${this.detail.userCode}`
				})
			},
			queryList(){
				this.queryParams.offset++
				storeApi.nft({
					params:this.queryParams
				}).then(res=>{
					res.nfts.forEach(item=>{
						let {nftImgs,nftUnitprice} = item
						item.nftImg = nftImgs
						item.price = nftUnitprice
					})
					this.merchandiseList = res.nfts
				}).catch(err=>{
					this.$u.toast(err)
				})
			},
			tabChange(index){
				this.queryParams.nftStatus = index===0?undefined:'4'
				this.queryParams.offset = -1
				this.$refs.merchandiseFlow.clearFlow()
				this.queryList()
			},
			sortChange(index){
				let temp = this.sqlSortList[index]
				this.queryParams.sqlSort = temp? [temp]:undefined
				this.queryParams.offset = -1
				this.$refs.merchandiseFlow.clearFlow()
				this.queryList()
			},
			keyWordChange(){
				this.queryParams.offset = -1
				this.$refs.merchandiseFlow.clearFlow()
				this.queryList()
			},
			customGoBack(){
				uni.navigateBack({
					delta:1
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

	.realSearch {
		/deep/ .u-content {
			border-radius: 24rpx !important;
		}

		/deep/ .u-action {
			font-size: 28rpx;
			color: #aaaaaa;
		}

		/deep/ .u-icon-wrap {
			margin: 0 10rpx;
		}
	}

	.storeBrief{
		width:100%;
		height:230rpx;
		background-image:linear-gradient(to bottom right, rgb(44,44,48), rgb(24,24,28), rgb(44,44,48));
		border-radius: 24rpx;
		border: 2rpx solid #444;
		overflow:scroll;
		padding: 30rpx;
	}
</style>
