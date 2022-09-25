<template>
	<view class="wrap">
		<u-waterfall v-model="copyFlowList" ref="uWaterfall">
			<template v-slot:left="{leftList}">
				<view class="workBox" v-for="(item,index) in leftList" :key="index">
					<slot :item="item"></slot>
				</view>
			</template>
			<template v-slot:right="{rightList}">
				<view class="workBox" v-for="(item,index) in rightList" :key="index">
					<slot :item="item"></slot>
				</view>
			</template>
		</u-waterfall>
	</view>
</template>

<script>
	import HomeApi from "@/common/apis/home.js"
	export default {
		data() {
			return {
				copyFlowList:[]
			}
		},
		watch:{
			flowList(){
				this.copyFlowList = JSON.parse(JSON.stringify(this.flowList))
			}
		},
		props: {
			flowList: {
				type: Array,
				default () {
					return []
				}
			}
		},
		onLoad() {

		},
		methods: {
			clearFlow(){
				this.$refs.uWaterfall.clear()
			}
		}
	}
</script>
...
<style lang='scss' scoped>
	/* .workBox{
		padding:0 15rpx;
		height: 340rpx;
		width:100%;
	} */
</style>
