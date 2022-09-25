<template>
	<view class="wrap">
		<view class="pageHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			我的收藏<view></view>
		</view>
		<tabs-in-store style="margin:20rpx 0 0" :initial="current"  inactiveColor="#ffffff" :navList="navList" bgColor="#18181c" @navChange="navChange"></tabs-in-store>
		<view>
			<scroll-view  scroll-y="true"  :style="{height:scrollViewHeight}" @scrolltolower="loadData">
	 			<view v-show="current===0" style="padding:30rpx">
					<view v-show="list['nft']&&list['nft'].length>0">
						<work-flow :flowList="list['nft']">
							<template v-slot="{item}">
								<merchandise :brief="item" :inStars="true"></merchandise>
							</template>
						</work-flow>
					</view>
					<view v-show="!list['nft']||list['nft'].length===0">
						<view class="blankIcon"></view>
						<view style="color:#AAAAAA;font-size:32rpx;text-align: center;font-weight: bold;">
							<view>您还没有收藏尚品</view>
						</view>
					</view>
				</view>
				<view v-show="current===1" style="padding:30rpx">
					<view v-if="list['post']&&list['post'].length>0">
						<view v-for="post in list['post']">
							<post :content="post" :detailLevel="0"></post>
						</view>
					</view>
					<view v-else>
						<view class="blankIcon"></view>
						<view style="color:#AAAAAA;font-size:32rpx;text-align: center;font-weight: bold;">
							<view>您还没有收藏笔记</view>
							<!-- <view v-else-if="!noFollowing&&noTimeline">你关注的用户暂时没有新动态</view> -->
						</view>
					</view>
				</view>
				<view v-show="current===2" style="padding:30rpx">
					<view v-if="list['topic']&&list['topic'].length>0">
						<view class="card" v-for="topic in list['topic']">
							<topic :content="topic" :detailLevel="1"></topic>
						</view>
					</view>
					<view v-else>
						<view class="blankIcon"></view>
						<view style="color:#AAAAAA;font-size:32rpx;text-align: center;font-weight: bold;">
							<view>您还没有收藏话题</view>
							<!-- <view v-else-if="!noFollowing&&noTimeline">你关注的用户暂时没有新动态</view> -->
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import TabsInStore from "@/components/merchandise/TabsInStore"
	import MineApi from "@/common/apis/mine.js"
	import {calScrollHeight,snsImgs} from "@/common/common.js"
	import WorkFlow from "@/components/home/WorkFlow"
	import Merchandise from "@/components/merchandise/Merchandise"
	import post from "@/components/sns/post"
	import topic from "@/components/sns/topic"
	export default{
		data(){
			return{
				current:0,
				currentType:'nft',
				navList:[
					{
						name:'尚品',
						value:'nft'
					},{
						name:'笔记',
						value:'post'
					},{
						name:'话题',
						value:'topic'
					}
				],
				list:{
					nft:[],
					post:[],
					topic:[]
				},
				workPage:{
					nft:-1,
					post:-1,
					topic:-1,
				},
				apis:{
					nft:'myStarNft',
					post:'myStarPost',
					topic:'myStarTopic',
				},
				lock:{
					nft:false,
					post:false,
					topic:false,
				},
				scrollViewHeight:0,
			}
		},
		components:{
			TabsInStore,WorkFlow,Merchandise,post,topic
		},
		onLoad(){
			this.scrollViewHeight = calScrollHeight(200)
			this.loadData(0,'nft')
			this.loadData(1,'post')
			this.loadData(2,'topic')
		},
		methods:{
			navChange(index,item){
				this.current = index
				this.currentType = item.value
			},
			loadData(current,currentType){
				current = current||this.current
				currentType = currentType||this.currentType
				if(this.lock[currentType])return
				this.lock[currentType]=true
				this.workPage[currentType]++
				MineApi[this.apis[currentType]]({
					params:{
						offset:this.workPage[currentType],
						pageSize:10,
					}
				}).then(res=>{
					if(!res.data||res.data.length<10){
						this.workPage[currentType]--
					}
					if(currentType==='post'){
						res.data.forEach(snsImgs)
            res.data.forEach(post=>{
              post.forward=post.forwards
              post.comment=post.replys
              post.storeUp=post.storeup
              post.likes=post.stars
              post.isStore = true
            })
					}else if(currentType==='topic'){
            res.data.forEach(topic=>{
              topic.isStore = true
            })
          }
					let lastOffset = Math.floor(this.list[currentType].length/10)
					this.list[currentType] = this.list[currentType].splice(0,lastOffset*10).concat(res.data)
					this.lock[currentType]= false
				}).catch(err=>{
					this.$u.toast(err)
				})
			},
			customGoBack(){
				uni.switchTab({
					url: '/pages/sys/mine/index'
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
