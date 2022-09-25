<template>
	<view class="wrap">
		<view class="pageHeader">
			<u-icon style="font-size:40rpx;" name="close" @tap="showConfirm"></u-icon>
			添加话题
			<view @tap="saveTopics" class="button" style="width:120rpx;height:50rpx;border-radius:21rpx;font-size:20rpx;line-height:50rpx;">保存</view>
		</view>
		<view style="padding:0 30rpx">
			<view style="padding:30rpx;">
				<view v-for="(topicItem,topicIndex) in selectedTopics">
					<span class="hotWordBg">
						<span class="hotWordLayer0"></span>
						<span class="hotWordLayer1" style="display: flex;">
							#{{ topicItem.subjectName }}# 
							<u-icon @tap="deleteTopic(topicItem)" style="font-size:40rpx;margin-left:10rpx;" name="close-circle-fill"></u-icon>
						</span>
					</span>
				</view>
			</view>
			<scroll-view scroll-y="true" @scrolltolower="loadMoreTopics" style="height:calc( 100vh - 550rpx )">
				<view class="card" style="padding:15rpx 32rpx;" v-for="content in topics">
					<topic @checkChange="checkChange" :content="content" :detailLevel="1" opeType="check"></topic>
				</view>
			</scroll-view>
		</view>
		<custom-confirm ref="quitConfirm" @confirmOk="customGoBack">当前选择的话题列表尚未保存，确定放弃并返回？</custom-confirm>
	</view>
</template>

<script>
	import SnsApi from "@/common/apis/sns.js"
	import topic from "@/components/sns/topic"
	import CustomConfirm from "@/components/sns/CustomConfirm"
	export default{
		data(){
			return{
				topics:[],
				workPage:-1,
				selectedTopics:[]
			}
		},
		props:{
			initial:{
				type:Array,
				default(){
					return[]
				}
			}
		},
		components: {
			topic,CustomConfirm
		},
		mounted(){
			this.selectedTopics = this.initial.concat()
			this.loadMoreTopics()
		},
		methods:{
			deleteTopic(content){
				content.checked = false
				let len = this.topics.length
				for(let i=0;i<len;i++){
					if(this.topics[i].subjectCode===content.subjectCode){
						this.topics[i].checked = false
						break
					}
				}
				this.checkChange(content)
			},
			checkChange(content){
				if(content.checked){
					if(this.selectedTopics.length>=5){
						content.checked = false
						this.$u.toast('最多添加5个话题')
						return
					}
					this.selectedTopics.push(content)
				}else{
					this.selectedTopics = this.selectedTopics.filter(item=>{
						return item.subjectCode!==content.subjectCode
					})
				}
			},
			loadMoreTopics(){
				this.workPage++
				SnsApi.moreContent({
					params:{
						offset:this.workPage,
						pageSize:10,
						subjectType:'6'
					}
				}).then(res=>{
					let selectedCodeList = this.selectedTopics.map(topic=>topic.subjectCode)
					res.data.forEach(topic=>{
						topic.checked = selectedCodeList.includes(topic.subjectCode)
					})
					this.topics = this.topics.concat(res.data)
				})
			},
			saveTopics(){
				this.$emit("save",this.selectedTopics)
			},
			showConfirm(){
				this.$refs.quitConfirm.showup()
			},
			customGoBack(){				
				this.$emit("close")
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/css/index.scss";
	
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
			width:100%;
			height:100%;
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
	
	.deleteTopic{
		width:30rpx;
		height:30rpx;
		background-image: url("@/static/common/img/sns/delete.png");
		background-size: 100% 100%;
		
	}
</style>