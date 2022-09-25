<template>
	<view class="wrap">
		<view class="pageHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			{{ userinfo.nickName }}<view></view>
		</view>
		<tabs-in-store style="margin:20rpx 0 0" :initial="current"  inactiveColor="#ffffff" :navList="navList" bgColor="#18181c" @navChange="navChange"></tabs-in-store>
		<view v-if="current===1 && this.userinfo.userType==='2'"  class="briefText"  style="padding: 1% 35%;">
			<u-subsection :current="isBlind?1:0" @change="isBlindChange" :list="artFansList"
				buttonColor="#7A83D2" bgColor="#35353F" active-color="white" inactive-color="#9CA3AF">
			</u-subsection>
			</u-subsection>
		</view>
		<view>
			<scroll-view  scroll-y="true"  :style="{height:scrollViewHeight}" @scrolltolower="getMoreContent">
				<view v-if="current===0" style="padding:30rpx">
					<view v-if="followingList&&followingList.length>0">
						<view v-for="user in followingList">
							<artist-brief :item="user" :opeList="['follow']" :briefList="['intro']"></artist-brief>
						</view>
					</view>
			<view v-else>
				<view class="blankIcon"></view>
				<view style="color:#AAAAAA;font-size:32rpx;text-align: center;font-weight: bold;">
					<view>您还没有关注</view>
					<!-- <view v-else-if="!noFollowing&&noTimeline">你关注的用户暂时没有新动态</view> -->
				</view>
			</view>
				</view>
				<view v-if="current===1" style="padding:30rpx">
					<view v-if="followingList&&followingList.length>0">
						<view v-for="user in followerList">
							<artist-brief :item="user" :opeList="['follow']" :briefList="['contribution']" ></artist-brief>
						</view>
					</view>
			<view v-else>
				<view class="blankIcon"></view>
				<view style="color:#AAAAAA;font-size:32rpx;text-align: center;font-weight: bold;">
					<view>您还没有粉丝</view>
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
	import ArtistBrief from "@/components/home/ArtistBrief"
	import MineApi from "@/common/apis/mine.js"
	import SnsApi from "@/common/apis/sns.js"
	import storeApi from "@/common/apis/store.js"
	import {calScrollHeight} from "@/common/common.js"
	export default{
		data(){
			return{
				current:0,
				mine:true,
				isBlind: 0,
				userinfo:{},
				navList:[
					{
						name:'关注'
					},{
						name:'粉丝'
					}
				],
				artFansList: [{
					name: '周榜',
					value: '1'
				}, {
					name: '总榜',
					value: '3'
				}],
				followingList:[],
				followingWorkPage:-1,
				followerList:[],
				followerWorkPage:-1,
				scrollViewHeight:0,
			}
		},
		components:{
			TabsInStore,ArtistBrief
		},
		onLoad(option){
			this.scrollViewHeight = calScrollHeight(200)
			this.mine = Number(option.mine)
			this.userinfo.userCode= option.userCode
			if(option.relation==="followings"){
				this.current=0
			}else if(option.relation==="followers"){
				this.current=1
			}
			this.getUserinfo().then(()=>{
				this.queryFollowings()
				if(this.userinfo.userType==='1'){
					this.queryFollowers();
				}
				if(this.userinfo.userType==='2'){
					this.queryArtFans('1');
				}
			})
		},
		methods:{
			getUserinfo(){
				return new Promise((resolve,reject)=>{
					if(this.mine){
						SnsApi.myInfo().then(res=>{
							this.userinfo = res
							resolve()
						}).catch(err=>{
							this.$u.toast(err)
							reject()
						})
					}else{
						storeApi.artistInfo({
							params:{userCode:this.userinfo.userCode}
						}).then(res=>{
							this.userinfo = res
							resolve()
						}).catch(err=>{
							this.$u.toast(err)
							reject()
						})
					}
				})
			},
			isBlindChange(index) {
				this.isBlind = index;
				let rankType =this.artFansList[index].value;
				if(this.userinfo.userType==='2'){
					this.queryArtFans(rankType);
				}
			},
			navChange(index){
				this.current = index
			},
			getMoreContent(){
				if(this.current===0){
					this.queryFollowings()
				}else if(this.current===1){
					this.queryFollowers()
				}
			},
			queryFollowings(){
				this.followingWorkPage++
				let params = {
					offset: this.followingWorkPage,
					pageSize: 10
				}
				if(!this.mine){
					params.userCode = this.userinfo.userCode
				}
				MineApi.myFollowings({
					params
				}).then(res=>{
					this.followingList = this.followingList.concat(res.data)
				}).catch(err=>{
					this.$u.toast(err)
				})
			},
			queryFollowers(){
				this.followerWorkPage++
				let params = {
					offset: this.followerWorkPage,
					pageSize: 10
				}
				if(!this.mine){
					params.userCode = this.userinfo.userCode
				}
				MineApi.myFollowers({
					params
				}).then(res=>{
					this.followerList = this.followerList.concat(res.data)
				}).catch(err=>{
					this.$u.toast(err)
				})
			},
			queryArtFans(rankType){
				let params = {
					rankType:rankType
				}
				if(!this.mine){
					params.userCode = this.userinfo.userCode
				}
				MineApi.artFans({
					params:params
				}).then(res=>{
					this.followerList=[];
					this.followerList = this.followerList.concat(res.data)
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
	
	.u-subsection {
		border-radius: 30rpx !important;
	
		/deep/ .u-item-bg {
			border-radius: 30rpx !important;
		}
	}
</style>