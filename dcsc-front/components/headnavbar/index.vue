<template>
	<view>
		<view class="status_bar"></view>
		<view class="page_header">
			<view style="width:20%;height:100%" class="flex-row-start-center">
				<template v-if="haveBack">
					<u-icon style="font-size:40rpx" name="arrow-left" @tap="customGoBack"></u-icon>
				</template>
				<template v-else>
					<slot name="left"></slot>
				</template>
			</view>
			<view class="flex-row-center-center" style="width:60%;height:100%">
				<template v-if="!customTitle">
					<view>{{ title }}</view>
				</template>
				<template v-else>
					<slot name="center"></slot>
				</template>
			</view>
			<view style="width:20%;height:100%" class="flex-row-end-center">
				<slot name="right"></slot>
			</view>
		</view>
	</view>
</template>
<script>
	export default{
		props:{
			title:{
				type:String,
				default:''
			},
			haveBack:{
				type:Boolean,
				default:true
			},
			customBack:{
				type:Boolean,
				default:false
			},
			customTitle:{
				type:Boolean,
				default:false
			},
		},
		methods:{
			customGoBack(){
				if(!this.customBack){
					uni.navigateBack({
						delta: 1
					});
				}else{
					this.$emit("goBack")
				}
			},
		}
	}
</script>
<style lang="scss" scoped>
	@import url('@/common/css/index.scss');
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
	.page_header{
		position:relative;
		background-color:#18181c;
		z-index:800;
		justify-content: space-between;
		align-items:center;
		display:flex;
		padding:30rpx 50rpx 20rpx;
		height:100rpx;
		font-size: 36rpx;
	}
</style>
