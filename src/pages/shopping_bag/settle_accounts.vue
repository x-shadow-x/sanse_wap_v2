<template>
	<div class="settle_accounts_main">
		<div class="order_info_box">
			<div class="order_info_item">
				<router-link :to="{ path: '/settle_accounts/address_manager', query: {act: 'settle_accounts', propName: 'addressId'} }" class="link_box">
					<h2 class="order_info_item_title">收货地址</h2>
					<div class="order_info_item_content">
						<div class="consignee_info">
							<span class="consignee">{{payEntity.consignee}}</span>
							<span class="mobile">{{payEntity.mobile}}</span>
						</div>
						<p class="consignee_address">{{payEntity.districtAddress}}</p>
					</div>
				</router-link>
			</div>

			<div class="order_info_item">
				<router-link :to="{ path: '/settle_accounts/delievry_time', query: {delievryTimeId: delievryTime.id, propName: 'delievryTime'} }" class="link_box">
					<h2 class="order_info_item_title">收货时间</h2>
					<div class="order_info_item_content" v-if="delievryTime.rectime">
						<p>{{delievryTime.rectime}}</p>
					</div>
				</router-link>
			</div>

			<div class="order_info_item">
				<router-link :to="{ path: '/settle_accounts/payment_list', query: {payId: payment.pay_id, propName: 'payment'} }" class="link_box">
					<h2 class="order_info_item_title">支付方式</h2>
					<div class="order_info_item_content" v-if="payment.pay_name">
						<p>{{payment.pay_name}}</p>
					</div>
				</router-link>
			</div>
		</div>
		<div class="order_info_box">
			<div class="order_info_item">
	            <h2 class="order_info_item_title">商品详情</h2>
	            <div class="goods_item_box" v-for="item in goodsList" :key="item.goods_id">
	            <!-- /goods_detail/?goodsId=14647&colorId=201 -->
	                <router-link :to="{path: '/goods_detail/', query: {goodsId: item.goods_id, colorId: item.img_color}}">
	                	<div class="goods_img_box">
		                    <img :src="item.goods_img" :alt="item.goods_name" class="goods_img">
		                </div>
		                <div class="goods_info_box">
		                    <h2 class="goods_name">{{item.goods_name}}</h2>

		                    <div class="relative_box">
		                        <p class="goods_attr">颜色：{{item.goods_color_value}}</p>
		                        <span class="limited_tip" v-if="item.is_limited == 1 && item.goodsType != 2">限量/特别款</span>
		                        <span class="point_goods_tip" v-if="item.goodsType == 2">积分商品</span>
		                    </div>
		                    <p class="goods_attr">尺码：{{item.goods_size}}</p>
		                    <div class="old_price_box">
		                        <span class="money_tip">¥</span><span class="price">{{item.market_price}}</span>
		                    </div>
		                    <div class="current_price_box">
		                        <!-- <span class="point" v-if="item.exchange_integral > 0">{{item.exchange_integral}}+</span> -->
		                        <span class="money_tip">¥</span><span class="price">{{item.price}}</span>
		                    </div>
		                    <div class="goods_num_box">
		                        <span class="goods_num">数量：{{item.number}}</span>
		                    </div>
		                </div>
		                <div class="limited_rule_tip" v-if="item.is_limited == 1">本商品为限量/特别款商品，不与其他促销及优惠同享</div>
	                </router-link>
	            </div>
            </div>
        </div>
		
		<div class="order_info_box">
			<div class="order_info_item" @click="toggleUsePromote" v-if="listgiftEntity.length > 0">
        		<h2 class="order_info_item_title">
					订单优惠活动
					<span class="check_btn promote_check_btn" :class="{active: isUsePromote == 1}"></span>
				</h2>
				<div class="promote_item" v-for="item in listgiftEntity" :key="item.condition_id">
					<h2 class="promote_title">{{item.condition_typeName}}</h2>
					<p class="promote_content" v-for="subItem in item.arrayEntity">{{subItem.gift_message}}</p>
				</div>
        	</div>
		</div>

        <div class="order_info_box">
        	<div class="order_info_item">
        		<!-- <router-link :to="{path: '/select_coupon', query: {recId: recId, bonusId: bonusId, bonusIds: couponEntity.bonus_ids}}" class="link_box"> -->
        		<router-link :to="{path: '/settle_accounts/select_coupon', query: {recId: recId, bonusId: bonusData.couponId, bonusIds: couponEntity.bonus_ids, propName: 'bonusData'}}" class="link_box">
					<h2 class="order_info_item_title">
						优惠券
						<span class="usable_coupon_tip" v-if="bonusData.couponId == 0">({{couponEntity.canUseCouponNum}}张可用)</span>
						<span class="current_coupon_info">{{bonusData.couponText}}</span>
					</h2>
				</router-link>
        	</div>
        </div>

        <div class="order_info_box">
        	<div class="order_info_item" @click="toggleUsePoint">
        		<h2 class="order_info_item_title">积分使用</h2>
        		<div class="order_info_item_content">
        			<div class="benefit_info">
        				<span class="benefit_name">剩余积分：</span>
        				<span class="benefit_value">{{pointEntity.totalPoints}}</span>
        			</div>
        			<div class="benefit_info" v-if="pointEntity.allowPoint > 0">
        				<span class="benefit_name">可用{{pointEntity.allowPoint}}积分再抵用{{pointEntity.equalMoney}}</span>
        				<span class="check_btn" :class="{active: isUsePoint == 1}"></span>
        			</div>
        		</div>
        	</div>
        </div>

        <div class="order_info_box">
        	<div class="order_info_item" @click="toggleUseRedPack">
        		<h2 class="order_info_item_title">红包使用</h2>
        		<div class="order_info_item_content">
        			<div class="benefit_info">
        				<span class="benefit_name">剩余红包：</span>
        				<span class="benefit_value">{{redpacketEntity.totalRedPacket}}元</span>
        			</div>
        			<div class="benefit_info">
        				<span class="benefit_name">当前可用红包：</span>
        				<span class="benefit_value">{{redpacketEntity.canUseRedPacket}}元</span>
        				<span class="check_btn" :class="{active: isUseRedPacket == 1}"></span>
        			</div>
        		</div>
        	</div>
        </div>

        <div class="order_info_box">
        	<div class="order_info_item" @click="toggleUseAccountBalance">
        		<h2 class="order_info_item_title">钱包支付</h2>
        		<div class="order_info_item_content">
        			<div class="benefit_info">
        				<span class="benefit_name">钱包余额：</span>
        				<span class="benefit_value">{{payEntity.account_balance}}元</span>
        			</div>
        			<div class="benefit_info">
        				<span class="benefit_name">当前可用余额：</span>
        				<span class="benefit_value">{{payEntity.canUsebalance}}元</span>
        				<span class="check_btn" :class="{active: isUseBalance == 1}"></span>
        			</div>
        		</div>
        	</div>
        </div>

        <div class="order_info_box">
        	<div class="order_info_item">
        		<h2 class="order_info_item_title">资费详情</h2>
        		<div class="order_info_item_content">
        			<div class="fee_item">
        				<span class="fee_name">商品件数：</span>
        				<span class="fee_value">{{payEntity.totalNum}}件</span>
        			</div>
        			<div class="fee_item">
        				<span class="fee_name">商品总价：</span>
        				<span class="fee_value">¥{{payEntity.totalMarketPrice}}</span>
        			</div>
        			<div class="fee_item">
        				<span class="fee_name">优惠金额：</span>
        				<span class="fee_value">¥{{payEntity.totalYouHuiPrice}}</span>
        			</div>
        			<div class="fee_item">
        				<span class="fee_name">运<span class="hide_blank">占位</span>费：</span>
        				<span class="fee_value">¥{{payEntity.shippingFee}}</span>
        			</div>
        			<div class="fee_item">
        				<span class="fee_name">订单金额：</span>
        				<span class="fee_value">¥{{payEntity.totalprice}}</span>
        			</div>
        		</div>
        	</div>
        </div>

        <div class="order_info_box">
        	<div class="order_info_item">
        		<h2 class="order_info_item_title">备注</h2>
        		<div class="order_info_item_content">
        			<textarea class="order_remark" placeholder="请输入备注信息" v-model="remark" id="remarkInput" maxlength="50" @focus="isShowTextCount = true;" @blur="isShowTextCount = false;"></textarea>
        			<div class="text_count_box" :class="{show: isShowTextCount}">
        				<span class="text_count">{{remark.length}}/50</span>
        			</div>
        		</div>
        	</div>
        </div>
        <div class="total_handle_box">
        	<div class="total_fee_box">
        		实收款：
        		<span class="current_price_box">
        			<span class="money_tip">¥</span><span class="price">{{payEntity.totalprice}}</span>
        		</span>
        	</div>
        	<div class="submit_order_box">
        		<span class="submit_order_btn" @click="submitOrder">提交订单</span>
        	</div>
        </div>
        <alert :isShowAlert="isShowAlert" :tipTitleF="tipTitleF" :tipContentF="tipContentF" :cbName="cbName" :isBlackF="true" v-on:hideAlert="hideAlert"></alert>

        <transition name="slide-right">
            <router-view v-on:childEmitUpdate="childEmitUpdate" class="transition_container"></router-view>
        </transition>

	</div>
</template>

<script>
	import alert from '../../components/common/alert.vue';
	import payHelper from '../../config/wx_pay_helper.js';
	import wxPayHelper from '../../config/wx_pay_helper.js';

	export default {
		data() {
			return {
				remark: '',
				isUsePoint: 0,
				isUseRedPacket: 0,
				isUseBalance: 0,
				isUsePromote: 0,
				isShowTextCount: false,

				isShowAlert: false,
				tipTitleF: '提示',
				tipContentF: '',

				addressId: localStorage.getItem('DEFAULT_CONSIGNEE_ADDRESS') || 0,
				delievryTime: JSON.parse(localStorage.getItem('DELIEVRY_TIME')) || {'rectime': '', 'id': ''},
				payment: JSON.parse(localStorage.getItem('PAYMENT')) || {'pay_name': '', 'pay_id': ''},
				bonusData: {
					'couponId': 0, 
					'couponText': ''
				},

				goodsList: [],
				couponEntity: {},
				listgiftEntity: [],
				payEntity: {},
				pointEntity: {},
				redpacketEntity: {},
				recId: this.$route.query.recId,
				conditionIds: ' ',
				cbName: '',  // 点击确认弹出框的确定按钮的时候执行的回调函数的函数名
			}
		},

		methods: {
			/**
			 * 供子路由触发事件调用
			 * 此页面中地址管理，支付方式，收货方式和优惠券选择页面都通过子路由来呈现~页面不跳转~
			 * 在子页面做完相应操作后此父路由需要更新对应的变量并重新请求数据，为统一操作~对data数据结构有所要求。具体流程如下：
			 * 父路由页面的变量在子路由页面中发生修改~子路由页面在修改完变量后回到父路由页面并将修改的数据传递回父路由页面
			 * 故所做操作为：在跳转到子路由时~将需要在子路由总做修改的父路由页面的变量的变量名通过路由参数传递给子路由，规定其key为propName
			 * 同时为在进入子路由页面时显示上次离开子路由页面时的状态~再将对应变量的状态也通过路由参数传递给子路由~
			 * 子路由页面在请求回来数据后根据路由参数还原之前的列表选中状态
			 * 同时约定，子路由页面修改完变量后将修改的值放到以 updatePropName为key的对象
			 * @param  {[type]} data [description]
			 * @return {[type]}      [description]
			 */
			childEmitUpdate: function(data) {
				this[data.propName] = data.updatePropName;
				this.updateData();
			},

			handleData: function(data, cb) {
				cb(data);
			},

			hideAlert: function(cbName) {
				if(cbName) {
					this[cbName]();
				}
				this.isShowAlert = false;
			},

			updateData: function(cb) {
				this.$store.commit('SHOW_LOAD');
				this.$request.get(this.$interface.GET_JIESUAN_LIST, {
	                'userId': localStorage.getItem('USER_ID') || 0,
	                'recId': this.recId,
	                'bonusId': this.bonusData.couponId,
	                'isUsePoint': this.isUsePoint,
	                'isUseBalance': this.isUseBalance,
	                'isStore': 0,
	                'addressId': this.addressId,
	                'isUsePromote': this.isUsePromote,
	                'isUseRedPacket': this.isUseRedPacket
	            }, (response) => {
	                let data = response.data;
	                this.handleData(data.arrBuyCarEntity, (data) => {
	                	for(let i = 0, len = data.length; i < len; i++) {
							var temp = data[i].goods_attr.split(' \r\n');
							data[i].goods_color_value = temp[0].split(':')[1];
							data[i].goods_size = temp[1].split(':')[1];
						}
	                });
	                this.goodsList = data.arrBuyCarEntity;
	                this.couponEntity = data.couponEntity;
	                this.listgiftEntity = data.listgiftEntity;
	                this.payEntity = data.payEntity;

	                this.handleData(data.pointEntity, (data) => {
	                	data.equalMoney = parseFloat(data.allowPoint * data.exchangeRate).toFixed(2);
	                });

	                this.pointEntity = data.pointEntity;
	                this.redpacketEntity = data.redpacketEntity;
	                if(typeof cb == 'function') {
	                	cb(data);
	                }
	                this.$store.commit('HIDE_LOAD');
	            });
			},

			toggleUsePromote: function() {
				let conditionIds = [];
				if(this.isUsePromote == 1) {
					this.isUsePromote = 0;
					conditionIds = ' ';
				} else {
					this.isUsePromote = 1;

					this.listgiftEntity.forEach((item) => {
						conditionIds.push(item.condition_id);
					});

					conditionIds = conditionIds.join(',');
				}

				this.conditionIds = conditionIds;

				this.updateData();
			},

			toggleUsePoint: function() {
				if(this.isUsePoint == 1) {
					this.isUsePoint = 0;
				} else {
					this.isUsePoint = 1;
				}
				this.updateData();
			},

			toggleUseRedPack: function() {
				if(this.isUseRedPacket == 1) {
					this.isUseRedPacket = 0;
				} else {
					this.isUseRedPacket = 1;
				}
				this.updateData();
			},

			toggleUseAccountBalance: function() {
				if(this.isUseBalance == 1) {
					this.isUseBalance = 0;
				} else {
					this.isUseBalance = 1;
				}
				this.updateData();
			},

			validate: function(data) {
				if(this.addressId == 0) {
					this.tipContentF = '请选择收货地址';
					this.isShowAlert = true;
					return false;
				} else if(!this.delievryTime.id) {
					this.tipContentF = '请选择收货时间';
					this.isShowAlert = true;
					return false;
				} else if(!this.payment.pay_id) {
					this.tipContentF = '请选择支付方式';
					this.isShowAlert = true;
					return false;
				}

				return true;
			},

			base64Encode: function(str) {
				var result;
			    result = encodeURIComponent(str);
			    result = unescape(result);
			    result = window.btoa(result);
			    return result;
			},

			/**
			 * 组装支付码~之后将会将此数据发送到对应php接口以便获取调起微信支付所需的变量数据
			 */
			createPayCode: function(data) {
				let payId = this.payment.pay_id;
				let orderSn = data.OrderSn;
				let orderAmount = data.OrderAmount;
				let time = parseInt(new Date().getTime() / 1000);
				let sign = this.$md5(payId + orderSn + orderAmount + time + 'inno');

				let encodeStr = payId + '||' + orderSn + '||' + orderAmount + '||' + time + '||' + sign;
				let payCode = this.base64Encode(encodeStr);
				return payCode;
			},

			pay: function(data) {
				this.$store.commit('SHOW_LOAD');

				let payCode = this.createPayCode(data);
				let url = "/wx_pay.php?pay_code=" + payCode;

				wxPayHelper.wxPayGetRequest(url, null, (res)=> {
					let data = res.data;
					wxPayHelper.callpay(data, this, (msg) => {
						this.cbName = 'jump';
						this.tipContentF = msg;
						this.isShowAlert = true;
					});
					this.$store.commit('HIDE_LOAD');
				});
			},

			submitOrder: function() {

				if(!this.validate()) {
					return;
				}

				this.$request.post(this.$interface.ADD_ORDERINFO_FOR_CHANGE_BY_PRODUCTIDS, {
		                'userId': localStorage.getItem('USER_ID') || 0,
		                'addressId': this.addressId,
		                'paymentId': this.payment.pay_id,
		                'besttimeId': this.delievryTime.id,
		                'changeType': 1,
		                'changeValue': this.isUsePoint == 0 ? 0 : this.pointEntity.allowPoint,
		                'recId': this.recId,
		                'isStore': 0,
		                'bonusId': this.bonusData.couponId,
		                'surplus': this.isUseBalance == 0 ? 0 : this.payEntity.canUsebalance,
		                'postscript': this.remark || ' ',
		                'conditionIds': this.conditionIds,
		                'redPacket': this.isUseRedPacket == 0 ? 0 : this.redpacketEntity.canUseRedPacket
		            }, (response) => {
		                let data = response.data;
		                console.log(data);
		                this.orderId = data.OrderId;
		                this.pay(data);
	            });
			},

			jump: function() {
				this.$router.push({path: '/order_detail', query:{orderId: this.orderId}});
			}
		},

		mounted() {
			
			console.log(wxPayHelper);

			this.updateData((data) => {
				// console.log(data);
				this.addressId = data.payEntity.address_id || 0;
			});
		},

		components: {
			alert
		}
	}
</script>

<style scoped>
	
	.settle_accounts_main {
		position: absolute;
        left: 0;
        top: 0;
        right: 0;
        z-index: 2;
        height: 100%;
        overflow: auto;
        background: #fff;
        box-sizing: border-box;
        padding: 0 2% 2% 2%;
	}

	.order_info_box {
		border: 1px solid #efefef;
		border-radius: 4px;
		margin: 2% auto;
		line-height: 2.4;
	}

	.order_info_item + .order_info_item {
		border-top: 1px solid #efefef;
	}

	.link_box {
		position: relative;
		display: block;
	}

	.link_box .order_info_item_title:after {
		content: '';
		position: absolute;
		right: .28rem;
		top: 50%;
		transform: translateY(-50%);
		width: 12px;
		height: 10px;
		background: url('../../images/common/link_right_arrow.png') center no-repeat;
		background-size: auto 100%;
	}

	.order_info_item_title {
		padding: .28rem;
		position: relative;
		line-height: 1;
	}

	.current_coupon_info {
		display: inline-block;
		vertical-align: middle;
		line-height: 18px;
		border-radius: 4px;
		padding: 0 5px;
		color: #fff;
		background: #ef8200;
	}

	.usable_coupon_tip {
		position: absolute;
		right: .8rem;
		top: 50%;
		transform: translateY(-50%);
	}

	.order_info_item_content {
		padding: 0 .28rem .28rem .28rem;
	}

	.consignee_address {
		margin-top: 4px;
		line-height: 1.6;
	}

	.goods_item_box {
        font-size: 0;
        padding: 0 .28rem .28rem .28rem;
    }

    .goods_item_box + .goods_item_box {
    	padding-top: .28rem;
        border-top: 1px solid #efefef;
    }

    .goods_item_box:last-child {
    	padding-bottom: 0;
    }

    .goods_img_box,
    .goods_info_box {
        display: inline-block;
        vertical-align: middle;
    }

    .goods_img_box {
        position: relative;
        width: 32%;
        padding-top: 32%;
        overflow: hidden;
    }

    .goods_img {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 100%;
        transform: translate(-50%, -50%);
    }

    .goods_info_box {
        font-size: 12px;
        width: 68%;
        box-sizing: border-box;
        padding-left: 0.28rem;
    }

    .goods_name {
        font-size: 14px;
        font-weight: bolder;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        max-width: 100%;
    }

    .relative_box {
        position: relative;
    }

    .point_goods_tip,
    .limited_tip {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 4px;
        color: #f20925;
        line-height: 1.4;
        padding: 0 2px;
        border: 1px solid #f20925;
    }

    .limited_rule_tip {
    	font-size: 12px;
    	border-top: 1px solid #efefef;
    	margin-right: -.28rem;
    	color: #7f7f7f;
    }

    .point {
        display: inline-block;
        vertical-align: text-top;
        line-height: 1;
        color: #ef8200;
        background: url('../../images/order_detail/point_icon.png') left center no-repeat;
        background-size: 14px auto;
        padding-left: 16px;
        font-size: 14px;
    }

    .old_price_box {
        color: #7f7f7f;
        font-weight: normal;
        margin-top: 5px;
    }

    .money_tip {
        display: inline-block;
        vertical-align: text-top;
        font-size: 8px;
        line-height: 8px;
    }

    .price {
        display: inline-block;
        vertical-align: text-top;
        line-height: 1;
    }

    .old_price_box .price {
        text-decoration: line-through;
    }

    .current_price_box .price {
        font-weight: bolder;
        font-size: 14px;
    }

    .goods_attr {
    	line-height: 1.2;
    }

    .goods_num_box {
        position: relative;
    }

    .goods_num {
        display: inline-block;
        vertical-align: middle;
    }

    .benefit_info {
    	position: relative;
    }

    .benefit_name,
    .benefit_value {
    	display: inline-block;
    	vertical-align: middle;
    }

    .check_btn {
    	position: absolute;
    	right: 0;
    	top: 50%;
    	transform: translateY(-50%);
    	width: 14px;
    	height: 14px;
    	background: url('../../images/common/checkbox_icon.png') center no-repeat;
    	background-size: 100% auto;
    }

    .promote_check_btn {
    	position: absolute;
    	right: .28rem;
    	top: 50%;
    	transform: translateY(-50%);
    }

    .check_btn.active {
    	background-image: url('../../images/common/checkbox_icon_active.png');
    }

    .promote_item {
    	padding: 0 .28rem;
    }

    .promote_item + .promote_item {
    	border-top: 1px solid #efefef;
    }

    .promote_title {
    	font-weight: bolder;
    }

    .hide_blank {
    	visibility: hidden;
    }

    .order_remark {
    	box-sizing: border-box;
	    width: 100%;
	    height: 100px;
	    resize: none;
	    border: 0 none;
    }

	.text_count_box {
		text-align: right;
		line-height: 1;
		visibility: hidden;
	}

	.text_count_box.show {
		visibility: visible;
	}

    .text_count {
    	display: inline-block;
    	vertical-align: middle;
    }

    .total_handle_box {
    	position: fixed;
    	bottom: 0;
    	left: 0;
    	right: 0;
    	line-height: 1.2rem;
    	height: 1.2rem;
    	background: #fff;
    	font-size: 0;
    }

    .total_fee_box {
    	display: inline-block;
    	vertical-align: middle;
    	padding-left: .28rem;
    	width: 60%;
    	font-size: 12px;
    	box-sizing: border-box;
    	height: 100%;
    	border-top: 1px solid #ddd;
    }

    .submit_order_box {
    	display: inline-block;
    	vertical-align: middle;
    	width: 40%;
    	text-align: center;
    	background: #ef8200;
    	font-size: 12px;
    	box-sizing: border-box;
    	color: #fff;
    	height: 100%;
    	border-top: 1px solid #ef8200;
    }
</style>