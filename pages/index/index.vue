<template>
	<view class="content">
		<!-- 吸顶内容 -->
		<u-sticky>
			<view class="sticky">
				<view class="left-group">
					<view class="year">{{year}}</view>
					<view class="month-group" @click="show = true">
						<view class="month">{{month}}月</view>
						<u-icon name="arrow-down-fill"></u-icon>
						<u-picker v-model="show" mode="time" :params="params" @confirm="pickerConfirm"></u-picker>
					</view>
				</view>
				<view class="right-group">
					<view class="top-group">
						<view class="income">收入: {{income}}</view>
						<view class="expenditure">支出: {{expenditure}}</view>
					</view>
					<view class="total">总计: {{total}}</view>
				</view>
			</view>
		</u-sticky>
		<!-- billList -->
		<bills :billList="billList" :removeYearAndMonth="true"></bills>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import bills from 'components/bills/bills.vue';
	export default {
		data() {
			return {
				billList: [],
				show: false,
				params: {
					year: true,
					month: true
				},
				date: ''
			}
		},
		components: {
			bills
		},
		onLoad() {
			this.date = new Date();
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
					name: 'getBillsByDate',
					data: {
						date: this.date,
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
			pickerConfirm(event) {
				this.date = new Date(event.year, event.month - 1);
				uni.startPullDownRefresh();
			}
		},
		computed: {
			...mapState(['isLogined']),
			year() {
				return typeof(this.date) != 'string' ? this.date.getFullYear() : (new Date()).getFullYear();
			},
			month() {
				return typeof(this.date) != 'string' ? this.date.getMonth() + 1 : (new Date()).getMonth() + 1;
			},
			income() {
				let sum = 0;
				this.billList.forEach(item => {
					item.bills.forEach(bill => {
						if (bill.type == 'income') {
							sum += bill.count;
						}
					});
				});
				return sum;
			},
			expenditure() {
				let sum = 0;
				this.billList.forEach(item => {
					item.bills.forEach(bill => {
						if (bill.type == 'expenditure') {
							sum += bill.count;
						}
					});
				});
				return -sum;
			},
			total() {
				let sum = 0;
				this.billList.forEach(item => {
					sum += item.count;
				});
				return sum;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sticky {
		width: 100%;
		height: 165rpx;
		padding: 40rpx;
		display: flex;
		background-color: #2b85e4;

		.left-group {
			display: flex;
			flex-direction: column;
			margin-right: 20rpx;

			.year {
				color: $u-tips-color;
				text-align: center;
				font-size: 40rpx;
			}

			.month-group {
				display: flex;

				.month {
					color: #FFFFFF;
					font-size: 50rpx;
				}
			}
		}

		.right-group {
			flex: 1;
			color: #FFFFFF;
			font-size: 45rpx;

			.top-group {
				display: flex;
				justify-content: space-between;
			}

			.total {
				text-align: center;
			}
		}
	}
</style>
