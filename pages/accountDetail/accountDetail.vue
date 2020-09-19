<template>
	<view>
		<u-form :model="form" ref="uForm">
			<u-form-item label="类型">
				<u-radio-group class="radio-group" v-model="type" size='45'>
					<u-radio v-for="(item, index) in radioList" :key="index" :name="item.name" :disabled="item.disable">
						{{ item.name }}
					</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="事件" prop="name">
				<u-input placeholder="请输入事件" v-model="form.name" input-align="center" />
			</u-form-item>
			<u-form-item label="金额" prop="count">
				<u-input placeholder="请输入金额" v-model="form.count" type="number" input-align="center" />
			</u-form-item>
			<u-form-item label="时间" prop="date">
				<u-input placeholder="轻击选择时间" @click="show = true" :value="form.date | timeFilter" disabled input-align="center" />
				<u-picker v-model="show" mode="time" @confirm="pickerConfirm"></u-picker>
			</u-form-item>
		</u-form>
		<u-button @click="submitBill" :loading="loading">记一笔</u-button>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				form: {
					type: '',
					name: '',
					count: 0,
					date: '',
				},
				rules: {
					type: [{
						required: true,
						message: '请选择类型',
						trigger: ['change', 'blur'],
					}],
					name: [{
						required: true,
						message: '请输入记账事件',
						trigger: ['change', 'blur'],
					}],
					count: [{
						type: 'number',
						message: '金额必须是数字',
						trigger: ['change', 'blur'],
					}],
					date: [{
						required: true,
						message: '请选择日期',
						trigger: ['change', 'blur'],
					}],
				},
				radioList: [{
						name: '支出',
						disable: true
					},
					{
						name: '收入',
						disable: true
					},
				],
				name: '',
				type: '',
				show: false,
				loading: false
			}
		},
		onLoad(event) {
			this.form.type = event.type;
			this.name = event.name;
			this.form.name = this.name;
			if (event.type == 'expenditure') {
				this.type = '支出'
				this.radioList[0].disable = false;
			} else {
				this.type = '收入'
				this.radioList[1].disable = false;
			}
		},
		methods: {
			pickerConfirm(event) {
				const year = event.year;
				const month = event.month;
				const day = event.day;
				this.form.date = new Date(year, month - 1, day);
			},
			submitBill() {
				// 表单验证
				this.$refs.uForm.validate(valid => {
					if (valid) {
						// 检查登录状态
						if (!this.isLogined) {
							wx.navigateTo({
								url: '/pages/login/login'
							});
							return;
						}
						this.loading = true;
						wx.cloud.callFunction({
							name: 'submitBill',
							data: {
								icon: 'cloud://yanziqing25-p4o7v.7961-yanziqing25-p4o7v-1302721867/icon/' + this.form.type + '/' + this.name + '.png',
								iconType: 'system',
								...this.form
							}
						}).then(res => {
							this.loading = false;
							if (res.result._id) {
								wx.showToast({
									title: '成功记录一笔！',
								});
								setTimeout(() => {
									wx.navigateBack();
								}, 1200);
							} else {
								wx.showToast({
									title: res.result.errMsg,
									icon: 'none'
								});
							}
						});
					}
				});
			}
		},
		computed: {
			...mapState(['isLogined'])
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style lang="scss" scoped>
</style>
