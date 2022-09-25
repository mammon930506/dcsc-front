<template>
	<view>
		<view style="display: flex;justify-content: space-between;">
			<view style="display: flex;position:relative;width:100%;">
				<view @tap="gotoTopicDetail" style="height:94rpx;margin-right:10rpx;">
					<view v-if="detailLevel<=0" class="wellIcon"></view>
					<view v-else class="topicImg" :style="{backgroundImage:`url(${imgBaseUrl}${content.imgs}${imgSuffix})`}"></view>
				</view>
				<view @tap="gotoTopicDetail" :style="{width:detailLevel>=1?'calc( 100% - 170rpx )':'calc( 100% - 70rpx )'}" style="display: flex;flex-direction: column;justify-content: space-around;">
					<view :class="{nowrapellipsis:detailLevel<=1}" style="color:#D8D8D8;font-size:28rpx;word-wrap: break-word;word-break: break-all;">
						<span v-if="detailLevel>0">#</span>{{ content.subjectName }}<span v-if="detailLevel>0">#</span>
					</view>
					<view style="color:#AAAAAA;font-size:20rpx;">
						<view v-if="detailLevel<=1">{{ content.noteNum }}条讨论</view>
						<view v-else style="display: flex;">
							<view style="margin-right:120rpx;">{{ content.historyCount }}浏览量</view>
							<view>{{ content.participantsCount }}参与</view>
						</view>
					</view>
				</view>
				<view v-if="detailLevel>=1" style="display: flex;align-items:center">
					<view v-if="opeType==='store'" @tap="handleFav" :class="[content.isStore?'redHeart':'normalHeart']" style="width:40rpx;height:40rpx;background-size:100% 100%" ></view>
					<view v-else-if="opeType==='check'">
						<u-checkbox shape="circle" size="40" v-model="content.checked"  @change="checkChange(content)" active-color="#7A83D2"></u-checkbox>
					</view>
				</view>
			</view>
		</view>
		<view v-if="detailLevel>=2" style="color:#D8D8D8;font-size:20rpx;padding:20rpx 10rpx 0">{{ content.content }}</view>
	</view>
</template>

<script>
	import SnsApi from "@/common/apis/sns.js"
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
			opeType:{
				type: String,
				default(){
					return 'store'
				}
			}
		},
		methods:{
			gotoTopicDetail(){
				if(this.detailLevel===2||(this.detailLevel===1&&this.opeType==='check'))return
				uni.navigateTo({
					url:`/pages/sys/sns/topicDetail?topicCode=${this.content.subjectCode}`
				})
			},
			checkChange(content){
				this.$nextTick(()=>{
					this.$emit('checkChange',content)
				})
			},
			handleFav(){
				SnsApi.topicStoreUp({
					params:{
						subjectCode:this.content.subjectCode
					}
				}).then(res=>{
					this.$set(this.content,'isStore',res.isStore)
				}).catch(err=>{
					this.$u.toast(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/css/index.scss";
	.wellIcon{
		width:50rpx;
		height:50rpx;
		background-image: url("@/static/common/img/sns/well.png");
		background-size:100% 100%;
	}
	.topicImg{
		width:94rpx;
		height:94rpx;
		border-radius:47rpx;
		background-size:cover;
		background-position:center;
		margin-right:10rpx;
	}
</style>
