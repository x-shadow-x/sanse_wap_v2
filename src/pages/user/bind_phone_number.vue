<template>
    <div class="bind_phone_number_main">
        <div class="bg"></div>
        <div class="input_box">
            <input type="text" :placeholder="placeholder" v-model="phoneNumber">
        </div>
        <div class="input_box">
            <input type="text" placeholder="请输入验证码">
            <span class="identifying_code_btn" v-if="isOverdue" @click="sendIdentifyingCode">发送验证码</span>
            <span class="identifying_code_btn disbale" v-else>{{restTime}}s</span>
        </div>

        <div class="confirm_btn_box">
            <span class="confirm_btn">提交</span>
        </div>

        <alert v-on:hideAlert="hideAlert" :isShowAlert="isShowAlert"></alert>
    </div>
</template>

<script>
    // 设置重发验证码剩余时间
    const RESTTIME = 5;
    import alert from '../../components/common/alert.vue';
    export default {
        data() {
            return {
                phoneNumber: '',
                // 记录用户是否已经绑定过手机号码~如果已经绑定过~则第一个输入框提示文字为“请输入新的手机号码”
                isBind: true,
                // 记录是否重发验证码
                isOverdue: true,
                // 重发验证码剩余时间
                restTime: RESTTIME,
                // 显示隐藏提示消息弹框
                isShowAlert: false
            }
        },
        computed: {
            placeholder() {
                return this.isBind ? '请输入新的手机号码' : '请输入手机号码'
            }
        },
        methods: {
            sendIdentifyingCode() {
                this.isShowAlert = true;
                this.isOverdue = false;

                let timer = setInterval(() => {
                    if(this.restTime > 1) {
                        this.restTime--;
                    } else {
                        this.isOverdue = true;
                        this.restTime = RESTTIME;
                        clearTimeout(timer);
                    }
                }, 1000);
            },
            hideAlert() {
                this.isShowAlert = false;
            }
        },
        components: {
            alert
        }
    }
</script>

<style scoped>
    .bind_phone_number_main {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        height: 100%;
        z-index: 3;
        padding: 32% 0.773rem;
        box-sizing: border-box;
        background: #222;
    }

    .bg {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        filter: blur(5px);
        background: url('../../images/common/login_bg.jpg') center top no-repeat #222;
        background-size: 100% auto;
        z-index: -1;
    }

    .content_main {
        position: absolute;
        z-index: 2;
    }

    .input_box {
        border-top: 1px solid #fff;
        position: relative;
    }

    .input_box + .input_box {
        border-bottom: 1px solid #fff;
    }

    input {
        height: 1.4rem;
        background: none;
        border: none;
        outline: none;
        width: 60%;
        color: #fff;
    }

    .identifying_code_btn {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        color: #fff;
        background: #ef8200;
        line-height: 0.628rem;
        border-radius: 0.628rem;
        font-size: 10px;
        padding: 1px 0.242rem 0 0.242rem;
        min-width: 1.208rem;
        text-align: center;
    }

    .identifying_code_btn.disbale {
        background: #cfcfcf;
        color: #fff;
    }

    .confirm_btn_box {
        margin-top: 0.773rem;
    }
</style>
