<template>
	<u-grid>
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
						name: '/static/icon/income/生活费.png',
						label: '生活费',
					},
					{
						name: '/static/icon/income/红包.png',
						label: '红包',
					},
					{
						name: '/static/icon/income/工资.png',
						label: '工资',
					},
					{
						name: '/static/icon/income/理财.png',
						label: '理财',
					},
					{
						name: '/static/icon/income/奖学金.png',
						label: '奖学金',
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
					url: '../../pages/accountDetail/accountDetail?name=' + label + '&type=income'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
