<template>
	<view class="relateContainer">
		<view v-for="item in relateList" style="margin-bottom:30rpx;">
			<view style="margin-bottom:10rpx;">{{ titleOptions[item.title] }}</view>
			<view v-for="entry in item.list" class="entry">
				<image src="/static/common/img/index/recommend/Search.png"
						style="width:35rpx;height:36rpx;vertical-align: middle;margin-right:20rpx;"></image>
				{{ entry[nameOptions[item.title]] }}
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				titleOptions:{workss:'作品',artists:'艺术家'},
				nameOptions:{workss:'nftName',artists:'nickName'}
			}
		},
		props:{
			title:{
				type:String,
				default: ''
			},
			relateList:{
				type:Array,
				default(){
					return[]
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.relateContainer{
		width:100%;
		max-height: calc( 100vh - 200rpx );
		background-image:linear-gradient(to bottom right, rgb(44,44,48), rgb(24,24,28), rgb(44,44,48));
		border-radius: 24rpx;
		border: 2rpx solid #444;
		overflow:scroll;
		padding: 28rpx 24rpx;
		.entry{
			position: relative;
			border-bottom: 2rpx solid #767676;
			height:60rpx;
			line-height: 60rpx;
		}
	}
	
</style>