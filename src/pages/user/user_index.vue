<template>
    <div class="user_index_main">
         <div class="user_card_box" id="userCardBox">
            <div class="fn_bar" id="fnBar" :style="headStyle">
                <div class="user_info_breviary_box" v-if="showBreviary">
                    <div class="user_img_box_breviary">
                        <img src="../../images/common/default_user_icon.png" alt="会员头像" class="user_img_breviary">
                    </div>
                    <span class="user_name_breviary">{{userInfo.UserName}}</span>
                </div>
                <div class="fn_box">
                    <div class="invite_friend_box">
                        <span class="invite_friend_text">邀请好友</span>
                        <img src="../../images/user_index/invite_friend_qr_code.png" alt="邀请好友二维码" class="invite_friend_qr_code">
                    </div>
                    <img src="../../images/user_index/message.png" alt="消息入口按钮" class="message">
                </div>
            </div>
            <div class="user_info_box">
                <div class="user_img_box">
                    <img src="../../images/common/default_user_icon.png" alt="会员头像" class="user_img">
                </div>
                <div class="account_box">
                    <div class="account">{{userInfo.UserName}}</div>
                    <div class="card_type_box">
                        <span class="special_right" v-if="userInfo.IsStaff == 0"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="box">
            <ul class="user_property_list flex_list">
                <li class="user_property_item flex_item">
                    <router-link to="/blance">
                        <div class="user_property_value">{{userInfo.account_balance}}</div>
                        <span>余额</span>
                    </router-link>
                </li>
                <li class="user_property_item flex_item">
                    <router-link to="/red_package">
                        <div class="user_property_value">{{userInfo.red_packet}}</div>
                        <span>红包</span>
                    </router-link>
                </li>
                <li class="user_property_item flex_item">
                    <router-link to="/point">
                        <div class="user_property_value">{{userInfo.Points}}</div>
                        <span>积分</span>
                    </router-link>
                </li>
                <li class="user_property_item flex_item">
                    <router-link to="/coupon/no_use">
                        <div class="user_property_value">{{userInfo.canUseCouponNum}}</div>
                        <span>优惠券</span>
                    </router-link>
                </li>


            </ul>
        </div>
        <div class="box">
            <div class="my_order ofh">
                <span class="title_text fl">我的订单</span>
                <router-link to="/orders_all" class="check_all_order fr">
                    <span class="check_all_order_text">查看全部</span>
                    <i class="link_icon"></i>
                </router-link>
            </div>
        </div>

        <div class="box">
            <ul class="order_status_list flex_list">
                <li class="order_status_item flex_item">
                    <router-link to="/order_no_pay">
                        <span class="order_status_icon no_pay">
                            <num-tip :num="orderInfo.wait_to_pay" :style="numTipStyle"></num-tip>
                        </span>
                        <p>待付款</p>
                    </router-link>
                </li>
                <li class="order_status_item flex_item">
                    <router-link to="/orders_no_send">
                        <span class="order_status_icon no_send">
                            <num-tip :num="orderInfo.wait_to_shipping" :style="numTipStyle"></num-tip>
                        </span>
                        <p>待发货</p>
                    </router-link>
                </li>
                <li class="order_status_item flex_item">
                    <router-link to="/orders_no_receive">
                        <span class="order_status_icon no_receive">
                            <num-tip :num="orderInfo.wait_to_receiving" :style="numTipStyle"></num-tip>
                        </span>
                        <p>待收货</p>
                    </router-link>
                </li>
            </ul>
        </div>

        <ul class="user_fn_list">
            <!-- <li class="user_fn_item my_commission">
                <router-link to="/my_commission" class="user_fn_content ofh">
                    <span class="fl title_text">我的提成</span>
                </router-link>
            </li> -->
            <li class="user_fn_item user_data">
                <router-link to="/user_index/user_info" class="user_fn_content ofh">
                    <span class="fl title_text">个人资料</span>
                    <span class="fr user_fn_tip">完善信息领取100积分</span>
                </router-link>
            </li>
            <li class="user_fn_item location_manager">
                <router-link to="/address_manager" class="user_fn_content ofh">
                    <span class="fl title_text">地址管理</span>
                </router-link>
            </li>
            <li class="user_fn_item my_collection">
                <router-link to="/my_collection" class="user_fn_content ofh">
                    <span class="fl title_text">我的收藏</span>
                </router-link>
            </li>
            <li class="user_fn_item help_center">
                <router-link to="/help_center" class="user_fn_content ofh">
                    <span class="fl title_text">帮助中心</span>
                </router-link>
            </li>
            <li class="user_fn_item exit">
                <div class="user_fn_content ofh" @click="logout">
                    <span class="fl title_text">退出登录</span>
                </div>
            </li>
        </ul>

        <transition name="slide-right">
            <router-view :userInfoF="userInfo" v-on:updateUserInfo="updateUserInfo"></router-view>
        </transition>
    </div>

</template>

<script>

    import numTip from '../../components/common/num_tip.vue';
    import helper from '../../config/helper.js'

    export default {
        data() {
            return {
                headStyle: {
                    'background': 'rgba(0, 0, 0, 0)',
                },
                numTipStyle: {
                    // 数字提示泡泡默认定位为距离父盒子右上角3px的位置~若需修改~则需自定义样式并写到组件上
                    right: '-6px', 
                    top: '-3px'
                },
                userInfo: {},
                orderInfo: {},
                showBreviary: false
            }
        },

        methods: {
            /**
             * 退出登录仅需清楚相关的localStorage
             */
            logout() {
                localStorage.removeItem('USER_ID');
                localStorage.removeItem('WX_USER_OPENID');
                localStorage.removeItem('WX_UNIONID');
                localStorage.removeItem('COOKIE_ID'); 
                localStorage.removeItem('GOODS_DETAIL_DATA');
                helper.delCookie('WX_USER_ID');
                this.$router.push({path: this.$store.state.loginRouter, query:{original: window.location.href}});
            },

            updateData() {
                this.$request.get(this.$interface.GET_USERINFO_PUSH, {
                    'userId': localStorage.getItem('USER_ID') || 0,
                    'jpushId': this.$store.state.jpushId,
                    'channelId': this.$store.state.channelId,
                    'appId': this.$store.state.appId,
                    
                }, (res) => {
                    let data = res.data;
                    this.userInfo = data;
                })
            },

            updateUserInfo() {
                this.updateData();
            }
        },

        mounted() {
            if(!this.$helper.isLogin()) {
                console.log(window.location.href, '----------000------------');
                this.$router.push({path: this.$store.state.loginRouter, query:{original: window.location.href}});
            } else {
                this.updateData();

                this.$request.get(this.$interface.GET_APP_ORDERCOUNT_BY_USERID, {
                    'userId': localStorage.getItem('USER_ID')
                }, (res) => {
                    let data = res.data;
                    this.orderInfo = data;
                })


                // 头部显示阈值
                let threshold = $('#userCardBox').outerHeight() - $('#fnBar').outerHeight();

                $('.user_index_main').scroll(function() {
                    var opacity = $('.user_index_main').scrollTop() / threshold;
                    console.log(opacity, '-----------', (opacity >= 1));
                    this.showBreviary = (opacity >= 1);
                    this.headStyle['background'] = `rgba(0, 0, 0, ${opacity})`;
                }.bind(this));
            }
        },
        components: {
            numTip
        }
    }
</script>

<style scoped>

    .user_index_main {
        background: #efefef;
        height: 100%;
        overflow: auto;
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

    .my_commission {
        background-image: url('../../images/user_index/commission_icon.png');
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

    .order_status_list {
        text-align: center;
    }

    .order_status_item {
        font-size: 11px
    }

    [data-dpr="2"] .order_status_item {
        font-size: 22px;
    }

    .order_status_icon {
        display: inline-block;
        width: .78rem;
        height: .78rem;
        background: url('../../images/user_index/pay_icon.png') center no-repeat;
        background-size: 100% auto;
        position: relative;
    }

    .no_pay {
        background-image: url('../../images/user_index/pay_icon.png');
    }

    .no_send {
        background-image: url('../../images/user_index/send_goods_icon.png');
    }

    .no_receive {
        background-image: url('../../images/user_index/receive_goods_icon.png');
    }

    .user_property_list {
        font-size: 11px;
    }

    .user_property_value {
        font-size: 16px;
        margin-bottom: 0.16rem;
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

    .title_text {
        font-size: 13px;
    }

    .flex_list {
        display: flex;
    }

    .flex_item {
        flex: 1;
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

    .fn_bar {
        position: fixed;
        width: 100%;
        left: 0;
        top: 0;
        padding-right: 4%;
        box-sizing: border-box;
        height: 1.2rem;
        line-height: 1.2rem;
        background: rgba(0, 0, 0, 0);
        z-index: 3;
    }

    .user_info_breviary_box {
        display: inline-block;
        font-size: 9px;
        margin-left: 4%;
        color: #fff;
    }

    .user_img_box_breviary {
        display: inline-block;
        vertical-align: middle;
        width: .6rem;
        padding-top: .6rem;
        position: relative;
        border-radius: 10000px;
        border: 2px solid #fff;
        overflow: hidden;
        background: #fff;
    }

    .user_img_breviary {
        position: absolute;
        width: 100%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .fn_box {
        position: absolute;
        right: 4%;
        top: 50%;
        transform: translateY(-50%);
        white-space: nowrap;
    }

    .invite_friend_box {
        display: inline-block;
        vertical-align: middle;
        font-size: 9px;
        color: #fff;
        text-align: center;
        white-space: nowrap;
        line-height: 1;
    }

    .invite_friend_text {
        display: inline-block;
        vertical-align: middle;
    }

    .invite_friend_qr_code,
    .message {
        width: 20px;
        height: 20px;
        vertical-align: middle;
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
        line-height: 0.72rem;
    }

    .special_right {
        display: inline-block;
        vertical-align: middle;
        width: 2.3rem;
        height: 0.5rem;
        text-align: center;
        background: url('../../images/user_index/special.png') center no-repeat;
        background-size: 100% auto;
    }
</style>
