<template>
	<view  class="catePanel" :style="{backgroundImage:isExtend?'linear-gradient(to bottom right, rgba(44,44,48,0.8), rgba(24,24,28,0.8), rgba(44,44,48,0.8))':'none'}">
		<!-- #ifdef APP-PLUS -->
		<view :animation="titleAnimation" class="cateTitle" :style="{height:title}"><view>全部类别</view></view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view :animation="titleAnimation" class="cateTitle"><view>全部类别</view></view>
		<!-- #endif -->
		<!-- <span class="cateBtn active">艺术照</span> -->
		<!-- #ifdef APP-PLUS -->
		<view :animation="mainAnimation" class="cateMain" :style="{height:main}">
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view :animation="mainAnimation" class="cateMain">
		<!-- #endif -->
			<view v-if="!isExtend" class="extendIcon" @tap="toggleExtend(true)"><u-icon name="list-dot"></u-icon></view>
			<span v-for="cate in classifyList" @tap="changeActive(cate)"  class="cateBtn" :class="{'normal':!cate.isActive,'active':cate.isActive}">{{ cate.classifyName }}</span>
		</view> 
	</view>
</template>

<script>
	import MerchandiseApi from "@/common/apis/merchandise.js"
	export default{
		data(){
			return{
				classifyList:[],
				titleAnimation:undefined,
				titleHeight:0,
				mainAnimation:undefined,
				mainHeight:0,
				main:"auto",
				title:"auto",
				oneRowHeight:30,
				isExtend:false,
				currentActiveCode:undefined
			}
		},

		mounted(){
			MerchandiseApi.classifyType().then(res=>{
				this.classifyList.forEach(cate=>{
					cate.isActive = false
				})
				this.classifyList = res.data
				// #ifdef APP-PLUS
				this.$nextTick(()=>{
					const query = uni.createSelectorQuery().in(this);
					query.select('.cateTitle').boundingClientRect(data => {
					  this.titleHeight = data.height
					  
					}).exec();
					query.select('.cateMain').boundingClientRect(data => {
						
					  this.mainHeight = data.height
					}).exec();
					this.title=0+'px'
					this.main=this.oneRowHeight+'px'
				})
				// #endif
				// #ifdef H5
				this.$nextTick(()=>{
					let title = document.querySelector(".cateTitle")
					let main = document.querySelector(".cateMain")
					this.titleHeight = title.clientHeight
					this.mainHeight = main.clientHeight
					title.style.height = 0+"px"
					main.style.height = this.oneRowHeight+"px"
				})
				// #endif

			})
		},
		methods:{
			changeActive(cateTapped){
				if(cateTapped.classifyCode===this.currentActiveCode){
					this.classifyList.forEach(cate=>{
						if(cate.classifyCode===cateTapped.classifyCode){
							this.$set(cate,'isActive',false)
							this.currentActiveCode = undefined
							this.$emit("changeActive",undefined)
						}
					})
				}else{
					this.classifyList.forEach(cate=>{
						if(cate.classifyCode===cateTapped.classifyCode){
							this.$set(cate,'isActive',true)
							this.currentActiveCode = cateTapped.classifyCode
							this.$emit("changeActive",cate.classifyCode)
						}else{
							this.$set(cate,'isActive',false)
						}
					})
				}
			},
			toggleExtend(isExtend){
				if(this.isExtend === isExtend)return
				this.isExtend = isExtend
				this.titleAnimation= uni.createAnimation({
					duration: 300,
					timingFunction: 'ease',
				})
				this.titleAnimation.height(this.isExtend?this.titleHeight:0).step();
				this.titleAnimation = this.titleAnimation.export()
				this.mainAnimation = uni.createAnimation({
					duration: 300,
					timingFunction: 'ease',
				})
				this.mainAnimation.height(this.isExtend?this.mainHeight:this.oneRowHeight).step();
				this.mainAnimation = this.mainAnimation.export()
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/css/index.scss";
	.catePanel{
		position:absolute;
		padding:0 20rpx;
		width:100%;
		z-index:1;
		border-radius:56rpx;
	}
	.cateTitle{
		color:#D8D8D8;
		font-size:32rpx;
		text-align: center;
		overflow: hidden;
		&>view{
			padding:30rpx;
		}
	}
	.cateBtn{
		display: inline-block;
		height: 28px;
		line-height: 28px;
		border-radius: 30rpx;
		font-size: 24rpx;
		padding:0 32rpx;
		margin:0 10rpx;
		margin-bottom:20rpx;
	}
	.cateBtn.active {
		color: #ffffff;
		border: 1rpx solid transparent;
		background-size: 100% 100%;
		background-image: url("@/static/common/img/index/recommend/colorfulbg.png");
		background-repeat: no-repeat;
	}
	.cateBtn.normal{
		color:#D8D8D8;
		border:1rpx solid #444;
		background-image:linear-gradient(to bottom right, rgb(44,44,48), rgb(24,24,28), rgb(44,44,48));
	}
	.cateMain{
		position:relative;
		overflow: hidden;
	}
	.extendIcon{
		width:64rpx;
		height:30px;
		background-color: #18181c;
		line-height:30px;
		text-align: center;
		position:absolute;
		right:0;
		top:0;
		margin-bottom:20rpx;
	}
</style>