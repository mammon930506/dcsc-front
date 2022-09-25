<template>
	<view style="overflow:visible;width:200rpx;height:260rpx;position:relative;border-radius: 48rpx;background-color:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);display:flex;flex-direction:column;justify-content: space-around;align-items:center;padding:10rpx 0 40rpx 0;">
		<!-- <image @tap='gotoArtistMain' :src="'./'+brief.headerImg" style="width:130rpx;height:130rpx;border-radius:65rpx" mode="aspectFill"></image> -->
		<view @tap='gotoArtistMain' style="width:130rpx;height:130rpx;border-radius:65rpx;background-size:cover;background-position: center;" :style="{backgroundImage:`url(${imgBaseUrl}${brief.headerImg}${imgSuffix})`}"></view>
		<view style="text-align: center;">
			<view style="font-size:28rpx;">{{ brief.nickName }}</view>
			<view style="font-size:20rpx;color:#9CA3AF">{{ brief.fans }}粉丝</view>
		</view>
		<view :ref="refName" @tap="followArtist" :class="brief.isAttention?'following':'unfollowing'"></view>
	</view>
</template>

<script>
	import SnsApi from "@/common/apis/sns.js"
	export default{
		data(){
			return {
				refName:'',
				refObj:undefined
			}
		},
		props:{
			brief:{
				type: Object,
				defualt(){
					return {}
				}
			},
		},
		mounted(){
			this.refName = 'user'+this.brief.userCode
			this.$nextTick(()=>{
				this.refObj = this.$refs[this.refName].$el
			})
		},
		methods:{
			toggleFollow(){
				if(Number(this.brief.isAttention)===1){
					this.refObj.className = this.refObj.className.replace(' doUnfo','')
					this.refObj.className = this.refObj.className + " doFo"
				}else{
					this.refObj.className = this.refObj.className.replace(' doFo','')
					this.refObj.className = this.refObj.className + " doUnfo"
				}
			},
			followArtist(){
				SnsApi.followUser({
					params:{
						userCode:this.brief.userCode
					}
				}).then(res=>{
					this.$set(this.brief,'isAttention',res.isAttention)
					this.$u.toast(Number(res.isAttention)===1?"关注成功":"取关成功")
					this.toggleFollow()
				}).catch(err=>{
					this.$u.toast(err)
				})
			},
			gotoArtistMain(){
				uni.navigateTo({
					url:`/pages/sys/merchandise/artistMain?userCode=${this.brief.userCode}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/css/index.scss";
	.following,.unfollowing{
		position:absolute;
		bottom:-22rpx;
		left:calc( 50%-25rpx );
		background-image:url('@/static/common/img/index/recommend/follow.png');
		width:50rpx;
		height:50rpx;
		background-size:100% 100%;
	}
	.following{
		transform-origin: 50% 50%;
		transform: rotate(45deg);
	}

	.doFo{
		animation: followAni 0.5s normal forwards;
	}
	.doUnfo{
		animation: unfollowAni 0.5s normal forwards;
	}
	@keyframes followAni{
		0% {
			transform: scale(1) rotate(0);
		}
		50% {
			transform: scale(1.8) rotate(60deg);
		}
		100% {
			transform: scale(1) rotate(135deg);
		}
	}
	@keyframes unfollowAni{
		0% {
			transform: scale(1) rotate(135deg);
		}
		50% {
			transform: scale(1.8) rotate(60deg);
		}
		100% {
			transform: scale(1) rotate(0);
		}
	}
</style>
