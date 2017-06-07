<template>
	<div class="load_box" v-if="show" @click.stop="">
		<span class="load"></span>
	</div>
</template>

<script>
	export default {
		props: ['show']
	}
</script>

<style scoped>
	.load_box {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 100001;
	}

	.load {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 32px;
		height: 32px;
		background: url('../../images/common/loading.gif') center no-repeat;
		background-size: 100% auto;
	}
</style>
