<template>
	<view>
		<u-swiper-with-slot @click="test" effect3d-previous-margin="100" :list="flowList" height="600" :effect3d="true" :autoplay="false" bg-color="#18181c"
		border-radius="56" mode="none">
			<template v-slot='{item}'>
				<slot :item="item"></slot>
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