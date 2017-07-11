<template>
	<div class="goods_detail_main">
		<div class="order_info_item_box">
            <div class="num_price_box">
                <p>¥0.00</p>
                <p>共1款</p>
            </div>
            <div class="order_info">
                <p>单号：00001170710143139710399</p>
                <p>日期：2017-07-10 14:31</p>
                <span class="order_status">待发货</span>
            </div>
        </div>

        <div class="order_info_item_box">
            <h2 class="info_item_title">商品详情</h2>
            <div class="goods_item_box" v-for="item in orderDetailList" :key="item.goodsId">
                <div class="goods_img_box">
                    <img :src="item.img_url" :alt="item.goods_Name" class="goods_img">
                </div>
                <div class="goods_info_box">
                    <h2 class="goods_name">{{item.goods_Name}}</h2>
                    
                    <div class="relative_box">
                        <p>颜色：{{item.colorName}}</p>
                        <span class="point_goods_tip" v-if="item.goodsType == 2">积分商品</span>
                    </div>
                    <p>尺码：{{item.sizeName}}</p>
                    <div class="old_price_box">
                        <span class="money_tip">¥</span><span class="price">{{item.market_price}}</span>
                    </div>
                    <div class="current_price_box">
                        <span class="point" v-if="item.exchange_integral > 0">{{item.exchange_integral}}+</span>
                        <span class="money_tip">¥</span><span class="price">{{item.price}}</span>
                    </div>
                    <p>数量：{{item.goods_num}}</p>
                </div>
            </div>
        </div>

        <div class="order_info_item_box">
            <h2 class="info_item_title">资费详情</h2>
            <div class="item_box">
                <div class="info_item">
                    <span class="item_name">商品件数：</span><span class="item_value">1件</span>
                </div>
                <div class="info_item">
                    <span class="item_name">商品总价：</span><span class="item_value">¥669.00</span>
                </div>
                <div class="info_item">
                    <span class="item_name">优惠金额：</span><span class="item_value">¥166.00</span>
                </div>
                <div class="info_item">
                    <span class="item_name">余额支付：</span><span class="item_value">¥166.00</span>
                </div>
                <div class="info_item">
                    <span class="item_name">运<span class="v_hidden">占位</span>费：</span><span class="item_value">¥166.00</span>
                </div>
                <div class="info_item">
                    <span class="item_name">订单金额：</span><span class="item_value">¥0.00</span>
                </div>
            </div>
        </div>

        <div class="order_info_item_box">
            <h2 class="info_item_title">收货地址详情</h2>
            <div class="item_box">
                <div class="info_item">
                    <span class="item_name">收&nbsp;&nbsp;件&nbsp;&nbsp;人：</span><span class="item_value">1件</span>
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

        <div class="order_info_item_box">
            <h2 class="info_item_title">快递信息</h2>
            <div class="item_box">
                <div class="info_item">
                    <span class="item_name">快递公司：</span><span class="item_value">{{orderEntity.shipping_name}}</span>
                </div>
                <div class="info_item">
                    <span class="item_name">快递单号：</span><span class="item_value">{{orderEntity.invoice_no}}</span><span class="check_logistical">查看物流</span>
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

        <div class="order_info_item_box empty_order_info_item">
            <h2 class="info_item_title">备注</h2>
        </div>
	</div>
</template>

<script>
	export default {
        data() {
            return {
                orderDetailList: [],
                orderEntity: []
            }
        },
		mounted() {

			this.$request.get(this.$interface.GET_ALL_ORDER_ENTITY, {
                'orderId': this.$route.query.orderId
            }, (response) => {
                let data = response.data;

                this.orderDetailList = data.orderDetailList;
                this.orderEntity = data.orderEntity;


            });
		}
	}
</script>

<style scoped>
    .goods_detail_main {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        z-index: 2;
        bottom: 0;
        overflow: visible;
        background: #fff;
        box-sizing: border-box;
        padding: 0 2%;
        overflow: auto;
    }

    .order_info_item_box {
        position: relative;
        border: 1px solid #efefef;
        border-radius: 4px;
        line-height: 1.6;
        margin: 2% auto;
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
        height: 2.8rem;
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
        width: 30%;
        padding-top: 30%;
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
        width: 70%;
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

    .old_price_box {
        color: #7f7f7f;
        font-weight: normal;
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
</style>