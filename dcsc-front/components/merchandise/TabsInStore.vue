<template>
	<view style="width:100%;display:flex;justify-content:space-around;">
		<view v-for="(item,index) in navList" @tap="navChange(index,item)">
			<view v-if="index==current" class="active activeNav">
				<view :style="{backgroundColor:bgColor}" style="width:104%;font-size:32rpx;color:#fff;mix-blend-mode: darken;">
					{{ item.name }}{{ item.affix }}
				</view>
			</view>
			<view v-else style="font-size:32rpx;" :style="{color:inactiveColor}">{{ item.name }}{{ item.affix }}</view>
			<view v-if="index==current" class="tabBottom"></view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				current:0,
				lastCurrent:0
			}
		},
		props:{
			initial:{
				type:Number,
				default(){
					return 0
				}
			},
			navList:{
				type:Array,
				default(){
					return []
				}
			},
			bgColor:{
				type:String,
				default:"#2A2A34"
			},
			inactiveColor:{
				type:String,
				default:"#AAAAAA"
			}
		},
		mounted(){
			this.current =this.initial 
		},
		methods:{
			navChange(index,item){
				this.lastCurrent = this.current
				this.current = index
				this.$emit("navChange",index,item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.activeNav{
		position:relative;
		background-image: url('@/static/common/img/login/Button@3x.png');
		background-size:100% 100%; 
	}
	.tabBottom{
		margin-top:6rpx;
		height:10rpx;
		background-image:url('@/static/common/img/index/bottom/colorbottom.png');
		background-size:100% 100%;
	}
</style>