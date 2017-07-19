<template>
	<div class="settle_accounts_main">
		<div class="order_info_box">
			<div class="order_info_item">
				<router-link to="/settle_accounts" class="link_box">
					<h2 class="order_info_item_title">收货地址</h2>
					<div class="order_info_item_content">
						<div class="consignee_info">
							<span class="consignee">收件人</span>
							<span class="mobile">13535124518</span>
						</div>
						<p class="consignee_address">收货人地址收货人地址收货人地址收货人地址收货人地址收货人地址收货人地址</p>
					</div>
				</router-link>
			</div>

			<div class="order_info_item">
				<router-link to="/settle_accounts" class="link_box">
					<h2 class="order_info_item_title">收货时间</h2>
					<div class="order_info_item_content">
						<p>只工作日（双休日、节假日不送）</p>
					</div>
				</router-link>
			</div>

			<div class="order_info_item">
				<router-link to="/settle_accounts" class="link_box">
					<h2 class="order_info_item_title">支付方式</h2>
					<div class="order_info_item_content">
						<p>微信支付</p>
					</div>
				</router-link>
			</div>
		</div>
		<div class="order_info_box">
			<div class="order_info_item">
	            <h2 class="order_info_item_title">商品详情</h2>
	            <div class="goods_item_box" v-for="item in goodsList" :key="item.goods_id">
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
        		<router-link to="/settle_accounts" class="link_box">
					<h2 class="order_info_item_title">
						优惠券
						<span class="usable_coupon_tip">({{couponEntity.canUseCouponNum}}张可用)</span>
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
        				<span class="benefit_value">{{pointEntity.allowPoint}}</span>
        			</div>
        			<div class="benefit_info">
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
        			<span class="money_tip">¥</span><span class="price">120.00</span>
        		</span>
        	</div>
        </div>
	</div>
</template>

<script>
	import alert from '../../components/common/alert.vue';
	export default {
		data() {
			return {
				remark: '',
				bonusId: 0,
				isUsePoint: 0,
				isUseRedPacket: 0,
				isUseBalance: 0,
				addressId: 0,
				isUsePromote: 0,

				isShowTextCount: false,

				goodsList: [],
				couponEntity: {},
				listgiftEntity: [],
				payEntity: {},
				pointEntity: {},
				redpacketEntity: {},
			}
		},

		methods: {
			handleData: function(data, cb) {
				cb(data);
			},

			updateData: function() {
				this.$store.commit('SHOW_LOAD');
				this.$request.get(this.$interface.GET_JIESUAN_LIST, {
	                'userId': localStorage.getItem('USER_ID'),
	                'recId': this.$route.query.recId,
	                'bonusId': this.bonusId,
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
	                this.$store.commit('HIDE_LOAD');
	            });
			},

			toggleUsePromote: function() {
				if(this.isUsePromote == 1) {
					this.isUsePromote = 0;
				} else {
					this.isUsePromote = 1;
				}
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
			}
		},

		mounted() {
			this.updateData();
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
    	border-top: 1px solid #efefef;
    }

    .total_fee_box {
    	display: inline-block;
    	vertical-align: middle;
    }

    /*.total_handle_box*/
</style>