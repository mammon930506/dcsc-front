<template>
	<view class="wrap">
		<view class="fixedHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			推荐艺术家<view></view>
		</view>
		<!-- #ifdef APP-PLUS -->
		<view style="height:170rpx;"></view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view style="height:130rpx;"></view>
		<!-- #endif -->
		<view style="margin:0 30rpx;margin-bottom:50rpx;">
			<view v-for="item in itemList">
				<artist-brief :item="item" :opeList="['gotoStore']" :briefList="['statics']"></artist-brief>
			</view>
		</view>
	</view>
</template>

<script>
	import HomeApi from "@/common/apis/home.js"
	import ArtistBrief from "@/components/home/ArtistBrief"
	export default{
		data(){
			return{
				bannerType:'3',
				workPage:-1,
				itemList:[]
			}
		},
		components:{
			ArtistBrief
		},
		onLoad(){
			this.queryList()
		},
		onReachBottom() {
			this.queryList()
		},
		methods:{
			queryList(){
				this.workPage++
				HomeApi.moreContent({
					params: {
						bannerType: this.bannerType,
						offset: this.workPage++,
						pageSize: 10
					}
				}).then(res => {
					this.itemList = this.itemList.concat(res.artist.artists)
				}).catch(err=>{
					this.$u.toast(err)
				})
			},
			customGoBack(){
				uni.navigateBack({
					delta:1
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
</style>