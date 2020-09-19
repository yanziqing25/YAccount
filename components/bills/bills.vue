<template>
	<view>
		<view class="bills" v-for="item in billList" :key="item._id.date">
			<view class="top-group">
				<view class="date">{{item._id.date | timeFilter({removeYearAndMonth: removeYearAndMonth})}}</view>
				<view class="count">金额: {{item.count}}</view>
			</view>
			<u-swipe-action vibrate-short :options="options" v-for="info in item.bills" :key="info._id" @click="onClickOption(info._id.toString(), info.icon.toString(), info.iconType.toString())">
				<view class="bill-group" @click="onClickBill(info._id, info.type, info.icon, info.iconType, info.name, info.count, item._id.date, info.create_time)">
					<u-image class="icon" :src="info.icon" width="64" height="64" shape="circle"></u-image>
					<view class="info-group">
						<view class="name">{{info.name}}</view>
						<view class="count">{{info.count}}</view>
					</view>
				</view>
			</u-swipe-action>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			billList: {
				type: Array,
				value: []
			},
			removeYearAndMonth: {
				type: Boolean,
				value: false
			}
		},
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}]
			};
		},
		methods: {
			onClickBill(_id, type, icon, iconType, name, count, date, create_time) {
				wx.navigateTo({
					url: '../../pages/billDetail/billDetail?_id=' + _id + '&type=' + type + '&icon=' + icon + '&iconType=' + iconType + '&name=' + name +
						'&count=' + count + '&date=' + date + '&create_time=' + create_time
				});
			},
			onClickOption(_id, icon, iconType) {
				this.$deleteBill(_id, icon, iconType).then(res => {
					if (res.result.stats.removed == 1) uni.startPullDownRefresh();
					else wx.showToast({
						title: '删除失败！'
					});
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bills {
		width: 100%;
		display: flex;
		padding: 20rpx;
		flex-direction: column;

		.top-group {
			width: 100%;
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid silver;
			color: $u-content-color;
			margin-bottom: 15rpx;
		}

		.bill-group {
			width: 100%;
			height: 100rpx;
			display: flex;

			.icon {
				display: flex;
				flex-direction: column;
				justify-content: center;
				margin-right: 40rpx;
			}

			.info-group {
				font-size: 50rpx;
				color: $u-main-color;
			}
		}

		.info-group {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
</style>
