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
					<span class="delete_address" @click.stop="deleteAddress"></span>
					<span class="default_address_tip" v-if="item.IsDefault == 1">默认地址</span>
					<span class="default_address_setting" v-else>设置默认</span>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>

	export default {
		data() {
			return {
				addressList: []
			}
		},
		methods: {
			deleteAddress() {
				this.$store.commit('SHOW_ALERT');
			},

			selectAddress(index) {
				let selectedAddress = this.addressList[index];

				if(selectedAddress.IsDefault == 1) {
					return;
				}

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
			}
		},
		mounted() {
			this.$request.get(this.$interface.GET_USER_ADDRESS_LIST, {
				'userId': '304014'
			}, (response) => {
				let data = response.data;

				this.addressList = data;
			});
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
</style>