<template>
	<view>
		<bills :billList="billList" :removeYearAndMonth="false"></bills>
	</view>
</template>

<script>
	import bills from 'components/bills/bills.vue';
	export default {
		data() {
			return {
				billList: []
			}
		},
		components: {
			bills
		},
		onShow() {
			uni.startPullDownRefresh();
		},
		onPullDownRefresh() {
			this.loadBills();
		},
		onReachBottom() {
			this.loadBills(this.billList.length)
		},
		methods: {
			loadBills(start = 0) {
				wx.cloud.callFunction({
					name: 'getBills',
					data: {
						start
					}
				}).then(res => {
					const list = res.result;
					if (start == 0) {
						this.billList = list;
					} else {
						this.billList.push(...list);
					}
					uni.stopPullDownRefresh();
				});
			},
		}
	}
</script>

<style>

</style>
