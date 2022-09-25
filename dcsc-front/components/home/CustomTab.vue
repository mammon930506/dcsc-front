<template>
	<view style="padding-top:22rpx;width:100%;height:78rpx;display:flex;justify-content:space-around;">
		<view v-for="(item,index) in navList" @tap="navChange(item,index)">
			<view v-if="index==current" class="active" style="position:relative;background-image: url('static/common/img/login/Button@3x.png');background-size:100% 100%; ">
				<view style="width:104%;font-size:32rpx;background-color: #18181c;color:#fff;mix-blend-mode: darken;">{{ item.name }}</view>
			</view>
			<view v-else style="font-size:32rpx;color:#fff;">{{ item.name }}</view>
			<view v-if="index==current" style="margin-top:6rpx;height:10rpx;background-image:url('static/common/img/index/bottom/colorbottom.png');background-size:100% 100%"></view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				current:1
			}
		},
		props:{
			navList:{
				type:Array,
				default(){
					return []
				}
			}
		},
		methods:{
			navChange(item,index){
				this.current=index
				this.$emit('navChange',item.value)
			}
		}
	}
</script>

<style lang="scss" scoped>
  
</style>