<template>
	<div class="address_manager_main">
		<router-link to="/address_add" class="address_add_router">
			<span class="address_add_router_text">添加新地址</span>
		</router-link>
		<ul class="address_list">
			<li class="address_item" :class="{active: item.IsDefault == 1}" v-for="(item, index) in addressList" :key="item.address_id" @click="selectAddress(index)">
				<div class="address_info">
					收&nbsp;&nbsp;件&nbsp;&nbsp;人：{{item.consignee}}
				</div>
				<div class="address_info">
					手机号码：{{item.mobile}}
				</div>
				<div class="address_info">
					所在地区：{{item.distinctAddress}}
				</div>
				<div class="address_info">
					详细地址：{{item.address}}
				</div>
				<div class="handle_box">
					<router-link :to="{ path:'/address_edit', query: {addressId:item.address_id, index: index} }" class="address_edit_router"></router-link>
					<span class="delete_address" @click.stop="deleteAddress(index)"></span>
					<span class="default_address_tip" v-if="item.IsDefault == 1">默认地址</span>
					<span class="default_address_setting" v-else>设置默认</span>
				</div>
			</li>
		</ul>
		<div class="confirm_address_box" v-if="isSettleAccountsStatus">
			<span class="confirm_address_btn" @click="confirmAddress">确认收货地址</span>
		</div>
		<confirm 
		:isShowConfirm="isShowConfirm" 
		:tipTitleF="tipTitleF" 
		:tipContentF="tipContentF" 
		@confirmEvent="confirmEvent" 
		@cancelEvent="cancelEvent"></confirm>
	</div>
</template>

<script>

	import confirm from '../../components/common/confirm.vue';

	export default {
		data() {
			return {
				addressList: [],
				isShowConfirm: false,
				tipTitleF: '',
				tipContentF: '',
				confirmCbName: '',
				selectedAddressId: '',
				isSettleAccountsStatus: this.$route.query.act == 'settle_accounts',
				confirmCbParams: {}
			}
		},

		methods: {

			/**
			 * 点击删除按钮后弹出用户确认弹框~根据用户的选择做不同的处理
			 * 此处选择的方式是在触发弹框的函数里指定将来用户选择确定按钮时执行的回调函数的名字和需要使用的参数
			 * 然后在confirm组件中对用户的不同的操作分别触发不同的事件传递回此父组件
			 * 然后在确认按钮对应的事件中调用指定的回调函数并传入相应的参数
			 */
			deleteAddress(index) {
				this.tipTitleF = '确认要删除吗？';
				this.isShowConfirm = true;
				this.confirmCbName = 'removeAddress';
				this.confirmCbParams.index = index;
			},

			removeAddress(index) {
				this.$store.commit('SHOW_LOAD');

				let selectedAddress = this.addressList[index];

				this.$request.get(this.$interface.DEL_ADDRESS, {
					'addressId': selectedAddress.address_id
				}, (response) => {
					this.addressList.splice(index, 1);
					this.$store.commit('HIDE_LOAD');
				});
			},

			confirmEvent() {
				this.isShowConfirm = false;
				this[this.confirmCbName](this.confirmCbParams.index);
			},

			cancelEvent() {
				this.isShowConfirm = false;
			},

			selectAddress(index) {
				let selectedAddress = this.addressList[index];

				if(selectedAddress.IsDefault == 1) {
					this.selectedAddressId = selectedAddress.address_id;
					return;
				}

				this.selectedAddressId = selectedAddress.address_id;

				this.$store.commit('SHOW_LOAD');
				this.$request.get(this.$interface.UPDATE_ADDRESS_IS_DEFAULT, {
					'addressId': selectedAddress.address_id
				}, (response) => {
					this.addressList.forEach((item) => {
						item.IsDefault = 0;
					});

					selectedAddress.IsDefault = 1;
					this.$store.commit('HIDE_LOAD');
				});
			},

			confirmAddress() {
				localStorage.setItem('DEFAULT_CONSIGNEE_ADDRESS', this.selectedAddressId);
				this.$emit('childEmitUpdate', {'propName': this.$route.query.propName, 'updatePropName': this.selectedAddressId});
				this.$router.go(-1);
				
			}
		},

		mounted() {
			this.$request.get(this.$interface.GET_USER_ADDRESS_LIST, {
				'userId': localStorage.getItem('USER_ID')
			}, (response) => {
				let data = response.data;

				this.addressList = data;
				this.selectedAddressId = data[0].address_id
			});
		},

		components: {
			confirm
		}
	}
</script>

<style scoped>
	.address_manager_main {
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

	.address_add_router {
		display: block;
		text-align: center;
		background: #ef8200;
		color: #fff;
		border-radius: 4px;
		padding: 0.386473rem 0;
	}

	.address_add_router_text {
		background: url('../../images/address_manager/add_icon.png') left center no-repeat;
		background-size: 10px auto;
		padding-left: 16px;
		display: inline-block;
		vertical-align: middle;
		white-space: nowrap;
	}

	.address_item {
		border: 1px solid #c6c6c6;
		border-radius: 4px;
		margin-top: 3%;
		position: relative;
		box-sizing: border-box;
	}

	.address_item.active {
		transition: border .8s, box-shadow .8s;
		border: 1px solid #000;
		box-shadow: 0 0 0 1px #000 inset;
	}

	.address_item:before {
		content: '';
		position: absolute;
		width: 18px;
		height: 18px;
		background: url('../../images/address_manager/address_selected_icon.png') center no-repeat;
		background-size: 100% auto;
		right: -6px;
		top: -8px;
		transform: scale(0, 0);
	}

	.address_item.active:before {
		transition: transform .5s;
		transform: scale(1, 1);
	}

	.address_info {
		border-bottom: 1px solid #e8e8e8;
		line-height: 1.1rem;
		padding: 0 3%;
		position: relative;
		z-index: -1;
	}

	.handle_box {
		line-height: 1rem;
		padding: 3%;
		position: relative;
	}

	.address_edit_router,
	.delete_address {
		display: inline-block;
		vertical-align: middle;
		width: 24px;
		height: 24px;
		background: url('../../images/address_manager/address_edit_icon.png') center no-repeat;
		background-size: 100% auto;
	}

	.delete_address {
		background-image: url('../../images/address_manager/address_del_icon.png');
		margin-left: 10px;
	}

	.default_address_tip,
	.default_address_setting {
		position: absolute;
		right: 3%;
		top: 50%;
		transform: translateY(-50%);
		padding: 6px 10px;
		line-height: 20px;
		transition: all .6s;
	}

	.default_address_setting {
		background: #ef8200;
		color: #fff;
		border-radius: 4px;
	}

	.confirm_address_box {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		text-align: center;
		background: #ef8200;
		color: #fff;
		line-height: 14px;
	}

	.confirm_address_btn {
		display: block;
		padding: 0.386473rem 0;
	}
</style>