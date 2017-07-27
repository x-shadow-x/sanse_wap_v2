<template>
	<div class="pay_info_main">
		<div class="info_box">
			<div class="store_name_box">
				<p class="store_name_tip">所在店铺</p>
				<p class="store_name">{{orderinfoEntity.store_name}}</p>
			</div>
			<div class="staff_info_box">
				<div class="staff_info_text">
					<p>{{orderinfoEntity.staff_name}}</p>
					<p>{{orderinfoEntity.staff_code}}</p>
				</div>
				<div class="staff_img_box">
					<img :src="orderinfoEntity.staff_pic" alt="staff_img" class="staff_img">
				</div>
			</div>
		</div>

		<div class="info_box multi">
			<div class="info_item">
				<span class="info_item_name">订单金额</span>
				<span class="info_item_value strong">¥{{orderinfoEntity.order_amount}}</span>
			</div>

			<div class="info_item">
				<router-link class="link" :to="{ path:'/select_coupon', query: {queryName: bonusInterface, bonusIds: bonusEntity.bonus_ids, preRouter: preRouter} }">
				<!-- <router-link class="link" to="/select_coupon"> -->
					<span class="info_item_name">优惠券</span>
					<span class="info_item_value disable" v-if="bonusEntity.canUseCouponNum <= 0">暂无可用优惠券</span>
					<span class="info_item_value" v-else-if="bonusEntity.canUseCouponMoney == '0.00'">可使用优惠券{{bonusEntity.canUseCouponNum}}张</span>
					<span class="info_item_value primary" v-else>-¥{{bonusEntity.canUseCouponMoney}}</span>
				</router-link>
			</div>

			<div class="info_item">
				<span class="info_item_name">积分</span>
				<span class="info_item_value disable" v-if="userPointEntity.allowPoint <= 0">
					<span class="info_item_value_text">暂无可用积分</span><span class="check_btn"></span>
				</span>
				<span class="info_item_value primary" v-else>
					<span class="info_item_value_text">-¥ {{userPointEntity.allowPointMoney}}</span><span class="check_btn"></span>
				</span>
			</div>

			<div class="info_item">
				<div class="relative_box">
					<span class="info_item_name">实付金额</span>
					<span class="info_item_value strong">¥{{orderinfoEntity.jieSuanOrderAmount}}</span>
				</div>
				<p class="reward_tip" v-if="orderinfoEntity.payment_remark != ''">{{orderinfoEntity.payment_remark}}</p>
			</div>
		</div>

		<div class="info_box multi">
			<div class="info_item">
				<h2 class="info_item_title">支付方式</h2>
			</div>
			<div class="info_item" v-for="item in paymentList">
				<span class="info_item_name pay_way" :style="{backgroundImage: 'url(' + item.icon + ')'}">{{item.text}}</span>
				<span class="info_item_value">
					<span class="check_btn"></span>
				</span>
			</div>
		</div>

		<div class="confirm_btn">确认</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				paymentList: [
					{
						'text': '微信支付',
						'icon': require('../../images/common/wx_pay_icon.png'),
						'pay_id': 2
					}
				],
				bonusEntity: {},
				orderinfoEntity: {},
				userPointEntity: {},
				bonusInterface: 'GET_OFFLINE_COUPONUS_LIST'
			}
		},
		computed: {
			preRouter: function() {
				return document.URL.split(document.origin)[1];
			},

			bonusData: function() {
				if(this.$route.query.bonusData) {
					return JSON.parse(this.$route.query.bonusData);
				} else {
					return {}
				}
			}
		},
		mounted() {
			console.log(this.bonusData,'--------------');
			// paymentId, bonusId = 0, IsUsePoint = 0
			this.$request.post(this.$interface.GET_OFFLINE_JIESUANLIST, {
				'paymentId': this.$route.query.paymentId,
                'bonusId': 0,
                'IsUsePoint': 0
            }, (response) => {
            	let data = response.data;
            	this.bonusEntity = data.bonusEntity;
            	this.orderinfoEntity = data.orderinfoEntity;
            	this.userPointEntity = data.userPointEntity;
            });
		}
	}
</script>

<style scoped>
	.pay_info_main {
		position: fixed;
		z-index: 12;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: #efefef;
	}

	.info_box {
		background: #fff;
		position: relative;
		padding: 2% 0 2% 4%;
		line-height: 1.8;
	}

	.info_box.multi {
		padding-bottom: 0;
	}

	.info_box + .info_box {
		margin-top: 2%;
	}

	.store_name_box,
	.staff_info_text,
	.staff_img_box {
		display: inline-block;
		vertical-align: middle;
	}

	.staff_img_box {
		position: relative;
		width: 32px;
		padding-top: 32px;
		font-size: 0;
		margin-left: 10px;
	}

	.staff_img {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		height: 100%;
		border-radius: 1000px;
		border: 3px solid #ddd;
	}

	.store_name_tip {
		color: #7f7f7f;
	}

	.store_name {
		font-size: 14px;
	}

	.staff_info_box {
		position: absolute;
		right: 4%;
		top: 50%;
		transform: translateY(-50%);
	}

	.info_item {
		position: relative;
	}

	.info_item + .info_item {
		border-top: 1px solid #efefef;
	}

	.relative_box {
		position: relative;
	}

	.link {
		display: block;
		background: url('../../images/common/link_right_arrow.png') 95% center no-repeat;
		background-size: 6px auto;
	}

	.info_item_name {
		display: inline-block;
		line-height: 1.2rem;
	}

	.info_item_value {
		position: absolute;
		right: 4%;
		top: 50%;
		transform: translateY(-50%);
	}

	.link .info_item_value {
		right: calc(4% + 20px);
	}

	.info_item_value.strong {
		font-weight: bolder;
	}

	.info_item_value.primary {
		color: red;
		font-weight: bolder;
	}

	.info_item_value.disable {
		color: #7f7f7f;
	}

	.info_item_title {
		color: #7f7f7f;
		line-height: .8rem;
	}

	.info_item_name.pay_way {
		background: url('../../images/common/wechat_icon.png') left center no-repeat;
		background-size: 20px auto;
		padding-left: 24px;
	}

	.info_item_value_text {
		display: inline-block;
		vertical-align: middle;
		margin-right: 6px;
	}

	.check_btn {
		display: inline-block;
		vertical-align: middle;
		width: 14px;
		height: 14px;
		background: url('../../images/common/checkbox_icon.png') center no-repeat;
		background-size: 100% auto;
	}

	.check_btn.active {
		background-image: url('../../images/common/checkbox_icon_active.png');
	}

	.info_item_value.disable .check_btn {
		background-image: url('../../images/common/checkbox_disbale_icon.png');
	}

	.reward_tip {
		line-height: 1.2rem;
		margin-top: -.6rem;
		background: url('../../images/pay_info/reward_tip_icon.png') left center no-repeat;
		background-size: 14px auto;
		padding-left: 18px;
		color: #ef8200;
	}

	.confirm_btn {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		line-height: 1.2rem;
		background: #ef8200;
		color: #fff;
		text-align: center;
	}
</style>