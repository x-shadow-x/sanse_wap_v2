<template>
	<div class="checkstand_pay_info_main">
		<div class="checkstand_pay_info_box">
			<h2 class="checkstand_pay_info">请到收银台支付</h2>
			<div class="info_item_box">
				<div class="info_item">
					<span class="item_name">应付金额</span>
					<span class="item_value primary sanse_font_bold">¥{{payInfo.need_to_pay_amount}}</span>
				</div>
			</div>
			<div class="info_item_box">
				<div class="info_item">
					<span class="item_name">订单金额</span>
					<span class="item_value">{{payInfo.offline_sn}}</span>
				</div>

				<div class="benefit_box">
					<div class="benefit_tip_box" v-if="payInfo.benefit_money > 0">
						<span class="benefit_tip">优惠信息</span>
					</div>
					<ul class="benefit_info_list">
						<li class="benefit_info_item" v-if="payInfo.random_money > 0">
							<span class="benefit_info_name">首单立减</span>
							<span class="benefit_info_value sanse_font_light">-¥{{payInfo.random_money}}</span>
						</li>
						<li class="benefit_info_item" v-if="payInfo.coupon_money > 0">
							<span class="benefit_info_name">优惠券</span>
							<span class="benefit_info_value sanse_font_light">-¥{{payInfo.coupon_money}}</span>
						</li>
						<li class="benefit_info_item" v-if="payInfo.integral_money > 0">
							<span class="benefit_info_name">积分抵扣</span>
							<span class="benefit_info_value sanse_font_light">-¥{{payInfo.integral_money}}</span>
						</li>
					</ul>
				</div>
			</div>
			<div class="info_item_box">
				<div class="info_item">
					<span class="item_name">店铺名称</span>
					<span class="item_value">{{payInfo.payment_description}}</span>
				</div>
				<div class="info_item">
					<span class="item_name">订单编号</span>
					<span class="item_value">{{payInfo.offline_sn}}</span>
				</div>
				<div class="info_item">
					<span class="item_name">支付方式</span>
					<span class="item_value">商场支付</span>
				</div>
				<div class="info_item">
					<span class="item_name">支付状态</span>
					<span class="item_value strong">{{payInfo.payment_description}}</span>
				</div>
				<div class="info_item">
					<span class="item_name">下单时间</span>
					<span class="item_value">{{payInfo.create_time}}</span>
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

		methods: {
			handleData(data) {
				data.benefit_money = data.coupon_money + data.integral_money + data.random_money;
			}
		},

		mounted() {

			if(this.selectRecord) {
				this.$request.get(this.$interface.GET_OFFLINE_ORDER_INFO_ENTITY, {
	                'paymentId': this.selectRecord.payment_id,
		            }, (response) => {
		                let data = response.data;
		                this.handleData(data);
		                this.payInfo = data;
	            });
			} else {
				this.$router.go(-1);
			}
		}
	}
</script>

<style scoped>
	
	.checkstand_pay_info_main {
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

	.checkstand_pay_info_box {
		background: #fff;
	}

	.checkstand_pay_info {
		text-align: center;
		font-size: 20px;
		border-bottom: 1px solid #efefef;
		line-height: 2.4rem;
	}

	.info_item_box {
		padding: .25rem 4%;
		line-height: 1.8;
	}

	.info_item {
		position: relative;
		padding: .25rem 0;
	}

	.info_item_box + .info_item_box {
		border-top: 1px dashed #efefef;
	}

	.item_name {
		display: inline-block;
	}

	.item_value {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		text-align: right;
	}

	.item_value.strong {
		color: #ff4b5b;
	}

	.item_value.primary {
		font-size: 16px;
	}

	.benefit_box {
		display: table;
		width: 100%;
		padding-top: .25rem;
	}

	.benefit_tip_box,
	.benefit_info_list {
		display: table-cell;
		vertical-align: top;
	}

	.benefit_tip_box {
		width: 1%;
		white-space: nowrap;
	}

	.benefit_tip {
		position: relative;
		display: inline-block;
		background: #ff4b5b;
		color: #fff;
		border-radius: 0 12px 0 12px;
		padding: 0 10px;
		font-size: 9px;
		margin-right: 16px;
	}

	.benefit_tip:before {
		content: '';
		position: absolute;
		left: 3px;
		top: 3px;
		width: 4px;
		height: 4px;
		background: #fff;
		border-radius: 100px;
	}

	.benefit_info_list {
		color: #ff4b5b;
	}

	.benefit_info_item {
		position: relative;
	}

	.benefit_info_item + .benefit_info_item {
		padding-top: .5rem;
	}

	.benefit_info_item:last-child {
		padding-bottom: .25rem;
	}

	.benefit_info_name {
		display: inline-block;
		vertical-align: middle;
	}

	.benefit_info_value {
		position: absolute;
		right: 0;
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
		color: #ff4b5b;
		padding-right: 4%;
		padding-bottom: .4rem;
		margin-top: -6px;
	}
</style>