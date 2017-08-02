<template>
	<div class="order_detail_main">
        <div class="order_detail_content">
            <div class="order_sys_tip" v-if="restTime > 0">您的订单将在{{restTime}}分钟后自动取消</div>
    		<div class="order_info_item_box">
                <div class="num_price_box">
                    <p>¥{{orderEntity.order_amount}}</p>
                    <p>共{{orderEntity.totalGoodsNum}}款</p>
                </div>
                <div class="order_info">
                    <p>单号：{{orderEntity.order_sn}}</p>
                    <p>日期：{{orderEntity.createTime}}</p>
                    <span class="order_status">{{orderEntity.orderStatus}}</span>
                </div>
            </div>

            <div class="order_info_item_box">
                <h2 class="info_item_title">商品详情</h2>
                <div class="goods_item_box" v-for="(item, index) in orderDetailList" :key="item.goodsId">
                    <router-link :to="{path: '/goods_detail/', query: {goodsId: item.goodsId, colorId: item.img_color}}">
                        <div class="goods_img_box">
                            <img :src="item.img_url" :alt="item.goods_Name" class="goods_img">
                        </div>
                        <div class="goods_info_box">
                            <h2 class="goods_name">{{item.goods_Name}}</h2>

                            <div class="relative_box">
                                <p class="goods_attr">颜色：{{item.colorName}}</p>
                                <span class="point_goods_tip" v-if="item.goodsType == 2">积分商品</span>
                            </div>
                            <p class="goods_attr">尺码：{{item.sizeName}}</p>
                            <div class="old_price_box">
                                <span class="money_tip">¥</span><span class="price">{{item.market_price}}</span>
                            </div>
                            <div class="current_price_box">
                                <span class="point" v-if="item.exchange_integral > 0">{{item.exchange_integral}}+</span>
                                <span class="money_tip">¥</span><span class="price">{{item.price}}</span>
                            </div>
                            <div class="goods_num_box">
                                <span class="goods_num">数量：{{item.goods_num}}</span>
                                <!-- <router-link :to="{ path: '/apply_return', query: {orderId: orderEntity.order_id, productId: item.productId, goodsId: item.goodsId}}" class="apply_return" v-if="orderEntity.orderStatus == '已完成' && orderEntity.isallow_tuihuanhuo == '1'">申请退货</router-link> -->
                                <span class="apply_return" v-if="orderEntity.orderStatus == '已完成' && orderEntity.isallow_tuihuanhuo == '1'" @click="applyReturn(index)">申请退货</span>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>

            <div class="order_info_item_box">
                <h2 class="info_item_title">资费详情</h2>
                <div class="item_box">
                    <div class="info_item">
                        <span class="item_name">商品件数：</span><span class="item_value">{{orderEntity.totalGoodsNum}}件</span>
                    </div>
                    <div class="info_item">
                        <span class="item_name">商品总价：</span><span class="item_value">¥{{orderEntity.totalMarketPrice}}</span>
                    </div>
                    <div class="info_item">
                        <span class="item_name">优惠金额：</span><span class="item_value">¥{{orderEntity.totalYouHuiPrice}}</span>
                    </div>
                    <div class="info_item">
                        <span class="item_name">余额支付：</span><span class="item_value">¥{{orderEntity.surplus}}</span>
                    </div>
                    <div class="info_item">
                        <span class="item_name">运<span class="v_hidden">占位</span>费：</span><span class="item_value">¥{{orderEntity.shipping_fee}}</span>
                    </div>
                    <div class="info_item">
                        <span class="item_name">订单金额：</span><span class="item_value">¥{{orderEntity.order_amount}}</span>
                    </div>
                </div>
            </div>

            <div class="order_info_item_box">
                <h2 class="info_item_title">收货地址详情</h2>
                <div class="item_box">
                    <div class="info_item">
                        <span class="item_name">收&nbsp;&nbsp;件&nbsp;&nbsp;人：</span><span class="item_value">{{orderEntity.consignee}}</span>
                    </div>
                    <div class="info_item">
                        <span class="item_name">手机号码：</span><span class="item_value">{{orderEntity.mobile}}</span>
                    </div>
                    <div class="info_item">
                        <span class="item_name">详细地址：</span><span class="item_value">{{orderEntity.Address}}</span>
                    </div>
                    <div class="info_item">
                        <span class="item_name">收件时间：</span><span class="item_value">{{orderEntity.rectime}}</span>
                    </div>
                </div>
            </div>

            <div class="order_info_item_box" v-if="expressList.length > 0">
                <h2 class="info_item_title">快递信息</h2>
                <div class="shipping_info_box" v-for="item in expressList">
                    <div class="info_item">
                        <span class="item_name">快递公司：</span><span class="item_value">{{item.shipping_name}}</span>
                    </div>
                    <div class="info_item">
                        <span class="item_name">快递单号：</span><span class="item_value">{{item.invoice_no}}</span>
                        <a :href="item.search_express_url" class="check_logistical">查看物流</a>
                    </div>
                </div>
            </div>

            <div class="order_info_item_box">
                <h2 class="info_item_title">支付</h2>
                <div class="item_box">
                    <div class="info_item">
                        <span class="item_name">支付方式：</span><span class="item_value">{{orderEntity.pay_name}}</span>
                    </div>
                    <div class="info_item">
                        <span class="item_name">支付状态：</span><span class="item_value">{{orderEntity.orderStatus}}</span>
                    </div>
                </div>
            </div>

            <div class="order_info_item_box empty_order_info_item" :class="{blank_bottom: orderEntity.orderStatus == '待发货' || orderEntity.shipping_status == '1' || orderEntity.orderStatus == '待付款'}">
                <h2 class="info_item_title">备注</h2>
            </div>
        </div>



        <div class="order_process_tip" v-if="orderEntity.orderStatus == '待发货'">
            <span>工作人员正在配送</span>
        </div>
        <div class="confirm_receive_goods" v-if="orderEntity.shipping_status == '1'" @click="confirmReceiveGoods">确认收货</div>

        <div class="order_no_pay_handle_btn_box" v-if="orderEntity.orderStatus == '待付款'">
        <!-- <div class="order_no_pay_handle_btn_box"> -->
            <span class="cancel_order" @click="cancelOrder">取消订单</span>
            <span class="pay_order" @click="pay">马上支付</span>
        </div>

        <div class="cancel_order_reason_list_box" :class="{show: isShowCancelOrderReasonListBox}">
            <div class="cancel_order_reason_list_handle_box">
                <span class="cancel_order_reason_list_btn" @click="hideCancelOrderReasonListBox">取消</span>
                <h2>请选择取消订单原因</h2>
            </div>
            <ul class="cancel_order_reason_list">
                <li class="cancel_order_reason" v-for="(item, index) in cancelOrderReasonList" :key="item._id" @click="selectReacon(index)">{{item._reason}}</li>
            </ul>
        </div>

        <alert :isShowAlert="isShowAlert" :tipTitleF="tipTitleF" :tipContentF="tipContentF" :cbName="cbName" :isBlackF="true" v-on:hideAlert="hideAlert"></alert>

        <confirm v-on:confirmEvent="handleConfirm" v-on:cancelEvent="handleCancel" :isShowConfirm="isShowConfirm" :tipTitleF="tipTitleF" :tipContentF="tipContentF" :cbName="cbName"></confirm>

	</div>
</template>

<script>
    import alert from '../../components/common/alert.vue';
    import confirm from '../../components/common/confirm.vue';
    import wxPayHelper from '../../config/wx_pay_helper.js';

	export default {
        data() {
            return {
                orderDetailList: [], // 商品信息
                expressList: [], // 快递物流信息
                cancelOrderReasonList: [], // 取消订单原因列表
                orderEntity: {},
                isShowConfirm: false,
                isShowAlert: false,
                tipTitleF: '',
                tipContentF: '',
                isShowCancelOrderReasonListBox: false,
                cbName: '',
                cancelReasonId: '',
                restTime: 0,
                payment: JSON.parse(localStorage.getItem('PAYMENT')) || {'pay_name': '', 'pay_id': ''},
            }
        },

        methods: {
            confirmReceiveGoods() {
                this.tipTitleF = ' ';
                this.tipContentF = '确认收货吗'
                this.cbName = 'confirmReceiveGoodsCb';
                this.isShowConfirm = true;
            },

            confirmReceiveGoodsCb() {
                this.$request.get(this.$interface.CONFIRMGETGOODS, {
                    'orderId': this.orderEntity.order_id,
                    'userId': localStorage.getItem('USER_ID')
                }, (res) => {
                    this.$router.go(-1);
                })
            },

            hideAlert(cbName) {
                if(cbName != '' && typeof this[cbName] == 'function') {
                    this[cbName]();
                }
                this.isShowAlert = false;
            },

            handleConfirm(cbName) {
                if(cbName != '' && typeof this[cbName] == 'function') {
                    this[cbName]();
                }
                this.isShowConfirm = false;
                
            },

            handleCancel() {
                this.isShowConfirm = false;
            },

            applyReturn(index) {
                let goodsInfo = this.orderDetailList[index];
                let orderInfo = this.orderEntity;
                let combinationData = {};
                
                combinationData.telephone = orderInfo.mobile;
                combinationData.districtId = orderInfo.district;
                combinationData.addr = orderInfo.Address;
                combinationData.consignee = orderInfo.consignee;

                combinationData.relatedOrderId = goodsInfo.order_Id;
                combinationData.goodsId = goodsInfo.goodsId;
                combinationData.productId = goodsInfo.productId;
                combinationData.goodsType = goodsInfo.goodsType;

                localStorage.setItem('APPLY_RETURN_DATA', JSON.stringify(combinationData));

                this.$router.push('/apply_return');
            },

            cancelOrder() {
                if(this.cancelOrderReasonList.length > 0) {
                    this.isShowCancelOrderReasonListBox = true;
                }
            },

            hideCancelOrderReasonListBox() {
                this.isShowCancelOrderReasonListBox = false;
            },

            selectReacon(index) {
                this.tipTitleF = ' ';
                this.tipContentF = '是否取消订单';
                this.cbName = 'confirmCancelOrder';
                this.isShowConfirm = true;
                this.isShowCancelOrderReasonListBox = false;
                this.cancelReasonId = this.cancelOrderReasonList[index]._id
            },

            confirmCancelOrder() {
                // {orderId}&{userId}&{cancelReasonId}
                this.$request.get(this.$interface.CANCEL_ORDER_INFO, {
                    'orderId': this.$route.query.orderId,
                    'userId': localStorage.getItem('USER_ID') || 0,
                    'cancelReasonId': this.cancelReasonId
                }, (response) => {
                    this.$router.go(0);
                });
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
                let payId = data.payId;
                let orderSn = data.orderSn;
                let orderAmount = data.orderAmount;
                let time = parseInt(new Date().getTime() / 1000);
                let sign = this.$md5(payId + orderSn + orderAmount + time + 'inno');

                let encodeStr = payId + '||' + orderSn + '||' + orderAmount + '||' + time + '||' + sign;
                let payCode = this.base64Encode(encodeStr);
                return payCode;
            },

            pay: function() {
                this.$store.commit('SHOW_LOAD');
                let data = {
                    payId: this.payment.pay_id,
                    orderSn: this.orderEntity.order_sn,
                    orderAmount: this.orderEntity.order_amount,
                }
                let payCode = this.createPayCode(data);
                let url = "/wx_pay.php?pay_code=" + payCode;

                wxPayHelper.wxPayGetRequest(url, null, (res)=> {
                    let data = res.data;

                    wxPayHelper.callpay(data, this, (msg) => {
                        this.cbName = 'reloadPage';
                        this.tipContentF = msg;
                        this.isShowAlert = true;
                    });
                    this.$store.commit('HIDE_LOAD');
                });
            },

            reloadPage() {
                this.$router.go(0);
            }
        },

		mounted() {
            
			this.$request.get(this.$interface.GET_ALL_ORDER_ENTITY, {
                'orderId': this.$route.query.orderId
            }, (response) => {
                let data = response.data;

                this.orderDetailList = data.orderDetailList;
                this.orderEntity = data.orderEntity;
                this.expressList = data.expressList;

                if(this.orderEntity.orderStatus == '待付款') {
                    this.$request.get(this.$interface.GET_AUTO_CANCEL_TIME_BY_ORDER_ID, {
                        'orderId': this.$route.query.orderId
                    }, (response) => {
                        let data = response.data;
                        this.restTime = Math.ceil(data/60);
                    });
                }
            });


            this.$request.get(this.$interface.GET_MOTO_ORDER_CANCEL_REASON_LIST, {}, (response) => {
                let data = response.data;
                this.cancelOrderReasonList = data;
            });
		},
        components: {
            alert,
            confirm
        }
	}
</script>

<style scoped>
    .order_detail_main {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        z-index: 2;
        bottom: 0;
        background: #fff;
        box-sizing: border-box;
        overflow: hidden;
    }

    .order_detail_content {
        max-height: 100%;
        padding: 0 2%;
        overflow: auto;
    }

    .order_sys_tip {
        text-align: center;
        background: #b2b2b2;
        line-height: 0.7rem;
        margin-left: -2%;
        margin-right: -2%;
    }

    .order_info_item_box {
        position: relative;
        border: 1px solid #efefef;
        border-radius: 4px;
        line-height: 1.6;
        margin: 2% auto;
    }

    .order_info_item_box.blank_bottom {
        margin-bottom: 1.4rem;
    }

    .num_price_box {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        vertical-align: middle;
        width: 20%;
        text-align: center;
    }

    .empty_order_info_item {
        min-height: 2.8rem;
    }

    .order_info {
        display: inline-block;
        vertical-align: middle;
        width: 80%;
        border-left: 1px solid #efefef;
        margin-left: 20%;
        box-sizing: border-box;
        padding: 10px 5px;
    }

    .order_status {
        color: #ef8200;
    }

    .info_item_title {
        color: #7f7f7f;
        font-size: 14px;
        padding: 0.28rem 0.24rem 0 0.24rem;
    }

    .goods_item_box {
        font-size: 0;
        padding: .28rem;
    }

    .goods_item_box + .goods_item_box {
        border-top: 1px solid #efefef;
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

    .point_goods_tip {
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

    .goods_attr {
        line-height: 1.2;
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

    .goods_num_box {
        position: relative;
    }

    .goods_num {
        display: inline-block;
        vertical-align: middle;
    }

    .apply_return {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        color: #ef8200;
        border: 1px solid #ef8200;
        border-radius: 24px;
        line-height: 20px;
        padding: 0 10px;
    }

    .item_box {
        padding: 0 .28rem .28rem .28rem;
        line-height: 2;
        font-size: 0
    }

    .v_hidden {
        visibility: hidden;
    }

    .info_item {
        position: relative;
    }

    .item_name,
    .item_value {
        display: inline-block;
        font-size: 12px;
        vertical-align: top;
    }

    .item_name {
        width: 5.5em;
    }

    .item_value {
        width: calc(100% - 5.5em);
    }

    .shipping_info_box {
        padding: 0 .28rem .28rem .28rem;
    }

    .shipping_info_box + .shipping_info_box {
        border-top: 1px solid #efefef;
        padding: .28rem;
    }

    .check_logistical {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        padding: 0 10px;
        line-height: 20px;
        border: 1px solid #ef8200;
        border-radius: 24px;
        font-size: 12px;
        color: #ef8200;
    }

    .order_process_tip,
    .confirm_receive_goods,
    .order_no_pay_handle_btn_box {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        text-align: center;
        background: #fff;
        line-height: 1.2rem;
    }

    .order_process_tip span {
        display: inline-block;
    }

    .order_process_tip:after {
        content: '';
        display: inline-block;
        vertical-align: middle;
        width: 14px;
        height: 14px;
        background: url('../../images/order_detail/sending_status_icon.png') center no-repeat;
        background-size: 100% auto;
    }

    .confirm_receive_goods {
        background: #ef8200;
        color: #fff;
    }

    .order_no_pay_handle_btn_box {
        font-size: 0;
        color: #fff;
    }

    .cancel_order, 
    .pay_order {
        font-size: 14px;
        display: inline-block;
        vertical-align: middle;
        width: 50%;
    }

    .cancel_order {
        background: #b2b2b2;
    }

    .pay_order {
        background: #ef8200;
    }



    .cancel_order_reason_list_box {
        position: fixed;
        left: 0;
        right: 0;
        bottom: -100%;
        z-index: 10;
        background: #fff;
        text-align: center;
        transition: bottom .32s;
    }

    .cancel_order_reason_list_box.show {
        bottom: 0;
    }

    .cancel_order_reason_list_handle_box {
        position: relative;
        background: #b2b2b2;
        color: #fff;
        line-height: 1rem;
    }

    .cancel_order_reason_list_btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 4%;
    }

    .cancel_order_reason_list {
        max-height: 4.8rem;
        overflow: auto;
    }

    .cancel_order_reason {
        line-height: 0.96rem;
    }

    .cancel_order_reason + .cancel_order_reason {
        border-top: 1px solid #efefef;
    }
</style>
