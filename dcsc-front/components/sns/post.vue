<template>
	<view>
		<view :class="detailLevel===0?'panel':'detailPanel'">
			<view class="flex-row-between-center">
				<view style="display: flex;position:relative;width:70%">
					<view @tap="gotoArtistMain" style="height:80rpx;margin-right:20rpx;">
						<view class="headerImg" :style="{backgroundImage:`url(${imgBaseUrl}${content.header}${imgSuffix})`}"></view>
					</view>
					<view style="display: flex;flex-direction: column;justify-content: space-around;width:100%">
						<view style="color:#D8D8D8;font-size:28rpx;width:calc( 100% );word-wrap: break-word;word-break: break-all;">{{ content.nickName }}</view>
						<view style="color:#AAAAAA;font-size:20rpx;">{{ content.createdDate&&$u.timeFormat(content.createdDate, 'yyyy-mm-dd hh:MM:ss') }}</view>
					</view>
				</view>
				<view v-if="detailLevel===1">
					<follow :detail ="content"></follow>
				</view>
			</view>
			<view :style="{margin:detailLevel===0?'0':'0 30rpx'}">
				<view style="margin:30rpx 10rpx 20rpx;">
					<view v-for="(subItem,subIndex) in content.subjectList">
						<span @tap="gotoTopicDetail(subItem.subjectCode)" style="color:#F87171">#{{ subItem.subjectName }}#</span>
					</view>
				</view>
				<view @tap="gotoPostDetail" style="margin:20rpx 10rpx 30rpx;word-wrap: break-word;word-break: break-all;">{{ content.content }}</view>
				<view v-if="content.forRemarks">
					<share-brief :nftDetail="content.forRemarks" status="detail"></share-brief>
				</view>
				<view :style="{width:content.imgCount===4?'420rpx':'100%'}">
					<view v-for="(imgRow,rowIndex) in content.imgs" style="display: flex;justify-content: space-between;margin-bottom:15rpx;" :style="{width:[2].includes(imgRow.length)?'420rpx':'100%'}">
						<view v-for="(imgItem,imgIndex) in imgRow">
							<u-image @tap="handleZoom(rowIndex,imgIndex,content.imgCount===4?2:3)" :src="imgBaseUrl+imgItem+imgSuffix" :width="content.imgCount===1?400:200" :height="content.imgCount===1?'auto':200" :mode="content.imgCount===1?'widthFix':'aspectFill'" border-radius="20"></u-image>
						</view>
					</view>
				</view>
			</view>
			<view v-if="detailLevel==0" style="display: flex;justify-content: space-around;position:relative;margin-top:30rpx;padding-left:10rpx;">
			<!-- 	<view class="opeIcon" @tap="handleRepost">
					<view class="repostIcon"></view>
					<view>{{ content.forward }}</view>
				</view> -->
				<view class="opeIcon" @tap="handleComment">
					<view class="commentIcon"></view>
					<view>{{ content.comment }}</view>
				</view>
				<view class="opeIcon" @tap="handleStore">
					<view v-if="!Number(content.isStore)" class="heartIcon"></view>
					<view v-else class="heartedIcon"></view>
					<view>{{ content.storeUp }}</view>
				</view>
				<view class="opeIcon" @tap="handleLike">
					<view v-if="!Number(content.isLikes)" class="likeIcon"></view>
					<view v-else class="likedIcon"></view>
					<view>{{ content.likes }}</view>
				</view>
			</view>
		</view>
		<view>
			<custom-popup ref="rePostPop">
				<template v-slot>
					<share-sns @closeShare="closeRepost" :brief="content" shareType="post"></share-sns>
				</template>
			</custom-popup>
		</view>
	</view>
</template>

<script>
	import MerchandiseApi from "@/common/apis/merchandise.js"
	import SnsApi from "@/common/apis/sns.js"
	import CustomPopup from "@/components/merchandise/CustomPopup"
	import ShareSns from "@/components/merchandise/ShareSns"
	import ShareBrief from "@/components/sns/ShareBrief"
	import Follow from "@/components/mine/Follow.vue"
	export default{
		props:{
			content:{
				type: Object,
				default(){
					return {}
				}
			},
			detailLevel:{
				type: Number,
				default: 0
			},
		},
		components:{
			CustomPopup,
			ShareSns,
			ShareBrief,
			Follow
		},
		methods:{
			handleZoom(rowIndex,imgIndex,rowCount){
				let urls = this.content.realImgs.map(src=>{
				  return this.imgBaseUrl+src
        })
				let len = urls.length
				uni.previewImage({
					urls,
					current:rowIndex*rowCount+imgIndex,
					success: function () {
						console.log('success');
					}
				});
			},
			gotoTopicDetail(subjectCode){
				uni.navigateTo({
					url:`/pages/sys/sns/topicDetail?topicCode=${subjectCode}`
				})
			},
			handleRepost(){
				this.$refs.rePostPop.show = true
				uni.hideTabBar()
				this.$emit('toggleShare')
			},
			closeRepost(){
				this.$refs.rePostPop.show = false
				uni.showTabBar()
				this.$emit('toggleShare')
			},
			handleComment(){
				uni.navigateTo({
					url:`/pages/sys/sns/postDetail?postCode=${this.content.noteCode}&forComment=true`
				})
			},
			handleStore(){
				SnsApi.postStoreUp({
					params:{
						noteCode:this.content.noteCode
					}
				}).then(res=>{
					this.$set(this.content,'isStore',res.isStore)
					this.$set(this.content,'storeUp',res.storeUp)
				}).catch(err=>{
					this.$u.toast(err)
				})
			},
			handleLike(){
				SnsApi.postLike({
					params:{
						noteCode:this.content.noteCode
					}
				}).then(res=>{
					this.$set(this.content,'isLikes',res.isLikes)
					this.$set(this.content,'likes',res.likes)
				}).catch(err=>{
					this.$u.toast(err)
				})
			},
			gotoPostDetail(){
				// SnsApi.postDetail({
				// 	params:{
				// 		noteCode:this.content.noteCode
				// 	}
				// }).then(res=>{
					uni.navigateTo({
						url:`/pages/sys/sns/postDetail?postCode=${this.content.noteCode}`
					})
				// }).catch(err=>{
				// 	this.$u.toast(err)
				// })
			},
			gotoArtistMain(){
				uni.navigateTo({
					url:`/pages/sys/merchandise/artistMain?userCode=${this.content.userCode}`
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/css/index.scss";

	.panel{
		width:100%;
		background-image:linear-gradient(to bottom right, rgb(44,44,48), rgb(24,24,28), rgb(44,44,48));
		border-radius: 24rpx;
		border: 2rpx solid #444;
		padding: 30rpx;
		margin-bottom:20rpx;
	}
	.detailPanel{
		background-color: #2A2A34;
		padding: 30rpx;
		margin-bottom:20rpx;
	}
	.headerImg{
		width:80rpx;
		height:80rpx;
		background-size: cover;
		background-position: center;
		border-radius:40rpx;
	}
	.opeIcon{
		width:100rpx;
		height:40rpx;
		display: flex;
		.repostIcon,.commentIcon,.heartIcon,.heartedIcon,.likeIcon,.likedIcon{
			width:40rpx;
			height:40rpx;
			background-size: 100% 100%;
			margin-right:20rpx;
		}
		.repostIcon{
			background-image: url('@/static/common/img/sns/share.png');
		}
		.commentIcon{
			background-image: url('@/static/common/img/sns/Chat.png');
		}
		.heartIcon{
			background-image: url('@/static/common/img/merchandise/detail/Heart.png');
		}
		.heartedIcon{
			background-image: url('@/static/common/img/merchandise/detail/Heart-B.png');
		}
		.likeIcon{
			background-image: url('@/static/common/img/sns/like.png');
		}
		.likedIcon{
			background-image: url('@/static/common/img/sns/like-B.png');
		}
	}


</style>
