<template>
	<view class="wrap">
		<view class="pageHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>笔记详情<view></view>
		</view>
		<view>
			<scroll-view scroll-y="true"  style="height:calc( 100vh - 100rpx )">
				<view style="padding-bottom:160rpx;">
					<post :content="post" :detailLevel="1"></post>
					<view style="padding:0 40rpx;">
						<tabs-in-store :initial="currentIndex" style="width:150rpx;" :navList="navList" @navChange="tabChange" bgColor="#18181c"></tabs-in-store>
<!-- 						<view v-if="currentIndex===0">
							<view v-for="(item,itemIndex) in reposts">
								<comment-repost :content="item"></comment-repost>
							</view>
						</view>
						<view v-else> -->
						<view v-if="comments&&comments.length>0">
							<view v-for="(item,itemIndex) in comments">
								<comment-repost :content="item" @commentTapped="commentTapped(item)"></comment-repost>
							</view>
						</view>
						<view v-else>
							<view class="blankIcon"></view>
							<view style="color:#AAAAAA;font-size:32rpx;text-align: center;font-weight: bold;">
								<view>暂无评论</view>
								<!-- <view v-else-if="!noFollowing&&noTimeline">你关注的用户暂时没有新动态</view> -->
							</view>
						</view>
						<!-- </view> -->
					</view>
				</view>
			</scroll-view>
		</view>
		<view style="position:fixed;width:100%;bottom:0;background-image:linear-gradient(to bottom right, rgb(24,24,28), rgb(44,44,48), rgb(24,24,28));">
			<view v-if="isReply" style="margin-left:35rpx;margin-top:20rpx;">回复：<span style="color:#7A83D2;margin-right:20rpx;">{{ replyUser.nickName }}</span><u-icon @tap="deleteReplyUser" name="close-circle-fill"></u-icon></view>
			<u-field class="postComment" v-model="editingComment" label-width="0" type="text" :border-bottom="false"
				:clearable="false" placeholder="写评论..." @confirm="doComment" :focus="forComment">
			</u-field>
			<!-- <span @tap="doComment">提交</span> -->
		</view>
	</view>
</template>

<script>
	import SnsApi from "@/common/apis/sns.js"
	import MineApi from "@/common/apis/mine.js"
	import post from "@/components/sns/post"
	import {snsImgs} from "@/common/common.js"
	import tabsInStore from "@/components/merchandise/TabsInStore"
	import commentRepost from "@/components/sns/CommentRepost"
	export default{
		data(){
			return{
				post:{},
				comments:[],
				reposts:[],
				currentIndex:0,
				editingComment:'',
				isReply:false,
				replyUser:{},
				navList:[{name:'评论',affix:''}],
				// {name:'转发',affix:''},
				forComment:false
			}
		},
		components: {
			post,tabsInStore,commentRepost
		},
		onLoad(option){
			this.loadData(option)
			this.forComment = option.forComment?true:false
		},
		methods:{
			loadData(option){
				SnsApi.postDetail({
					params:{
						noteCode:option.postCode
					}
				}).then(res=>{
					snsImgs(res)
					this.post = res
					this.saveHistory()
					// this.reposts = res.dcscSnsForwardVos||[]
					this.comments = res.dcscSnsNoteReplyVos||[]
					this.navList[0].affix = '('+this.comments.length+')'
					// this.navList[1].affix = '('+this.comments.length+')'
				}).catch(err=>{
					this.$u.toast(err)
				})
			},
			saveHistory(){
				MineApi.saveHistory({
					params: {
						browseType:'2',
						browseCode:this.post.noteCode,
						title:this.post.title
					}
				}).then(res => {
					
				}).catch(err => {
					//this.$u.toast(err)
				})
			},
			tabChange(index,item){
				this.currentIndex = index
			},
			commentTapped(item){
				this.isReply = true
				this.replyUser = {nickName:item.nickName,userCode:item.userCode}
			},
			deleteReplyUser(){
				this.isReply = false
				this.replyUser = {}
			},
			doComment(){
				let params = {
					noteCode: this.post.noteCode,
					replyContent:this.editingComment
				}
				if(this.isReply){
					params = {...params, 
						replyUserCode:this.replyUser.userCode,
						replyName:this.replyUser.nickName
					}
				}
				SnsApi.noteReply({
					params
				}).then(res=>{
					this.$u.toast('发送成功')
					this.editingComment = ''
					this.deleteReplyUser()
					this.loadData({postCode:this.post.noteCode})
				}).catch(err=>{
					this.$u.toast(err)
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