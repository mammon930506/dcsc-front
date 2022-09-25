<template>
	<view class="wrap">
		<headnavbar title="设置" :haveBack="false" :customTitle="true">
			<template slot="left">
				<u-icon style="font-size:40rpx;" name="close" @tap="showConfirm"></u-icon>
			</template>
			<template slot="center">
				<view class="centercover avatar" :style="{backgroundImage:`url(${imgBaseUrl}${my.header}${imgSuffix})`}"></view>
			</template>
			<template slot="right">
				<view @tap="postPublish" class="plane"></view>
			</template>
		</headnavbar>
		<view style="padding:0 50rpx">
			<scroll-view scroll-y="true" style="height:calc( 100vh - 100rpx );">
				<view style="padding-top:20rpx;">
					<u-field class="postEdit" v-model="postForm.content" label-width="0" type="textarea" :border-bottom="false"
					:clearable="false" placeholder="请输入笔记" >
					</u-field>
				</view>
				<view v-if="repostType==='merchandise'">
					<share-brief :nftDetail="nftDetail" status="edit"></share-brief>
				</view>
				<view>
					<u-upload class="postUpload" :auto-upload="true" :preview-full-image="true" :multiple="true"
					 @on-choose-complete="imgUploadStart" @on-uploaded="imgUploaded" :max-count="9" @on-remove="imgRemove"
					 :action="`${apiUrl}/api/client/file/v1/upload`" max-size="10*1024*1024"
					 ></u-upload>
				</view>
				<view @tap="gotoSelectTopics">
					<view style="display: flex;justify-content: space-between;align-items:center;margin-bottom:20rpx;">
						<span class="hotTitle"><span class="innerHotTitle">添加合适的话题会让更多人看到({{ savedCount }}/{{ allCount }})</span></span>
						<span class="hotTitle"><span class="innerHotTitle"><u-icon name="arrow-right" size="34"></u-icon></u-icon></span></span>
					</view>
				</view>
				<view v-for="(topicItem,topicIndex) in savedTopics">
					<span class="hotWordBg">
						<span class="hotWordLayer0"></span>
						<span class="hotWordLayer1" style="display: flex;">
							#{{ topicItem.subjectName }}#
						</span>
					</span>
				</view>
			</scroll-view>
		</view>
		<view v-if="selectTopics" style="z-index:11;position:absolute;width:100vw;height:100vh;top:0;background-color:#18181c">
			<select-topics :initial="savedTopics" @close="selectTopics=false" @save="handleSave"></select-topics>
		</view>
		<custom-confirm ref="quitEditConfirm" @confirmOk="customGoBack">当前编辑的笔记尚未保存，确定放弃并返回？</custom-confirm>
	</view>
</template>

<script>
	import headnavbar from "@/components/headnavbar/index.vue"
	import SnsApi from "@/common/apis/sns.js"
	import MerchandiseApi from "@/common/apis/merchandise.js"
	import selectTopics from "@/components/sns/selectTopics"
	import CustomConfirm from "@/components/sns/CustomConfirm"
	import ShareBrief from "@/components/sns/ShareBrief"
	export default{
		data(){
			return{
				postForm:{
					title:'title',
					content:'',
					imgs:'',
					subjectCode:''
				},
				imgList:[],
				allCount:5,
				savedCount:0,
				selectTopics:false,
				savedTopics:[],
				repostType:'',
				nftDetail:{},
				my:{},
				withTopic:undefined,
				imgLoading:false
			}
		},
		components:{
			headnavbar,selectTopics,CustomConfirm,ShareBrief
		},
		onLoad(option){
			this.withTopic = option.withTopic
			if(this.withTopic){
				this.savedTopics.push({
					subjectCode:option.topicCode,
					subjectName:option.topicName,
				})
			}
			this.repostType = option.repostType
			this.nftDetail.nftCode = option.nftCode
			if(option.contentDesc!=="undefined"){
				this.postForm.content=option.contentDesc
			}
			;
			SnsApi.myInfo().then(res=>{
				this.my = res
			}).catch(err=>{
				this.$u.toast(err)
			})
			if(this.repostType==='merchandise'){
				MerchandiseApi.info({
					params:{
						nftCode:this.nftDetail.nftCode
					}
				}).then(res=>{
					this.nftDetail = res
				}).catch(err=>{
					this.$u.toast(err)
				})
			}
		},
		methods:{
			imgUploadStart(){
				this.imgUploading = true
			},
			imgUploaded(lists, name){
				this.imgList = lists
				this.imgUploading = false
			},
			imgRemove(index, lists, name){
				this.imgList = lists
			},
			postPublish(){
				let content = this.postForm.content
				let noContent = !content||content.trim().length===0
				let noImg = this.imgList.length===0
				if(noContent){
					if(noImg){
						this.$u.toast("请输入笔记内容")
						return
					}else{
						this.postForm.content = "分享图片"
					}
				}
				if (this.imgUploading) {
					return this.$u.toast('图片正在上传中，请稍等再提交')
				}
				if(this.repostType==='merchandise'){
					this.postForm.noteType = '4'
					let {nftImg,issueCount,nftName,price,nftCode,userCode} = this.nftDetail
					let temp = {nftImg,issueCount,nftName,price,nftCode}
					this.postForm.nftCode = nftCode
					this.postForm.nftName = nftName
					this.postForm.userCode = userCode
					this.postForm.remarks = JSON.stringify(temp)
				}
				let temp = this.savedTopics.map(t=>t.subjectCode)||[]
				this.postForm.subjectCode = temp.join(',')
				let temp1 = this.imgList.map(i=>i.response)||[]
				this.postForm.imgs = JSON.stringify(temp1)
				uni.showLoading({
					title:'正在提交...',
					mask: true
				})
				if(this.repostType==='merchandise'){
					SnsApi.forward({
						params:JSON.parse(JSON.stringify(this.postForm))
					}).then(res=>{
						uni.hideLoading()
						this.$u.toast('分享成功，请到社区查看')
						setTimeout(()=>{
							this.customGoBack()
						},500)
					}).catch(err=>{
						uni.hideLoading()
						this.$u.toast(err)
					})
				}else{
					SnsApi.postPublish({
						params:JSON.parse(JSON.stringify(this.postForm))
					}).then(res=>{
						uni.hideLoading()
						this.$u.toast('分享成功，请到社区查看')
						setTimeout(()=>{
							this.customGoBack()
						},500)
					}).catch(err=>{
						uni.hideLoading()
						this.$u.toast(err)
					})
				}
			},
			customGoBack(){
				uni.navigateBack({
					delta:1
				})
			},
			gotoSelectTopics(){
				this.selectTopics = true
			},
			handleSave(topicList){
				this.savedTopics = topicList
				this.savedCount= topicList.length
				this.selectTopics = false
			},
			showConfirm(){
				this.$refs.quitEditConfirm.showup()
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
	@import "@/common/css/mixin.scss";
	@import "@/common/css/index.scss";
	
	.avatar{
		@include wh(80rpx,80rpx)
	}

	.plane{
		@include wh(48rpx,48rpx);
		background-size: 100% 100%;
		background-image: url("@/static/common/img/sns/plane.png");
	}

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
			@include wh(100%,100%);
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

	.postEdit{
		padding:0 !important;
	}
	.postUpload{
		margin: 30rpx 0;
		/deep/ .u-list-item{
			margin: 8rpx !important;
			background-color: #18181c;
			border:2rpx solid #D8D8D8;
			/deep/ .u-add-tips{
				display: none;
			}
		}
		/deep/ .u-add-wrap{
			color: #D8D8D8 !important;
		}
	}

</style>
