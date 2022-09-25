<template>
	<view style="position:relative;text-align: center;">
		<view @tap="togglePanel">
			<view v-if="toggleSelected" class="item">{{ list[currentIndex] }}  <u-icon :name="panelShow?'arrow-down':'arrow-up'"></u-icon></view>
			<view v-else class="item">
				<slot></slot>
				<u-icon v-if="iconShow" :name="panelShow?customIconDownName:customIconUpName" :style="customIconStyle"></u-icon>
			</view>
		</view>
		<view class="panel" v-show="panelShow">
			<view class="item" v-for="(item,index) in list" :style="index===currentIndex?activeItem:{}" @tap="cateChange(index)">
				{{ item }}
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				panelShow:false,
				currentIndex:0
			} 
		},
		props:{
			list:{
				type: Array,
				default(){
					return ['']
				}
			},
			defaultIndex:{
				default: 0
			},
			toggleSelected:{
				type:Boolean,
				default:true
			},
			iconShow:{
				type:Boolean,
				default:false,
			},
			customIconUpName:{
				type:String,
				default:'arrow-up'
			},
			customIconDownName:{
				type:String,
				default:'arrow-down'
			},
			customIconStyle:{
				type:Object,
				default(){
					return {}
				}
			},
			activeItem:{
				type:Object,
				default(){
					return{
						'fontWeight': 'bold',
						'color':'white',
					}
				}
			}
		},
		watch:{
			defaultIndex:{
				handler(){
					this.currentIndex = this.defaultIndex
				}
			}
		},
		methods:{
			togglePanel(){
				this.panelShow = !this.panelShow
				if(this.panelShow){
					this.$emit('showPanel')
				}
			},
			cateChange(index){
				this.currentIndex = index
				this.panelShow =false
				this.$emit('cateChange',index)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.panel{
		width:100%;
		background-image:linear-gradient(to bottom right, rgb(44,44,48), rgb(24,24,28), rgb(44,44,48));
		border-radius: 24rpx;
		border: 2rpx solid #444;
		overflow:scroll;
		padding: 10rpx 30rpx 20rpx;
		position:absolute;
		font-size:24rpx;
		z-index:1;
		.item{
			border-bottom:2rpx solid #D8D8D8;
		}
	}
	.item{
		color:#D8D8D8;
		line-height:60rpx;	
	}
</style>