<template>
	<view>
		<u-swiper-with-slot @click="test" :list="groupList" height="300" :autoplay="false" :circular="false" bg-color="#18181c"
		border-radius="56" mode="none">
			<template v-slot='{item}'>
				<view style="overflow:visible;display: flex;justify-content: space-around;" :style="{width:item.length/groupCount*100+'%'}">
					<slot v-for="single in item" :item="single" ></slot>
				</view>
			</template>
		</u-swiper-with-slot>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			flowList: {
				type: Array,
				default () {
					return []
				}
			},
			groupCount:{
				type:Number,
				default: 3
			}
		},
		computed:{
			groupList(){
				let tempRes = []
				let temp = this.flowList.concat()
				while(temp.length>=this.groupCount){
					tempRes.push(temp.splice(0,this.groupCount))
				}
				if(temp.length>0){
					tempRes.push(temp)
				}
				return tempRes
			}
		},
		methods: {
			test(index){

			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
