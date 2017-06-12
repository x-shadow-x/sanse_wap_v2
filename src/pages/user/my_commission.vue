<template>
	<div class="my_commission_main">
		<router-link to="/orders_all" class="explain_link"></router-link>
		<div class="user_info_box">
			<div class="user_img_box">
				<img src="../../images/common/default_user_icon.png" alt="用户头像" class="user_img">
			</div>
			<p>我的奖金(红包)</p>
			<div class="redpack_value_box">
				<span class="redpack_value">0.00</span><span class="quantifier">元</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {}
		}
	}
</script>

<style scoped>
	
	.my_commission_main {
		position: fixed;
		z-index: 12;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: #fff;
		overflow: auto;
	}

	.user_info_box {
		text-align: center;
		padding-top: 1.690821rem;
	}

	.user_img_box {
		width: 2.705314rem;
		height: 2.705314rem;
		position: relative;
		margin: 0 auto;
		overflow: hidden;
		border-radius: 1000px;
	}

	.user_img {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
	}

	.explain_link {
		position: absolute;
		right: 0.241546rem;
		top: 0.241546rem;
		width: 0.57971rem;
		height: 0.57971rem;
		background: url('../../images/my_commission/explain_icon.png') center no-repeat;
		background-size: 0.483092rem auto;
	}
</style>