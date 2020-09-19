<script>
	import { mapActions } from 'vuex'
	export default {
		onLaunch: function() {
			wx.cloud.init({
				traceUser: true
			});
			this.getUserInfoAsync();
		},
		methods: {
			...mapActions(['getUserInfoAsync']),
		},
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
</style>