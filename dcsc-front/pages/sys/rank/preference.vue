<template>
	<view class="wrap">
		<view class="fixedHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			偏好设置<view style="font-size: 34rpx;">更多</view>
		</view>
		<view style="height:180rpx;"></view>
		<view>
			<view style="font-size: 32rpx;font-weight: bold;text-align: center;">
				请选择您感兴趣的标签
			</view>
			<view class="tag_box">
				<view class="tag" :class="{'active':item.isChecked}" @tap="checkTag(index)"
					:style="{animationDuration : 1+(index*0.3)+'s'}" v-for="(item,index) in tagsList" :key="index">
					{{item.name}}
				</view>
			</view>
		</view>
		<view class="button"
			style="width: 682rpx;margin: 0 auto;height: 128rpx;line-height: 128rpx;font-weight: 500;font-size: 32rpx;">
			确定
		</view>
	</view>
</template>

<script>
	import HomeApi from "@/common/apis/home.js"
	export default {
		data() {
			return {
				tagsList: [{
						id: 0,
						name: '鬼火少年',
						isChecked: false
					},
					{
						id: 1,
						name: '鬼火少女',
						isChecked: false
					},
					{
						id: 2,
						name: '精神小妹',
						isChecked: false
					},
					{
						id: 3,
						name: '小确幸',
						isChecked: false
					},
					{
						id: 4,
						name: 'jk少女',
						isChecked: false
					},
					{
						id: 5,
						name: '精神小妹',
						isChecked: false
					},
					{
						id: 6,
						name: '精神小伙',
						isChecked: false
					},
					{
						id: 7,
						name: 'rapper',
						isChecked: false
					},

					{
						id: 8,
						name: 'hello',
						isChecked: false
					},
				]
			}
		},
		onLoad() {

		},

		methods: {
			checkTag(index) {
				this.tagsList[index].isChecked = !this.tagsList[index].isChecked
				let checkedLength = this.tagsList.filter(item => item.isChecked).length
				console.log(checkedLength);
				// 标签限制个数
				if(checkedLength>4){
					uni.showToast({
						title:'可选标签不超过4个',
						icon:'none'
					})
					this.tagsList[index].isChecked=false
					return false
				}

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

	.tag_box {
		display: flex;
		flex: 1;
		flex-wrap: wrap;
		justify-content: flex-start;
		width: 90%;
		margin: 80rpx auto 60rpx;

		.tag {
			font-size: 24rpx;
			font-weight: 400;
			border: 1px solid #7A83D2;
			border-radius: 132rpx;
			padding: 22rpx 40rpx;
			color: #7A83D2;
			margin: 0 10rpx 20rpx;
			animation: fadeIn 1s 1;
		}

		.active {
			background: #7A83D2;
			color: #fff;
		}
	}

	@keyframes fadeIn {
		0% {
			opacity: 0;
			transform: scale(0.5);
		}

		100% {
			opacity: 1;
			transform: scale(1);
		}

	}
</style>
