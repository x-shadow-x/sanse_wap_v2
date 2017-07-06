<template>

    <div class="user_info_main">

        <div class="info_box">
            <div class="info_item">
                <span class="item_name">昵称</span>
                <input type="text" class="info_input" placeholder="昵称不能为空" v-model="userName">
            </div>
            <div class="info_item">
                <span class="item_name">邮箱</span>
                <input type="email" class="info_input" v-model="email" placeholder="键入邮箱获取最新资讯">
            </div>
            <div class="info_item">
                <span class="item_name">性别</span>
                <span class="male_box" v-if="sexValue == 0">
                    <i class="sex_icon male_icon"></i>
                    <span>男</span>
                </span>
                <span class="female_box" v-if="sexValue == 1">
                    <i class="sex_icon female_icon"></i>
                    <span>女</span>
                </span>
                <span class="change_sex" @click="toggleSex($event)"></span>
            </div>
            <div class="info_item">
                <span class="fl">生日</span>
                <input type="text" id="birthdayInput" class="fr info_input" v-model="birthdayDate" placeholder="请选择您的生日">
                <div id="datePlugin"></div>
            </div>
            
        </div>

        <div class="info_box">
            <div class="info_item">
                <span class="fl">绑定微信</span>
                <div class="fr">
                    <div class="bind_wechat_box" v-if="isBindWechat">
                        <span class="bind_wechat_tip">已绑定</span>
                        <i class="wechat_icon_avtive"></i>
                    </div>
                    <div class="unbind_wechat_box" v-else>
                        <span class="unbind_wechat_tip">
                            <span class="unbind_wechat_tip_text">立即绑定</span>
                        </span>
                        <i class="wechat_icon"></i>
                    </div>
                </div>
            </div>
            <div class="info_item">
                <span class="fl">修改绑定手机号码</span>
                <router-link to="/bind_phone_number">
                    <input type="text" class="fr info_input bind_phone_number" placeholder="请输入绑定手机号" readonly="true" v-model="bindPhoneNumber">
                </router-link>
            </div>
        </div>

        <div class="confirm_btn_box">
            <span class="confirm_btn">完成</span>
        </div>
    </div>
</template>

<script>
    import '../../plugins/date/date.css'
    import '../../plugins/date/date.js'

    export default {
        data() {
            return {
                userName: '',
                sexValue: 0,
                birthdayDate: '',
                email: '',
                isBindWechat: false,
                bindPhoneNumber: '13535124518'
            }
        },
        mounted() {
            $('#birthdayInput').date();
        },
        methods: {
            toggleSex(e) {
                console.log($(e.target));
                $(e.target).addClass('rotate');
                setTimeout(() => {
                    $(e.target).removeClass('rotate');
                }, 320);
                if(this.sexValue == 0) {
                    this.sexValue = 1;
                } else {
                    this.sexValue = 0;
                }
            },
            jump(path) {
                window.location = path;
            }
        }
    }
</script>

<style scoped>
    .user_info_main {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        z-index: 2;
        height: 100%;
        overflow: visible;
        background: #efefef;
        box-sizing: border-box;
    }

    .info_box {
        line-height: 1.4rem;
        background: #fff;
    }

    .info_box + .info_box {
        margin-top: 3px;
    }

    .info_item {
        position: relative;
        padding: 0 0.48rem 0 0.24rem;
        overflow: hidden;
    }

    .info_item + .info_item {
        border-top: 1px solid #efefef;
    }

    .item_name {
        display: inline-block;
        vertical-align: middle;
        margin-right: 20px;
    }

    .info_input {
        height: 1.4rem;
        border: none;
        outline: none;
        width: 50%;
        color: #7f7f7f;
        vertical-align: middle;
    }

    .male_box, .female_box,
    .sex_icon {
        display: inline-block;
        vertical-align: middle;
    }

    .male_box {
        margin-right: 0.58rem;
    }

    .sex_icon {
        width: 14px;
        height: 14px;
        background: url('../../images/user_info/sex_btn.png') center no-repeat;
        background-size: 100% auto;
    }

    .change_sex {
        position: absolute;
        right: .48rem;
        top: 50%;
        width: 14px;
        height: 14px;
        margin-top: -7px;
        background: url('../../images/user_info/toggle_icon.png') center no-repeat;
        background-size: 14px auto;
    }

    .change_sex.rotate {
        transition: transform .32s; 
        transform: rotate(180deg);
    }

    .male_icon {
        background-image: url('../../images/user_info/male_icon.png');
    }

    .female_icon {
        background-image: url('../../images/user_info/female_icon.png');
    }

    .unbind_wechat_tip, .wechat_icon,
    .bind_wechat_tip, .wechat_icon_avtive {
        display: inline-block;
        vertical-align: middle;
    }

    .wechat_icon, .wechat_icon_avtive {
        width: 24px;
        height: 24px;
        background: url('../../images/common/wechat_icon.png') center no-repeat;
        background-size: 100% auto;
    }

    .wechat_icon_avtive {
        background-image: url('../../images/common/wechat_active_icon.png');
    }

    .bind_wechat_tip {
        color: #7f7f7f;
    }

    .unbind_wechat_tip {
        border: 1px solid #ef8200;
        color: #ef8200;
        border-radius: 0.58rem;
        vertical-align: middle;
        font-size: 0;
        line-height: 15px;
    }

    .unbind_wechat_tip:after {
        content: '';
        display: inline-block;
        vertical-align: middle;
        width: 0;
        height: 100%;
    }

    .unbind_wechat_tip_text {
        display: inline-block;
        vertical-align: middle;
        font-size: 13px;
        padding: 0.072rem 0.242rem;
    }

    .bind_phone_number {
        padding-right: 16px;
        background: url('../../images/user_info/mobile_icon.png') center right no-repeat;
        background-size: 12px auto;
    }

    .confirm_btn_box {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
    }
</style>
