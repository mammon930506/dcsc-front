<template>
	<view class="wrap">
		<headnavbar title="设置"></headnavbar>
		<view style="padding:0 30rpx;">
			<view @tap="gotoInventory" class="card flex-row-between-center">
				<span>个人信息手机清单</span>
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	import headnavbar from "@/components/headnavbar/index.vue"
	
	export default{
		data(){
			return{
			
			}
		},
		components:{
			headnavbar
		},
		methods:{
			gotoInventory(){
				uni.navigateTo({
					url:'/pages/sys/mine/setting/inventory'
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