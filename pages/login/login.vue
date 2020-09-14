<template>
	<view class="container">
		<view class="logo-group">
			<image class="logo" src="/static/logo.png" />
		</view>
		<view class="tips">立即授权Y记小程序，享受更多功能~</view>
		<u-button type="primary" open-type="getUserInfo" @getuserinfo="onGetUserInfo">授权</u-button>
		<u-button type="default" @click="onReturnTap">返回</u-button>
	</view>
</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		data() {
			return {
				loading: false
			};
		},
		methods: {
			...mapActions(['getUserInfoAsync']),
			onGetUserInfo(event) {
				if (event.detail.userInfo) {
					this.getUserInfoAsync();
					wx.showToast({
						title: '授权成功！'
					});
					setTimeout(() => {
						wx.navigateBack();
					}, 1500);
				}
			},
			onReturnTap() {
				wx.navigateBack();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 0 40rpx;
		display: flex;
		flex-direction: column;
		align-items: center;

		.logo-group {
			margin-top: 100rpx;

			.logo {
				width: 300rpx;
				height: 300rpx;
				border-radius: 45%;
			}
		}
		.tips {
			font-size: 38rpx;
			color: #646464;
		}
		
		u-button {
			width: 100%;
			margin-top: 20rpx;
		}
	}
</style>
