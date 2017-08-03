<template>
	<div class="store_pay_result_main">
		<div class="store_pay_result_box">
			<h2 class="store_pay_result" :class="{succeed: payInfo.payment_status == 1}">
				<span class="store_pay_result_text">{{payInfo.payment_description}}</span>
			</h2>
			<div class="info_item">
				<span class="item_name">所属店铺</span>
				<span class="item_value">{{payInfo.store_name}}</span>
			</div>
			<div class="info_item">
				<span class="item_name">订单编号</span>
				<span class="item_value">{{payInfo.offline_sn}}</span>
			</div>
			<div class="info_item">
				<span class="item_name">订单实付款</span>
				<div class="item_value">
					<span class="pay_icon" :class="{market_pay: payInfo.payment_mode == 3}"></span>
					<span class="pay_amount">{{payInfo.need_to_pay_amount}}</span>
				</div>
			</div>
			<p class="first_reduction" v-if="payInfo.first_reduction != ''">{{payInfo.first_reduction}}</p>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				payInfo: {}
			};
		},
		props: ['selectRecord'],

		mounted() {

			if(this.selectRecord) {
				this.$request.get(this.$interface.GET_OFFLINE_ORDER_INFO_ENTITY, {
	                'paymentId': this.selectRecord.payment_id,
		            }, (response) => {
		                let data = response.data;
		                this.payInfo = data;
	            });
			} else {
				this.$router.go(-1);
			}
		}
	}
</script>

<style scoped>
	
	.store_pay_result_main {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: 0 auto;
		overflow: hidden;
		z-index: 12;
		background: #efefef;
	}

	.store_pay_result_box {
		background: #fff;
	}

	.store_pay_result {
		text-align: center;
		font-size: 16px;
		border-bottom: 1px solid #efefef;
		line-height: 1.8rem;
	}

	.store_pay_result_text {
		display: inline-block;
		vertical-align: middle;
	}

	.store_pay_result.succeed:before {
		content: '';
		display: inline-block;
		vertical-align: middle;
		width: 20px;
		height: 20px;
		background: url('../../images/store_pay_result/pay_success.png') center no-repeat;
		background-size: 100% auto;
		margin-right: 5px;

	}

	.info_item {
		position: relative;
		padding: .4rem 4%;
	}

	.info_item + .info_item {
		border-top: 1px solid #efefef;
	}

	.item_name {
		display: inline-block;
	}

	.item_value {
		position: absolute;
		right: 4%;
		top: 50%;
		transform: translateY(-50%);
		text-align: right;
	}

	.pay_icon {
		display: inline-block;
		vertical-align: middle;
		width: 16px;
		height: 16px;
		background: url('../../images/common/wx_pay_icon.png') center no-repeat;
		background-size: 100% auto;
	}

	.pay_icon.market_pay {
		background-image: url('../../images/common/market_pay_icon.png');
	}

	.pay_amount {
		display: inline-block;
		vertical-align: middle;
		font-size: 14px;
		font-family: 'sansefont_bold';
	}

	.first_reduction {
		text-align: right;
		color: red;
		padding-right: 4%;
		padding-bottom: .4rem;
		margin-top: -6px;
	}
</style>