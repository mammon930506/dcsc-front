<template>
	<view class="wrap">
		<view class="fixedHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			{{ title }}<view></view>
		</view>
		<view style="height:130rpx;"></view>
		<view id="htmlContainer" style="padding:30rpx;" v-html="htmlStr"></view>
	</view>
</template>

<script>
	import HomeApi from "@/common/apis/home.js"
	export default{
		data(){
			return{
				title:'',
				htmlStr:''
			}
		},
		onLoad(option){
			HomeApi.advertInfo({
				params:{
					advertCode:option.advertCode
				}
			}).then(res=>{
				let temp= res.content.replace(/<img/g,"<img style='max-width:100%;height:auto' ")
				this.title = res.bannerName
				this.htmlStr = temp
			})
		},
		methods:{
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
</style>