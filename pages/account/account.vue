<template>
	<view>
		<u-sticky>
			<u-tabs-swiper ref="uTabs" :list="list" :is-scroll="false" :current="current" @change="tabsChange"></u-tabs-swiper>
		</u-sticky>
		<swiper style="height: 1000rpx;" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<!-- 支出页 -->
			<swiper-item>
				<expenditure></expenditure>
			</swiper-item>
			<!-- 收入页 -->
			<swiper-item>
				<income></income>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import income from 'components/income/income.vue';
	import expenditure from 'components/expenditure/expenditure.vue';
	export default {
		data() {
			return {
				list: [{
						name: '支出'
					},
					{
						name: '收入'
					},
				],
				current: 0,
				swiperCurrent: 0,
			};
		},
		components: {
			income,
			expenditure
		},
		methods: {
			tabsChange(index) {
				this.swiperCurrent = index;
			},
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
		}
	}
</script>

<style lang="scss" scoped>
</style>
