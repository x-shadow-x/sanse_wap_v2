<template>
	<div class="pay_info_main">
		<div class="info_item">
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
	</div>
</template>

<script>
	export default {
		data() {
			return {
				orderinfoEntity: {},
			}
		},
		mounted() {
			// paymentId, bonusId = 0, IsUsePoint = 0
			this.$request.post(this.$interface.GET_OFFLINE_JIESUANLIST, {
				'paymentId': this.$route.query.paymentId,
                'bonusId': 0,
                'IsUsePoint': 0
            }, (response) => {
            	let data = response.data;

            	this.orderinfoEntity = data.orderinfoEntity;
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

	.info_item {
		background: #fff;
		position: relative;
		padding: 2% 4%;
		line-height: 2;
	}

	.info_item + .info_item {
		margin-top: 10px;
	}

	.store_name_box,
	.staff_info_text,
	.staff_img_box {
		display: inline-block;
		vertical-align: middle;
	}

	.staff_img_box {
		position: relative;
		width: 0.8rem;
		padding-top: 0.8rem;
		overflow: hidden;
		border-radius: 1000px;
		border: 4px solid #ddd;
		font-size: 0;
	}

	.staff_img {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 100%;
		transform: translate(-50%, -50%);
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
</style>