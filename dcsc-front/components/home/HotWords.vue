<template>
	<view>
	<view style="margin: 20rpx 0;">
		<span class="hotTitle">
			<span class="innerHotTitle">热门搜索</span>
		</span>
	</view>
	<view style="display:flex;flex-wrap: wrap;">
		<view v-for="word in wordList" class="hotWordBg">
			<view class="hotWordLayer0"></view>
			<view class="hotWordLayer1" @tap="searchHot(word.word)">{{ word.word }}</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default{
		props:{
			wordList:{
				type:Array,
				default(){
					return []
				}
			}
		},
		methods:{
			searchHot(word){
				this.$emit('searchHot',word)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/css/index.scss";

	.hotWordBg{
		background-image:url('@/static/common/img/index/recommend/colorfulbg.png');
		background-size:100% 100%;
		padding:10rpx 50rpx;
		border-radius: 20rpx;
		position:relative;
		box-sizing:border-box;
		margin:6rpx;
		display:inline-block;
		&>.hotWordLayer0{
			z-index:1;
			position:absolute;
			top:0;
			left:0;
			display: inline-block;
			box-sizing: border-box;
			width:100%;
			height:100%;
			background-image:linear-gradient(to right, rgb(24,24,28), rgb(44,44,48));
			border-radius: 20rpx;
			border:5rpx solid white;
			mix-blend-mode:darken;
		}
		&>.hotWordLayer1{
			z-index:2;
			position:relative;
		}
	}
</style>