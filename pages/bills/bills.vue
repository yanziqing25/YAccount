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
		methods: {
			loadBills() {
				wx.cloud.callFunction({
					name: 'getBills'
				}).then(res => {
					this.billList = res.result;
					uni.stopPullDownRefresh();
				});
			},
		}
	}
</script>

<style>

</style>
