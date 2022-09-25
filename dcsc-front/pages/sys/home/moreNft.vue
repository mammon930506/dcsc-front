<template>
	<view class="wrap">
		<view class="fixedHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			推荐尚品<view></view>
		</view>
		<!-- #ifdef APP-PLUS -->
		<view style="height:170rpx;"></view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view style="height:130rpx;"></view>
		<!-- #endif -->
		<view style="margin:0 10rpx;margin-bottom:80rpx;">
			<work-flow ref="merchandiseFlow" :flowList="itemList">
				<template v-slot="{item}">
					<merchandise :brief="item" type="home"></merchandise>
				</template>
			</work-flow>
		</view>
	</view>
</template>

<script>
	import HomeApi from "@/common/apis/home.js"
	import Merchandise from "@/components/merchandise/Merchandise"
	import WorkFlow from "@/components/home/WorkFlow"
	export default{
		data(){
			return{
				bannerType:'2',
				workPage:0,
				itemList:[]
			}
		},
		components:{
			Merchandise,WorkFlow
		},
		onLoad(){
			this.queryList()
		},
		onReachBottom() {
			this.queryList()
		},
		methods:{
			queryList(){
				HomeApi.moreContent({
					params: {
						bannerType: this.bannerType,
						offset: this.workPage++,
						pageSize: 10
					}
				}).then(res => {
					this.itemList = this.itemList.concat(res.nft.nfts)
				}).catch(err=>{
					this.$u.toast(err)
				})
			},
			customGoBack(){
				uni.navigateBack({
					delta:1
				})
			},
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #18181c;
	}
</style>
<style lang="scss" scoped>
	@import "@/common/css/index.scss";
</style>