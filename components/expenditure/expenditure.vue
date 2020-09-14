<template>
	<u-grid col="4">
		<u-grid-item v-for="item in list" :key='item.label' @click="click(item.label)">
			<u-icon :name="item.name" :label="item.label" label-pos="bottom" :size="46"></u-icon>
		</u-grid-item>
	</u-grid>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						name: '/static/icon/expenditure/餐饮.png',
						label: '餐饮',
					},
					{
						name: '/static/icon/expenditure/购物.png',
						label: '购物',
					},
					{
						name: '/static/icon/expenditure/零食.png',
						label: '零食',
					},
					{
						name: '/static/icon/expenditure/运动.png',
						label: '运动',
					},
					{
						name: '/static/icon/expenditure/数码.png',
						label: '数码',
					},
					{
						name: '/static/icon/expenditure/学习.png',
						label: '学习',
					},
					{
						name: '/static/icon/expenditure/彩票.png',
						label: '彩票',
					},
					{
						name: '/static/icon/expenditure/通讯.png',
						label: '通讯',
					},
					{
						name: '/static/icon/expenditure/出行.png',
						label: '出行',
					},
					{
						name: '/static/icon/expenditure/社交.png',
						label: '社交',
					},
					{
						name: '/static/icon/expenditure/娱乐.png',
						label: '娱乐',
					},
					{
						name: '/static/icon/expenditure/长辈.png',
						label: '长辈',
					},
					{
						name: '/static/icon/expenditure/其他.png',
						label: '其他',
					},
				]
			}
		},
		methods: {
			click(label) {
				wx.navigateTo({
					url: '../../pages/accountDetail/accountDetail?name=' + label + '&type=expenditure'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
