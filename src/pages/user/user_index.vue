<template>
    <div class="user_index_main">
         <div class="user_card_box">
            <div class="user_info_box">
                <div class="user_img_box">
                    <img src="../../images/common/default_user_icon.png" alt="会员头像" class="user_img">
                </div>
                <div class="account_box">
                    <div class="account">13535124518</div>
                    <span class="card_type">Director Card</span>
                </div>
                <div class="invite_friend_box">
                    <img src="../../images/user_index/invite_friend_qr_code.jpg" alt="邀请好友二维码" class="invite_friend_qr_code">
                    <span class="invite_friend_text">邀请好友</span>
                </div>
            </div>
            <div class="card_code_box">
                <div class="card_code">SA 0093 2765</div>
                <div class="card_detail">卡片详情></div>
            </div>
        </div>
        <footer-bar></footer-bar>
    </div>
</template>

<script>
    import footerBar from '../../components/common/footer_bar.vue';

    export default {
        name: 'home',
        components: {
            footerBar
        },
        methods: {},
    }
</script>

<style scoped>

    .user_index_main {
        padding-top: 0.375rem;
    }
    .user_card_box {
        width: 90.15%;
        margin: 0 auto;
        padding-top: 48.98%;
        box-sizing: border-box;
        background: url('../../images/user_index/user_card.png') center no-repeat;
        background-size: 100% auto;
        font-size: 0;
        position: relative;
    }

    .user_info_box {
        position: absolute;
        width: 100%;
        padding: 0 5.5%;
        top: 11.25%;
    }

    .user_img_box,
    .account_box,
    .invite_friend_box {
        display: inline-block;
        vertical-align: middle;
    }

    .user_img_box {
        width: 23.57%;
        padding-top: 23.57%;
        position: relative;
        border-radius: 10000px;
        border: 2px solid #c5ab6d;
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
        color: #c5ab6d;
        width: 49.56%;
    }

    .account {
        font-size: 20px;
        line-height: 40px;
    }

    .card_type {
        font-size: 14px;
    }

    .invite_friend_box {
        width: 12.65%;
        font-size: 5px;
        color: #fff;
        text-align: center;
    }

    .invite_friend_qr_code {
        width: 50%;
    }

    .invite_friend_text {
        display: block;
        line-height: 14px;
    }

    .card_code_box {
        position: absolute;
        width: 100%;
        padding-left: 5.55%;
        bottom: 10%;
    }

    .card_code {
        font-size: 20px;
        color: #c5ab6d;
        line-height: 26px;
    }

    .card_detail {
        background: #454545;
        color: #fff;
        font-size: 14px;
        border-radius: 4px;
        display: inline-block;
        padding: 0 0.156rem;
        line-height: 20px;
    }
</style>
