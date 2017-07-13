<template>
	<div class="bind_phone_number_main">
        <div class="bg"></div>
        <div class="input_box">
            <input type="text" placeholder="请输入手机号码" v-model="phoneNumber">
        </div>
        <div class="input_box">
            <input type="text" placeholder="请输入验证码" v-model='captcha'>
            <span class="identifying_code_btn " v-bind:class="{ disable: isOverdue }" @click="sendIdentifyingCode">{{sendCodeTip}}</span>
            <!-- <span class="identifying_code_btn disbale" v-else>{{restTime}}s</span> -->
        </div>

        <div class="confirm_btn_box">
            <span class="confirm_btn" @click="loginByCaptcha">提交</span>
        </div>

        <alert v-on:hideAlert="hideAlert" :isShowAlert="isShowAlert" :tipTitleF="tipTitleF" tipContentF="tipContentF"></alert>
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
                // 记录是否重发验证码
                isOverdue: false,
                // 重发验证码剩余时间
                restTime: RESTTIME,
                // 显示隐藏提示消息弹框
                isShowAlert : false,
                sendCodeTip : '发送验证码',
                dataInterface : '',
                tipTitleF : '',
				tipContentF : '',
				captcha : '',
            }
        },

        methods: {
            sendIdentifyingCode() {
                
                if(this.isOverdue) {
                	return;
                }
                
                if(!this.phoneNumber) {
                	this.isShowAlert = true;
                	return;
                }
                this.dataInterface = this.$interface.SEND_SMS;
                this.$request.get(this.$interface.SEND_SMS, {
                	'userName' : this.phoneNumber,
					'smsType' : 3,
					'companyId' : this.$store.state.companyId,
					'brandId' : this.$store.state.brandId
                }, (res) => {
                	this.tipTitleF = '提示';
                	this.tipContentF = '信息已发送，请耐心等待';
                	this.isShowAlert = true;
                	this.isOverdue = true;
                })

                let timer = setInterval(() => {
                    if(this.restTime > 1) {

                        this.restTime--;
                        this.sendCodeTip = this.restTime;
                    } else {
                        this.isOverdue = false;
                        this.restTime = RESTTIME;
                        this.sendCodeTip = '发送验证码';
                        clearTimeout(timer);
                    }
                }, 1000);
            },

            loginByCaptcha() {

            	if(!this.phoneNumber || !this.captcha){
                	this.isShowAlert = true;
                	return;
                }
            	this.dataInterface = this.$interface.LOGIN_BY_CAPTCHA_BIND_PUSH;
            	this.$request.post(this.dataInterface,{
					'userName' : this.phoneNumber,
					'captcha' : this.captcha,
					'cookieId' : this.$store.state.cookie_id,
					'jpushid' : 0
            	}, (res) => {
                    console.log(res);
                    let userId = res.data.user_id;
            		this.$store.commit('SET_USER_ID', userId);
                    localStorage.setItem('USER_ID', userId);

            		this.$router.push('/user_index');
            	});
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
        border-radius: 4px;
        font-size: 10px;
        padding: 1px 0.242rem 0 0.242rem;
        min-width: 1.208rem;
        text-align: center;
    }

    .identifying_code_btn.disable {
        background: #cfcfcf;
        color: #fff;
    }

    .confirm_btn_box {
        margin-top: 0.773rem;
    }
</style>