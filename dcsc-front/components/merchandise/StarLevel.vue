<template>
	<view style="width:160rpx;display:flex;justify-content: space-between;">
		<view v-for="i in fullCount" class="star fullStar"></view>
		<view v-for="i in halfCount" class="star halfStar"></view>
		<view v-for="i in emptyCount" class="star emptyStar"></view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				fullCount:0,
				halfCount:0,
				emptyCount:5
			}
		},
		props:{
			level:{
				default:5
			}
		},
		watch:{
			level:{
				immediate:true,
				handler(){
					this.fullCount = Math.floor(this.level)
					if(this.fullCount<this.level){
						this.halfCount = 1
					}
					this.emptyCount= 5-this.fullCount - this.halfCount
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.star{
		width:25rpx;
		height:25rpx;
		background-size: 100% 100%;
	}
	.fullStar{
		background-image:url('@/static/common/img/merchandise/store/Star-B.png')
	}
	.halfStar{
		background-image:url('@/static/common/img/merchandise/store/Star-B-half.png')
	}
	.emptyStar{
		background-image:url('@/static/common/img/merchandise/store/Star.png')
	}
</style>