import Vue from 'vue'
import App from './App'
//引入Vuex
import store from './store'
//引入并注册uView UI组件库
import uView from 'uview-ui'
Vue.use(uView);
//引入并注册工具
import { getUUID, getExt, getCloudPath, deleteBill } from 'utils/util.js'
Vue.prototype.$getUUID = getUUID;
Vue.prototype.$getExt = getExt;
Vue.prototype.$getCloudPath = getCloudPath;
Vue.prototype.$deleteBill = deleteBill;

Vue.config.productionTip = false
App.mpType = 'app'

// 判断日期是否为今天
Vue.filter('timeFilter', (value, {
	detail = false,
	removeYearAndMonth = false
} = {}) => {
	let date = value;
	if (!date) return '';
	// 转换为Date类型
	if (typeof(date) == 'string') {
		date = new Date(date);
	}
	const year = date.getFullYear();
	const month = date.getMonth();
	const day = date.getDate();
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let seconds = date.getSeconds();
	// 补0操作
	if (hours < 10) hours = '0' + hours;
	if (minutes < 10) minutes = '0' + minutes;
	if (seconds < 10) seconds = '0' + seconds;
	const now = new Date();
	if (detail) {
		return year + '年' + (month + 1) + '月' + day + '日 ' + hours + ':' + minutes + ':' + seconds;
	}
	if (date.setHours(0, 0, 0, 0) == now.setHours(0, 0, 0, 0)) {
		return '今天';
	} else if (removeYearAndMonth) {
		return day + '日';
	} else {
		return year + '年' + (month + 1) + '月' + day + '日';
	}
})



const app = new Vue({
	...App,
	//挂载Vuex
	store
})
app.$mount()
