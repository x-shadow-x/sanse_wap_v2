<template>
	<div class="address_add_contain">
		<scroller-selector></scroller-selector>
	</div>
</template>

<script>
	import scrollerSelector from '../../components/common/scroll_selector.vue';

	export default {
		data() {
			return {

			}
		},
		components: {
			scrollerSelector
		}
	}
</script>

<style scoped>
	.address_add_contain {
		position: fixed;
		z-index: 12;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: #fff;
		padding: 2% 3%;
		overflow: auto;
	}
</style>