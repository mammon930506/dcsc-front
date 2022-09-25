<template>
	<view class="wrap">
		<view style="position:relative">
			<scroll-view scroll-y="true" @scrolltolower="getMorePosts" @refresherrefresh="pullDownRefresh"
			:style="{height:scrollViewHeight}"  :refresher-enabled="true" :refresher-triggered="refreshTriggered" refresher-background="#18181c" 
			 >
        <view style="padding:10rpx 0">
          <recom-title title='热门话题' type="6" :more='true'></recom-title>
          <view style="padding:0 30rpx;">
            <view v-for="topicRow in topics" style="display: flex;justify-content: space-between;margin-bottom:20rpx;">
              <view v-for="content in topicRow"  style="width:335rpx;background-color: #2A2A34;border-radius: 32rpx;padding:20rpx">
                <topic :content="content" :detailLevel="0"></topic>
              </view>
            </view>
          </view>
          <recom-title title='精选动态'></recom-title>
          <view style="padding:0 30rpx;">
            <view v-for="postContent in posts">
              <post :content="postContent" :detailLevel="0" @toggleShare="handleScrollHeight"></post>
            </view>
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
			return {
				topics:[],
				posts:[],
				refreshTriggered:false,
				workPage: 0,
				currPage: 0,
				scrollViewHeight:"calc( 100vh - 140rpx )"
			}
		},
		components: {
			RecomTitle,topic,post
		},
		onShow(){
			setTimeout(()=>{
				this.scrollViewHeight = calScrollHeight()
			},1000)
			this.loadData()
		},
		onLoad(){
			let ec = this.getOpenerEventChannel()
		},
		methods:{
			loadData(){
				SnsApi.content({}).then(res=>{
					if(this.refreshTriggered){
						this.topics=[]
						this.posts=[]
					}
					let list = []
					
					let temp = res.dcscSnsSubjectParams.splice(0,4)
					while(Math.floor(temp.length/2)>0){
						list.push(temp.splice(0,2))
					}
					if(temp.length>0){
						list.push(temp)
					}
					this.topics = list
					res.dcscSnsNoteParams.forEach(snsImgs)
					this.posts = res.dcscSnsNoteParams
					setTimeout(()=>{
						this.refreshTriggered=false
					},1000)
				})
			},
			handleScrollHeight(){
				this.$nextTick(()=>{
					this.scrollViewHeight = calScrollHeight()
				})
			},
			pullDownRefresh(){
				this.refreshTriggered = true
				this.workPage = -1
				this.loadData()
			},
			getMorePosts(){
				uni.showLoading({
					title:'正在加载...',
					mask:true,
				})
				this.workPage++
				SnsApi.notePage({
					params:{
						offset:this.workPage,
						pageSize:10,
					}
				}).then(res=>{
					if(res.data.length<10){
						this.workPage--
					}
					let lastOffset = Math.floor(this.posts.length/10)
					res.data.forEach(snsImgs);
					this.posts = this.posts.splice(0,lastOffset*10).concat(res.data)
					uni.hideLoading()
				}).catch(err=>{
					this.$u.toast(err)
					uni.hideLoading()
				})
			},
			gotoPublishPost(){
				uni.navigateTo({
					url:"/pages/sys/sns/publishShare"
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
