<template>
	<view class="wrap">
		<view class="pageHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>话题详情<view></view>
		</view>
		<view style="position:relative">
			<scroll-view scroll-y="true" @scrolltolower="getMorePosts" :style="{height:scrollViewHeight}"
			:refresher-enabled="true" :refresher-triggered="refreshTriggered" refresher-background="#18181c" @refresherrefresh="pullDownRefresh">
				<view style="padding:0 30rpx">
					<view style="height:20rpx;"></view>
					<view class="card">
						<topic :content="topic" :detailLevel="2"></topic>
					</view>
					<view v-for="postContent in posts">
						<post :content="postContent"></post>
					</view>
				</view>
			</scroll-view>
			<view @tap="gotoPublishPost" class="publishPost"></view>
		</view>
	</view>
</template>

<script>
	import SnsApi from "@/common/apis/sns.js"
	import RecomTitle from "@/components/home/RecomTitle"
	import topic from "@/components/sns/topic"
	import post from "@/components/sns/post"
	import {snsImgs,calScrollHeight} from "@/common/common.js"
	export default{
		data(){
			return{
				topic:{},
				posts:[],
				refreshTriggered:false,
				scrollViewHeight:0
			}
		},
		components: {
			RecomTitle,topic,post
		},
		onLoad(option){
			this.scrollViewHeight = calScrollHeight(110)
			this.topic.subjectCode=option.topicCode
			this.loadData()
		},
		methods:{
			pullDownRefresh(){
				this.refreshTriggered = true
				// this.$u.toast('触发更新')
				this.loadData()
			},
			loadData(){
				SnsApi.topicDetail({
					params:{
						subjectCode: this.topic.subjectCode
					}
				}).then(res=>{
					this.topic = res
					res.dcscSnsNoteParamList.forEach(snsImgs)
					if(this.refreshTriggered){
						this.posts = res.dcscSnsNoteParamList
					}else{
						this.posts = this.posts.concat(res.dcscSnsNoteParamList)
					}
					setTimeout(()=>{
						this.refreshTriggered = false
					},1000)
				}).catch(err=>{
					this.$u.toast(err)
					this.refreshTriggered = false
				})
			},
			gotoPublishPost(){
				uni.navigateTo({
					url:`/pages/sys/sns/publishShare?withTopic=1&topicCode=${this.topic.subjectCode}&topicName=${this.topic.subjectName}`
				})
			},
			getMorePosts(){
				
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