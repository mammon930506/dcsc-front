<template>
	<view class="wrap">
		<headnavbar title="个人信息手机清单"></headnavbar>
		<view style="padding:0 30rpx;">
			<view @tap="gotoInventory" class="card flex-row-between-center">
				<span></span>
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
	</view>
</template>
<script>
	import headnavbar from "@/components/headnavbar/index.vue"
	import MineApi from "@/common/apis/mine.js"
	export default{
		data(){
			return{
			
			}
		},
		components:{
			headnavbar
		},
		onLoad(){
			MineApi.collect().then(res=>{
				
			})
		},
		methods:{
			gotoInventory(){
				uni.navigateTo({
					url:''
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
	@import url('@/common/css/index.scss');
</style>