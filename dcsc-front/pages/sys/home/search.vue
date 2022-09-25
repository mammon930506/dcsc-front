<template>
	<view class="wrap">
		<view style="margin:0 40rpx;padding-top:32rpx;">
			<u-search v-model.trim="keyword" shape="square" class="realSearch" placeholder="请输入关键字搜索" bg-color="#2A2A34"
				color="#767676" @custom="customGoBack(from)" action-text="取消" margin="0 0 10rpx 0"
				search-icon="/static/common/img/index/recommend/Search.png" placeholder-color="#767676"
				@change="relateSearch" @search="startSearch(keyword)" :focus="true" @clear="startSearch('')"></u-search>
			<!-- <relate-words v-if="keyword&&keyword.length" :relateList="relateList"></relate-words> -->
			<hot-words :wordList="wordList" @searchHot="searchHot"></hot-words>
			 <!-- v-else -->
		</view>
	</view>
</template>

<script>
	import HomeApi from "@/common/apis/home.js"
	import HotWords from "@/components/home/HotWords"
	import RelateWords from "@/components/home/RelateWords"
	export default {
		data() {
			return {
				keyword: "",
				wordList: [],
				relateList: [],
				from: ''
			}
		},
		components: {
			HotWords,
			RelateWords
		},
		onLoad(option) {
			this.from = option.from
			this.keyword = option.keyword
			// this.wordList = ["小确幸", "阳光少年", "黑猫警长", "川崎", "戴珍珠", "陈情令", "爱乐"]
			HomeApi.hotsKeyWords({
				params:{
					offset:0,
					pageSize:999,
				}
			}).then(res=>{
				this.wordList = res.data
			})
		},
		methods: {
			searchHot(hotword){
				this.startSearch(hotword)
			},
			startSearch(keyword) {
				this.customGoBack("merchandiseList")
				setTimeout(()=>{
					uni.$emit("merchandiseListSearch", {
						keyword
					})
				},100)
			},
			customGoBack(from) {
				let url = "/pages/sys/home/index"
				switch (from) {
					case 'homeIndex': {
						url = "/pages/sys/home/index"
						break
					}
					case 'merchandiseList': {
						url = "/pages/sys/merchandise/list"
						break
					}
				}
				uni.switchTab({
					url
				});
			},
			relateSearch() {
				// HomeApi.search({
				// 	params: {
				// 		keyword: '的'
				// 	}
				// })

				// let relateRes = {
				// 	"workss": [{
				// 		"nftName": "戴珍珠耳环的少女",
				// 	}, {
				// 		"nftName": "戴珍珠耳环的少女",
				// 	}],
				// 	"artists": [{
				// 		"nickName": "蔑薄的回惚",
				// 	}, {
				// 		"nickName": "蔑薄的回惚",
				// 	}]
				// }

				// let temp = []
				// for (let key in relateRes) {
				// 	let obj = {}
				// 	obj.title = key
				// 	obj.list = relateRes[key]
				// 	temp.push(obj)
				// }
				// this.relateList = temp

			}

		}

	}
</script>

<style lang="scss">
	page {
		background-color: #18181c;
	}
</style>
<style lang="scss">
	page {
		background-color: #18181c;
	}

	.realSearch {
		/deep/ .u-content {
			padding-top: 40rpx;
			padding-bottom: 46rpx;
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

	.hotWords {
		background-image: url('@/static/common/img/index/recommend/colorfulbg.png');
		background-size: 100% 100%;
	}
</style>
