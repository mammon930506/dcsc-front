<template>
	<view class="wrap">
		<view class="pageHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>话题广场<view></view>
		</view>
		<view style="padding:0 30rpx">
			<scroll-view scroll-y="true" @scrolltolower="loadMoreTopics" :style="{height:scrollViewHeight}"
			:refresher-enabled="true" :refresher-triggered="refreshTriggered" refresher-background="#18181c" @refresherrefresh="pullDownRefresh">
				<view style="height:20rpx;"></view>
				<view class="card"  v-for="content in topics">
					<topic :content="content" :detailLevel="1"></topic>
				</view>
			</scroll-view>
		</view>
	</view>	
</template>loadMoreTopics

<script>
	import SnsApi from "@/common/apis/sns.js"
	import RecomTitle from "@/components/home/RecomTitle"
	import topic from "@/components/sns/topic"
	import {calScrollHeight} from "@/common/common.js"
	export default{
		data(){
			return {
				workPage:-1,
				topics:[],
				refreshTriggered: false,
				scrollViewHeight:0
			}
		},
		components: {
			RecomTitle,topic
		},
		onLoad(){
			this.scrollViewHeight = calScrollHeight(110)
			this.loadMoreTopics()
		},
		methods:{
			pullDownRefresh(){
				this.refreshTriggered = true
				this.loadMoreTopics()
			},
			loadMoreTopics(){
				if(this.refreshTriggered){
					this.workPage=-1
				}
				this.workPage++
				SnsApi.moreContent({
					params:{
						offset:this.workPage,
						pageSize:10,
						subjectType:'6'
					}
				}).then(res=>{
					if(this.refreshTriggered){
						this.topics = []
					}
					this.topics = this.topics.concat(res.data)
					setTimeout(()=>{
						this.refreshTriggered=false
					},1000)
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