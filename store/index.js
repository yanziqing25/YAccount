import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		isLogined: false,
		userInfo: {}
	},
	mutations: {
		setUserInfo(state, userInfo) {
			state.isLogined = true;
			state.userInfo = userInfo;
		}
	},
	actions: {
		/**
		 * 获取用户信息
		 */
		getUserInfoAsync(content) {
			wx.getSetting().then(res => {
				if (res.authSetting['scope.userInfo']) {
					// 取得基础UserInfo
					wx.getUserInfo().then(res => {
						// 进一步获取用户Openid
						wx.cloud.callFunction({
							name: 'getUserInfo'
						}).then(res2 => {
							const userInfo = res.userInfo;
							userInfo.openid = res2.result.openid;
							userInfo.billCount = res2.result.billCount.total;
							content.commit('setUserInfo', userInfo)
						});
					});
				}
			});
		}
	}
})
