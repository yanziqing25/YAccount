<template>
	<view class="container">
		<u-form :model="form" ref="uForm">
			<u-sticky>
				<view class="sticky">
					<u-image class="icon" :src="form.icon" width="200" height="200" shape="circle" @click="onIconClick"></u-image>
					<u-form-item :border-bottom="false" prop="name">
						<u-input :custom-style="nameStyle" placeholder="请输入事件" v-model="form.name" :disabled="buttonLabel == '修改'"
						 input-align="center" />
					</u-form-item>
				</view>
			</u-sticky>
			<u-form-item label="类型">
				<u-radio-group class="radio-group" v-model="type" size='45'>
					<u-radio v-for="(item, index) in radioList" :key="index" :name="item.name" :disabled="item.disable">
						{{ item.name }}
					</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="金额" prop="count">
				<u-input placeholder="请输入金额" v-model="form.count" type="number" :disabled="buttonLabel == '修改'" input-align="center" />
			</u-form-item>
			<u-form-item label="时间" prop="date">
				<u-input placeholder="轻击选择时间" @click="showPicker" :value="form.date | timeFilter" disabled input-align="center" />
				<u-picker v-model="show" mode="time" @confirm="pickerConfirm"></u-picker>
			</u-form-item>
			<view class="create-time-group">
				<view class="title">账单创建时间</view>
				<view class="create-time">{{create_time | timeFilter({detail: true})}}</view>
			</view>
		</u-form>
		<u-button :type="buttonType" @click="modifyAndSaveBill" :loading="loading">{{buttonLabel}}</u-button>
		<u-button v-if="buttonLabel == '修改'" type="error" @click="deleteBill" :loading="loading2">删除</u-button>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				nameStyle: {
					fontSize: '64rpx'
				},
				_id: '',
				type: '',
				iconType: '',
				create_time: '',
				form: {
					type: '',
					icon: '',
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
					icon: [{
						required: true,
						message: '请选择合适的图标',
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
				show: false,
				buttonLabel: '修改',
				buttonType: 'primary',
				loading: false,
				loading2: false,
				iconChanged: false
			};
		},
		created() {
			uni.$on('uAvatarCropper', path => {
				this.form.icon = path;
				this.iconChanged = true;
			});
		},
		onLoad(event) {
			this._id = event._id;
			this.create_time = event.create_time;
			this.iconType = event.iconType;
			this.form.type = event.type;
			this.form.icon = event.icon;
			if (event.type == 'expenditure') this.type = '支出';
			else this.type = '收入';
			this.form.name = event.name;
			this.form.count = event.count;
			this.form.date = event.date;
		},
		computed: {
			...mapState(['isLogined'])
		},
		watch: {
			type(newQuestion, oldQuestion) {
				if (oldQuestion == '') return;
				if (newQuestion == '支出') this.form.type = 'expenditure';
				else this.form.type = 'income';
			}
		},
		methods: {
			showPicker() {
				if (this.buttonLabel == '保存') this.show = true;
			},
			pickerConfirm(event) {
				const year = event.year;
				const month = event.month;
				const day = event.day;
				this.form.date = new Date(year, month - 1, day);
			},
			onIconClick() {
				if (this.buttonLabel == '修改') return;
				this.$u.route({
					url: '/uview-ui/components/u-avatar-cropper/u-avatar-cropper',
					params: {
						// 输出图片宽度，高等于宽，单位px
						destWidth: 300,
						// 裁剪框宽度，高等于宽，单位px
						rectWidth: 200,
						fileType: 'jpg',
					}
				})
			},
			modifyAndSaveBill() {
				if (this.buttonLabel == '修改') {
					this.buttonLabel = '保存';
					this.buttonType = 'success';
					this.radioList[0].disable = false;
					this.radioList[1].disable = false;
				} else {
					this.buttonLabel = '修改';
					this.buttonType = 'primary';
					this.radioList[0].disable = true;
					this.radioList[1].disable = true;
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
							if (this.iconChanged) {
								// 上传图片
								wx.cloud.uploadFile({
									filePath: this.form.icon,
									cloudPath: this.$getCloudPath(this.form.icon)
								}).then(res => {
									this.form.icon = res.fileID;
									wx.cloud.callFunction({
										name: 'updateBill',
										data: {
											_id: this._id,
											...this.form,
										}
									}).then(res => {
										this.loading = false;
										if (res.result.stats.updated == 1) {
											wx.showToast({
												title: '保存成功！',
											});
										}
									});
								});
							} else {
								wx.cloud.callFunction({
									name: 'updateBill',
									data: {
										_id: this._id,
										...this.form,
									}
								}).then(res => {
									this.loading = false;
									if (res.result.stats.updated == 1) {
										wx.showToast({
											title: '保存成功！',
										});
									} else {
										wx.showToast({
											title: '没有改动！',
										});
									}
								});
							}
						}
					});
				}
			},
			deleteBill() {
				this.loading2 = true;
				this.$deleteBill(this._id, this.form.icon, this.iconType).then(res => {
					if (res.result.stats.removed == 1) {
						wx.showToast({
							title: '删除成功！',
						});
						setTimeout(() => {
							wx.navigateBack();
						}, 1200);
					} else wx.showToast({
						title: '删除失败！'
					});
				});
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style lang="scss" scoped>
	.sticky {
		display: flex;
		flex-direction: column;
		padding: 30rpx 0 80rpx;

		.icon {
			display: flex;
			justify-content: center;
		}
	}

	.create-time-group {
		width: 100%;
		height: 120rpx;
		display: flex;

		.title {
			display: flex;
			align-items: center;
		}

		.create-time {
			display: flex;
			justify-content: center;
			align-items: center;
			flex: 1;
		}
	}
</style>
