<template>
	<view>
		<u-sticky>
			<view class="sticky">
				<u-notice-bar v-if="showNotice" :list="noticeList" close-icon @close="onCloseNotice"></u-notice-bar>
				<view class="user-group" @click="userGroupClick">
					<u-avatar class="avatar" :src="userInfo.avatarUrl" show-sex size="125"></u-avatar>
					<view class="username">{{userInfo.nickName}}</view>
				</view>
				<view class="one-word">{{word}}</view>
			</view>
		</u-sticky>

		<u-cell-group title="我的记账">
			<u-cell-item icon="calendar" title="记账天数" hover-class="none" :arrow="false">5</u-cell-item>
			<u-cell-item icon="order" title="记账笔数" hover-class="none" :arrow="false">{{userInfo.billCount}}</u-cell-item>
			<u-cell-item icon="integral-fill" title="会员等级" value="新版本"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	export default {
		data() {
			return {
				word: '',
				showNotice: false,
				noticeList: [
					'点击头像即可向小程序授权您的用户信息~'
				]
			};
		},
		onLoad() {
			this.showNotice = !this.isLogined;
		},
		onShow() {
			this.getUserInfoAsync();
			const that = this;
			wx.request({
				url: 'https://v1.hitokoto.cn/',
				success(res) {
					that.word = res.data.hitokoto;
				}
			});
		},
		methods: {
			...mapActions(['getUserInfoAsync']),
			onCloseNotice() {
				this.showNotice = false;
			},
			userGroupClick() {
				if (!this.isLogined) {
					wx.navigateTo({
						url: '/pages/login/login'
					});
				}
			}
		},
		computed: {
			...mapState(['isLogined', 'userInfo']),
		},
		watch: {
			isLogined() {
				this.showNotice = !this.isLogined;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sticky {
		background-color: #2b85e4;
		
		.user-group {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;

			.avatar {
				margin-top: 50rpx;
				margin-bottom: 10rpx;
			}

			.username {
				font-size: 30rpx;
				color: $u-main-color;
				margin-bottom: 10rpx;
			}
		}
	}

	.one-word {
		min-height: 80rpx;
		display: flex;
		justify-content: center;
		color: rgb(255, 255, 255);
		margin: 0 120rpx;
	}

	.info {
		width: 100%;
		height: 300px;
		background-color: red;
		display: flex;
		justify-content: space-around;
	}
</style>
