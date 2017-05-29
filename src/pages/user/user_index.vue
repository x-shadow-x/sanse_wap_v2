<template>
    <div class="user_index_main">
         <div class="user_card_box" id="userCardBox">
            <div class="fn_box" id="fnBox" :style="headStyle">
                <div class="invite_friend_box">
                    <span class="invite_friend_text">邀请好友</span>
                    <img src="../../images/user_index/invite_friend_qr_code.png" alt="邀请好友二维码" class="invite_friend_qr_code">
                </div>
                <img src="../../images/user_index/message.png" alt="消息入口按钮" class="message">
            </div>
            <div class="user_info_box">
                <div class="user_img_box">
                    <img src="../../images/common/default_user_icon.png" alt="会员头像" class="user_img">
                </div>
                <div class="account_box">
                    <div class="account">13535124518</div>
                    <div class="card_type_box">
                        <span class="card_type">普通会员</span>
                        <span class="special_right">S'pecial特权</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="box">
            <ul class="user_property_list flex_list">
                <li class="user_property_item flex_item" v-for="item in userPropertyList">
                    <router-link :to="item.to">
                        <div class="user_property_value">{{item.propertyValue}}</div>
                        <span>{{item.text}}</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="box">
            <div class="my_order ofh">
                <span class="title_text fl">我的订单</span>
                <router-link to="/hpme" class="check_all_order fr">
                    <span class="check_all_order_text">查看全部</span>
                    <i class="link_icon"></i>
                </router-link>
            </div>
        </div>

        <div class="box">
            <ul class="order_status_list flex_list">
                <li class="order_status_item flex_item" v-for="item in orderStatusList">
                    <router-link :to="item.to">
                        <div class="order_status_icon_box">
                            <img :src="item.iconUrl" alt="" class="order_status_icon">
                        </div>
                        <span>{{item.text}}</span>
                    </router-link>
                </li>
            </ul>
        </div>

        <ul class="user_fn_list">
            <li class="user_fn_item user_data">
                <router-link to="/user_info" class="user_fn_content ofh">
                    <span class="fl title_text">个人资料</span>
                    <span class="fr user_fn_tip">完善信息领取100积分</span>
                </router-link>
            </li>
            <li class="user_fn_item location_manager">
                <router-link to="/home" class="user_fn_content ofh">
                    <span class="fl title_text">地址管理</span>
                </router-link>
            </li>
            <li class="user_fn_item my_collection">
                <router-link to="/home" class="user_fn_content ofh">
                    <span class="fl title_text">我的收藏</span>
                </router-link>
            </li>
            <li class="user_fn_item help_center">
                <router-link to="/home" class="user_fn_content ofh">
                    <span class="fl title_text">帮助中心</span>
                </router-link>
            </li>
            <li class="user_fn_item exit">
                <router-link to="/home" class="user_fn_content ofh">
                    <span class="fl title_text">退出登录</span>
                </router-link>
            </li>
        </ul>
        <!-- <footer-bar></footer-bar> -->
    </div>

</template>

<script>
    // import footerBar from '../../components/common/footer_bar.vue';

    export default {
        data() {
            return {
                headStyle: {
                    'background': 'rgba(0, 0, 0, 0)',
                },
                userPropertyList: [
                    {
                        'text': '余额',
                        'propertyValue': '0.00',
                        'to': '/home'
                    },
                    {
                        'text': '红包',
                        'propertyValue': '0.00',
                        'to': '/home'
                    },
                    {
                        'text': '积分',
                        'propertyValue': '286',
                        'to': '/home'
                    },
                    {
                        'text': '优惠券',
                        'propertyValue': '3',
                        'to': '/home'
                    }
                ],

                orderStatusList: [
                    {
                        'text': '待付款',
                        'iconUrl': require('../../images/user_index/pay_icon.png'),
                        'propertyValue': '0.00',
                        'to': '/home'
                    },
                    {
                        'text': '待发货',
                        'iconUrl': require('../../images/user_index/send_goods_icon.png'),
                        'propertyValue': '0.00',
                        'to': '/home'
                    },
                    {
                        'text': '待收货',
                        'iconUrl': require('../../images/user_index/receive_goods_icon.png'),
                        'propertyValue': '286',
                        'to': '/home'
                    }
                ]
            }
        },
        // components: {
        //     footerBar
        // },
        methods: {
        },
        mounted() {
            // 头部显示阈值
            let threshold = $('#userCardBox').outerHeight() - $('#fnBox').outerHeight();
            $(window).scroll(function() {
                var opacity = $(document).scrollTop() / threshold;
                this.headStyle['background'] = `rgba(0, 0, 0, ${opacity})`;
            }.bind(this));
        }
    }
</script>

<style scoped>

    .user_index_main {
        background: #efefef;
    }

    .user_fn_list {
        padding-bottom: 0.185185rem;
    }

    .user_fn_item {
        padding-left: 1.388889rem;
        background: url('../../images/user_index/user_data_icon.png') 0.462963rem center no-repeat;
        background-size: 0.592593rem auto;
    }

    .user_fn_item:last-child {
        border-bottom: 1px solid #e7e7e7;
    }

    .user_fn_item:last-child .user_fn_content {
        border: none;
    }

    .location_manager {
        background-image: url('../../images/user_index/location_icon.png');
    }

    .my_collection {
        background-image: url('../../images/user_index/collection_icon.png');
    }

    .help_center {
        background-image: url('../../images/user_index/help_icon.png');
    }

    .exit {
        background-image: url('../../images/user_index/exit.png');
    }

    .user_fn_content {
        display: block;
        padding: 0.462963rem 0;
        position: relative;
        border-bottom: 1px solid #e7e7e7;
    }

    .user_fn_content:after {
        content: '';
        width: 0.148148rem;
        height: 0.259259rem;
        background: url('../../images/common/link_right_arrow.png') right center no-repeat;
        background-size: 0.148148rem auto;
        position: absolute;
        right: 0.240741rem;
        top: 50%;
        transform: translateY(-50%);
    }

    .user_fn_tip {
        position: absolute;
        right: 0.8rem;
        top: 50%;
        transform: translateY(-50%);
        color: #ef8200;
    }

    /*------------------------------------------*/
    .order_status_list {
        text-align: center;
    }

    .order_status_item {
        font-size: 11px
    }

    [data-dpr="2"] .order_status_item {
        font-size: 22px;
    }

    [data-dpr="3"] .order_status_item {
        font-size: 33px;
    }

    .order_status_icon_box {
        width: 0.796296rem;
        position: relative;
        margin: 0 auto 0.092593rem auto;
    }

    .order_status_icon {
        width: 100%;
    }

    /*----------------------------------------*/
    .user_property_list {
        font-size: 11px;
    }

    [data-dpr="2"] .user_property_list {
        font-size: 22px;
    }

    [data-dpr="3"] .user_property_list {
        font-size: 33px;
    }

    .user_property_value {
        font-size: 21px;
        margin-bottom: 0.166667rem;
    }

    [data-dpr="2"] .user_property_value {
        font-size: 42px;
    }

    [data-dpr="3"] .user_property_value {
        font-size: 63px;
    }

    .user_property_item {
        text-align: center;
        position: relative;
    }

    .user_property_item + .user_property_item:before {
        content: '';
        position: absolute;
        left: -1px;
        top: 50%;
        transform: translateY(-50%);
        width: 1px;
        height: 0.407407rem;
        background: #e7e7e7;
    }

    .my_order {
        padding: 0 0.240741rem;
    }

    .check_all_order {
        color: #a3a3a3;
    }

    .check_all_order_text,
    .link_icon {
        display: inline-block;
        vertical-align: middle;
    }

    .link_icon {
        width: 0.148148rem;
        height: 0.259259rem;
        background: url('../../images/common/link_right_arrow.png') right center no-repeat;
        background-size: 0.148148rem auto;
        padding-right: 0.2rem;
    }

    /*-----------------------*/

    .title_text {
        font-size: 13px;
    }

    .flex_list {
        display: flex;
    }

    .flex_item {
        flex: 1;
    }

    [data-dpr="2"] .title_text {
        font-size: 26px;
    }

    [data-dpr="3"] .title_text {
        font-size: 39px;
    }

    .box {
        position: relative;
        padding: 0.462963rem 0;
    }

    .box:after {
        content: '';
        position: absolute;
        left: 0.240741rem;
        right: 0;
        bottom: 0;
        height: 1px;
        background: #e7e7e7;
    }

    .fn_box {
        text-align: right;
        position: fixed;
        width: 100%;
        left: 0;
        top: 0;
        padding-right: 4%;
        box-sizing: border-box;
        line-height: 1.2rem;
        background: rgba(0, 0, 0, 0);
        z-index: 10000;
    }

    .invite_friend_box {
        display: inline-block;
        vertical-align: middle;
        font-size: 9px;
        color: #fff;
        text-align: center;
        white-space: nowrap;
    }

    [data-dpr="2"] .invite_friend_box {
        font-size: 18px;
    }

    [data-dpr="3"] .invite_friend_box {
        font-size: 27px;
    }

    .invite_friend_text {
        display: inline-block;
        vertical-align: middle;
        line-height: 20px;
    }

    .invite_friend_qr_code,
    .message {
        width: 20px;
        height: 20px;
        vertical-align: middle;
    }

    [data-dpr="2"] .invite_friend_qr_code,
    [data-dpr="2"] .message {
        width: 40px;
        height: 40px;
    }

    [data-dpr="3"] .invite_friend_qr_code,
    [data-dpr="3"] .message {
        width: 60px;
        height: 60px;
    }

    .message {
        margin-left: 6%;
    }

    .user_card_box {
        padding-top: 48.98%;
        box-sizing: border-box;
        background: url('../../images/user_index/user_card.jpg') center top no-repeat;
        background-size: 100% auto;
        font-size: 0;
        position: relative;
    }

    .user_info_box {
        position: absolute;
        width: 100%;
        box-sizing: border-box;
        padding: 0 4%;
        top: 38%;
        color: #fff;
    }

    .user_img_box,
    .account_box {
        display: inline-block;
        vertical-align: middle;
        white-space: nowrap;
    }

    .user_img_box {
        width: 23.57%;
        padding-top: 23.57%;
        position: relative;
        border-radius: 10000px;
        border: 2px solid #fff;
        overflow: hidden;
    }

    .user_img {
        position: absolute;
        width: 100%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .account_box {
        margin-left: 3.11%;
    }

    .account {
        font-size: 14px;
        line-height: 40px;
    }

    [data-dpr="2"] .account {
        font-size: 28px;
        line-height: 80px;
    }

    [data-dpr="3"] .account {
        font-size: 42px;
        line-height: 120px;
    }

    .card_type {
        font-size: 12px;
        display: inline-block;
        vertical-align: middle;
    }

    [data-dpr="2"] .card_type {
        font-size: 24px;
    }

    [data-dpr="3"] .card_type {
        font-size: 36px;
    }

    .special_right {
        display: inline-block;
        vertical-align: middle;
        width: 2.133333rem;
        height: 0.4rem;
        text-align: center;
        background: url('../../images/user_index/special.png') center no-repeat;
        background-size: 100% auto;
        margin-left: 0.2rem;
    }

    /*-------------------------------------*/
</style>
