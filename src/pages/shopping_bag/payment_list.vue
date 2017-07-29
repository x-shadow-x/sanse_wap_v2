<template>
	<div class="payment_main">
		<ul class="payment_list">
			<li class="payment_item" v-for="(item, index) in paymentList" :key="item.id" @click="selectedPayment(index)">
				<span class="payment_name">{{item.pay_name}}</span>
				<span class="check_btn" :class="{active: item.isSelect}"></span>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				paymentId: this.$route.query.payId,
				paymentList: [],
			}
		},

		methods: {
			handleData(data) {

				for(let i = 0; i < data.length; i++) {
					let item = data[i];
					if(item.pay_code == 'alipay') {
						data.splice(i, 1);
					}
				}

				data.forEach((item) => {
					if(item.pay_id == this.paymentId) {
						item.isSelect = true;
					} else {
						item.isSelect = false;
					}
					
				});
			},

			selectedPayment: function(index) {
				let list =this.paymentList;
				if(!list[index].isSelect) {
					list.forEach((item) => {
						item.isSelect = false;
					});

					list[index].isSelect = true;
				}

				this.paymentList = list;
				
				localStorage.setItem('PAYMENT', JSON.stringify(list[index]));
				setTimeout(() => {
					this.$emit('childEmitUpdate', {'propName': this.$route.query.propName, 'updatePropName': list[index]});
					this.$router.go(-1);
				}, 320);
			}
		},

		mounted() {
			this.$request.get(this.$interface.GET_PAYMENT_LIST, {}, (response) => {
				let data = response.data;
				this.handleData(data);
				this.paymentList = data;
			});
		}
	}
</script>


<style scoped>
	.payment_main {
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

	.payment_list {
		border: 1px solid #efefef;
		border-radius: 4px;
	}

	.payment_item {
		position: relative;
		box-sizing: border-box;
		padding: 0 2%;
		line-height: 1.2rem;
	}

	.payment_item + .payment_item {
		border-top: 1px solid #efefef;
	}

	.payment_name {
		display: inline-block;
		vertical-align: middle;
	}

	.check_btn {
		position: absolute;
		width: 14px;
		height: 14px;
		right: 2%;
		top: 50%;
		transform: translateY(-50%);
		background: url('../../images/common/checkbox_icon.png') center no-repeat;
		background-size: 100% auto;
	}

	.check_btn.active {
		background-image: url('../../images/common/checkbox_icon_active.png');
	}
</style>