<template>

    <div class="user_info_main">

        <div class="info_box">
            <div class="info_item">
                <span class="item_name">昵称</span>
                <input type="text" class="info_input" placeholder="昵称不能为空" v-model="userInfo.UserName" @blur="saveUserName">
            </div>
            <div class="info_item">
                <span class="item_name">邮箱</span>
                <input type="email" class="info_input" v-model="userInfo.Email" placeholder="键入邮箱获取最新资讯" @blur="saveEmail">
            </div>
            <div class="info_item">
                <span class="item_name">性别</span>
                <span class="male_box" v-if="userInfo.Sex != 1">
                    <i class="sex_icon male_icon"></i>
                    <span>男</span>
                </span>
                <span class="female_box" v-if="userInfo.Sex == 1">
                    <i class="sex_icon female_icon"></i>
                    <span>女</span>
                </span>
                <span class="change_sex" @click="toggleSex($event)"></span>
            </div>
            <div class="info_item">
                <span class="item_name">生日</span>
                <input type="text" id="birthdayInput" class="info_input" v-model="userInfo.Birthday" placeholder="请选择您的生日">
                <div id="datePlugin"></div>
            </div>

        </div>

        <div class="info_box">
            <div class="info_item">
                <span class="item_name">手机</span>
                <input type="text" :placeholder="userInfo.MobileNo" v-model="newPhoneNumber" id="userPhone">
                <div class="bind_phone_box">
                    <span class="bind_phone_tip" v-if="isValidateStatus" @click="validatePhoneHanlde">验证手机</span>
                    <span class="bind_phone_tip" v-else @click="bindPhoneHanlde">{{bindPhoneTip}}</span>
                </div>
            </div>
            <div class="info_item">
                <span class="item_name">微信</span>
                <div class="binded_wechat_box" v-if="userInfo.IsBindWetchat == 1">
                    <i class="wechat_icon"></i>
                    <span class="binded_wechat_tip">已绑定</span>
                </div>
                <div class="unbind_wechat_box" v-else>
                    <span class="unbind_wechat_tip">绑定微信</span>
                </div>
            </div>
        </div>

        <!-- <div class="confirm_btn_box">
            <span class="confirm_btn">完成</span>
        </div> -->
        <div class="tip" :class="{show: isShowTip}">{{tip}}</div>
        <div class="validate_hover" v-if="inputValidateStatus">
            <div class="validate_box">
                <h2 class="validate_box_title">发送验证码</h2>
                <template v-if="restTime > 0">
                    <div>
                        <span>已发送至{{newPhoneNumber}}</span><span>({{restTime}}s)</span>
                    </div>
                </template>
                <template v-else>
                    <div>
                        <span>{{newPhoneNumber}}没收到?</span><span class="re_send" @click="sendIdentifyingCode">重新发送</span>
                    </div>
                </template>
                <div class="validate_input_box">
                    <div class="input_hover" @click="focusValidateInput">
                        <span v-for="(item, index) in captchaList" class="input_tip">{{item}}<i v-if="index == inputTipIndex && isValidateInputFocus || index == 5 && inputTipIndex == 6 && isValidateInputFocus" class="cursor" :class="{last: inputTipIndex == 6}"></i></span>
                    </div>
                    <input type="text" class="validate_input" id="validateInput" maxlength="6" v-model="captcha" :class="{ios: isIOS}" @blur="handleBlur">
                    <div class="validate_code_cell_box">
                        <span class="validate_code_cell_tip" v-for="item in captchaList" :class="{transparent: item == '$'}">{{item}}</span>
                    </div>
                </div>
                <p class="close_validate" @click="closeValidate">关闭弹窗</p>
            </div>
        </div>
        <alert v-on:hideAlert="hideAlert" :isShowAlert="isShowAlert" :tipTitleF="tipTitleF" tipContentF="tipContentF"></alert>
    </div>
</template>

<script>
    import '../../plugins/date/date.css'
    import '../../plugins/date/date.js'

    import alert from '../../components/common/alert.vue';

    export default {
        data() {
            return {
                userInfo: {},
                oldUserName: '', // 保存还未修改前的用户昵称~当用户因为误操作导致昵称为空并提交新编辑的信息的时候默认使用回最初的昵称
                newPhoneNumber: '',
                
                isValidateStatus: false,
                tip: '错误提示',
                isShowTip: false,
                isOverdue: false,
                restTime: this.$store.state.restTime,
                inputValidateStatus: false,
                captcha: '', // 验证码
                isValidateInputFocus: false,

                isShowAlert : false,
                tipTitleF : '',
                tipContentF : '',
            }
        },

        props: ['userInfoF'],

        computed: {
            captchaList: function() {
                var tempArr = this.captcha.split('');
                var result = ['$', '$', '$', '$', '$', '$'];
                tempArr.forEach((item, index) => {
                    result[index] = item;
                });
                return result;
            },

            inputTipIndex: function() {
                return this.captcha.length;
            },

            isIOS: function() {
            // 验证码输入框实际光标需要隐藏~但安卓和ios上的处理方式不同~需分开处理
                let userAgent = navigator.userAgent;
                // return ((userAgent.indexOf('Android') > -1) || (userAgent.indexOf('Linux')) > -1);
                return !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            },

            bindPhoneTip: function() {
                return this.userInfo.IsBindMobile == 1 ? '修改绑定' : '绑定手机';
            },

            handleInputedValidate: function() {
                return this.userInfo.IsBindMobile == 1 ? 'modifyBindPhoneNumberByCaptcha' : 'bindPhoneNumberByCaptcha';
            }
        },

        mounted() {

            if(!this.$helper.isLogin()) {
                this.$router.push({path: this.$store.state.loginRouter, query:{original: window.location.href}});
            }

            this.userInfo = this.extendObj(this.userInfoF);
            console.log(this);
            // this.userInfo = this.userInfoF;

            this.oldUserName = this.userInfo.UserName;

            if(Object.keys(this.userInfo).length > 0) {
                this.oldUserName = this.userInfo.UserName;
            } else {
                this.$request.get(this.$interface.GET_USERINFO_PUSH, {
                    'userId': localStorage.getItem('USER_ID') || 0,
                    'jpushId': this.$store.state.jpushId,
                    'channelId': this.$store.state.channelId,
                    'appId': this.$store.state.appId,
                    
                }, (res) => {
                    let data = res.data;
                    this.userInfo = data;
                    this.oldUserName = this.userInfo.UserName;
                })
            }

            $('#birthdayInput').date({
                cb: () => {
                    this.userInfo.Birthday = $('#birthdayInput').val();
                    this.updateUserInfo();
                    console.log('保存生日日期');
                }
            });
        },

        methods: {
            // 浅拷贝
            extendObj() {
                let args = Array.apply(null, arguments);
                let res = {};
                for(let i = 0, len = args.length; i < len; i++) {
                    let currentObj = args[i];
                    for(let key in currentObj) {
                        res[key] = currentObj[key]
                    }
                }
                return res;
            },

            hideAlert() {
                this.isShowAlert = false;
            },

            updateUserInfo() {
                // {userId}&{userName}&{sex}&{birthday}&{email}
                this.$request.get(this.$interface.UPDATEUSERS, {
                    'userId': localStorage.getItem('USER_ID') || 0,
                    'userName': this.userInfo.UserName,
                    'sex': this.userInfo.Sex,
                    'birthday': this.userInfo.Birthday || ' ',
                    'email': this.userInfo.Email || ' ', // 若没有输入邮箱~则必须传入空格
                }, (res) => {
                    let data = res.data;
                    this.$emit('updateUserInfo')
                })
            },

            saveUserName() {
                if(!this.userInfo.UserName) {
                    return;
                }
                this.updateUserInfo();
                console.log('保存昵称');
            },
            saveEmail() {
                if(!this.userInfo.Email) {
                    return;
                }
                this.updateUserInfo();
                console.log('保存邮箱');
            },
            toggleSex(e) {
                $(e.target).addClass('rotate');
                setTimeout(() => {
                    $(e.target).removeClass('rotate');
                }, 320);
                console.log(this.userInfo.Sex)
                if(this.userInfo.Sex != 1) {
                    this.userInfo.Sex = 1;
                } else {
                    this.userInfo.Sex = 0;
                }
                this.updateUserInfo();
                console.log('保存性别');
            },

            jump(path) {
                window.location = path;
            },

            bindPhoneHanlde() {
                $('#userPhone').focus();
                this.isValidateStatus = true;
            },

            sendIdentifyingCode() {
                this.restTime = this.$store.state.restTime;
                if(this.isOverdue) {
                    return;
                }
                
                this.$request.get(this.$interface.SEND_SMS, {
                    'userName' : this.newPhoneNumber,
                    'smsType' : 5, // 5表示绑定手机时的验证码
                    'companyId' : this.$store.state.companyId,
                    'brandId' : this.$store.state.brandId
                }, (res) => {
                    this.isOverdue = true;
                })

                let timer = setInterval(() => {
                    if(this.restTime > 0) {

                        this.restTime--;
                    } else {

                        this.isOverdue = false;
                        clearTimeout(timer);
                    }
                }, 1000);
            },

            // 修改绑定手机号处理函数
            modifyBindPhoneNumberByCaptcha() {
                if(!this.newPhoneNumber || !this.captcha) {
                    this.isShowAlert = true;
                    return;
                }

                this.$request.get(this.$interface.MODIFYUSERNAME, {
                    'userId': localStorage.getItem('USER_ID') || 0,
                    'captcha' : this.captcha,
                    'phoneNumber' : this.newPhoneNumber
                }, (res) => {
                    console.log(res);
                    if(res.code == -1) {
                        this.tip = res.msg;
                        this.isShowTip = true;
                        setTimeout(() => {
                            this.isShowTip = false;
                        }, 1000);
                        return;
                    } else {
                        this.closeValidate();
                    }
                }, null, {
                    cb: (res) => {
                        let code = res.data.code;
                        if(code == '-1') {
                            return true;
                        }
                    }
                });
            },

            // 绑定手机号处理函数
            bindPhoneNumberByCaptcha() {
                
                this.$request.get(this.$interface.SystemWeiXin_BindMobile, {
                    'userId': localStorage.getItem('USER_ID') || 0,
                    'phoneNumber': this.newPhoneNumber,
                    'msgcode': this.captcha
                }, (res) => {
                    console.log(res);
                    if(res.code == -1) {
                        this.tip = res.msg;
                        this.isShowTip = true;
                        setTimeout(() => {
                            this.isShowTip = false;
                        }, 1000);
                        return;
                    } else if(res.code == 0) {
                        // todo 询问是否合并资产
                        this.transferUserInfo('接口返回的另一个userid');
                    } else {
                        this.closeValidate();
                    }
                }, null, {
                    cb: (res) => {
                        let code = res.data.code;
                        if(code == '-1') {
                            return true;
                        }
                    }
                });
            },

            transferUserInfo(userId) {
                this.$request.get(this.$interface.SYS_TRANSFER_USERINFO, {
                    'fromUserid': localStorage.getItem('USER_ID') || 0,
                    'toUserid': userId
                }, (res) => {
                    console.log(res);
                    
                    // 关闭验证码弹窗
                    this.closeValidate();
                });
            },

            showTip(msg) {
                this.tip = msg;
                this.isShowTip = true;
                setTimeout(() => {
                    this.isShowTip = false;
                }, 1000);
            },

            validatePhoneHanlde() {
                if(!(/^1[34578]\d{9}$/.test(this.newPhoneNumber))) {
                    this.showTip('手机号码不正确');
                    return;
                }
                this.captcha = '';

                this.inputValidateStatus = true;

                // 发送验证码
                this.sendIdentifyingCode();
                console.log('发送验证码');
            },

            focusValidateInput() {
                $('#validateInput').focus();
                this.isValidateInputFocus = true;
            },

            handleBlur() {
                this.isValidateInputFocus = false;
            },

            closeValidate() {
                this.inputValidateStatus = false;
            }
        },

        watch: {
            'captcha' (to, from) {
                if(to.length >= 6) {
                    if(this.userInfo.IsBindMobile)
                    this[this.handleInputedValidate]();
                }
            }
        },

        components: {
            alert
        }

    }
</script>

<style scoped>
    .validate_hover {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .6);
    }

    .validate_box {
        background: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        text-align: center;
        border-radius: 4px;
        padding: 20px 0;
    }

    .validate_box_title {
        margin-bottom: 10px;
    }

    .re_send {
        color: #ef8200;
        text-decoration: underline;
        margin-left: 10px;
    }

    .validate_input_box {
        display: inline-block;
        margin-top: 20px;
        position: relative;
    }

    .validate_input {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 2;
        color: transparent;
        background: none;
    }

    .validate_input.ios {
        font-size: 0;
    }

    .input_hover {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 3;
        background: none;
        display: flex;
        justify-content: space-between;
    }

    .validate_code_cell_box {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: space-between;
        width: 132px;
    }

    .validate_code_cell_tip {
        font-family: 'sansefont_bold';
        font-size: 14px;
        border-bottom: 1px solid #b2b2b2;
        padding: 0 4px;
    }

    .validate_code_cell_tip.transparent,
    .input_tip {
        color: transparent;
    }

    .input_tip {
        position: relative;
        font-family: 'sansefont_bold';
        font-size: 14px;
        border-bottom: 1px solid #b2b2b2;
        padding: 0 4px;
    }

    .cursor {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 1px;
        height: 90%;
        background: #333;
        animation: flash 1s infinite alternate;
    }

    @keyframes flash {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    .cursor.last {
        margin-left: 4px;
    }


    .user_info_main {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        z-index: 12;
        height: 100%;
        overflow: visible;
        background: #efefef;
        box-sizing: border-box;
    }

    .user_info_main input {
        border: none;
        outline: none;
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
        color: #7f7f7f;
    }

    .info_input {
        height: 1.4rem;
        border: none;
        outline: none;
        width: 70%;
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

    .binded_wechat_box {
        display: inline-block;
        vertical-align: middle;
    }

    .wechat_icon {
        display: inline-block;
        vertical-align: middle;
        width: 16px;
        height: 16px;
        background: url('../../images/common/wechat_icon.png') center no-repeat;
        background-size: 100% auto;
    }

    .bind_phone_box,
    .unbind_wechat_box {
        position: absolute;
        right: .32rem;
        top: 50%;
        transform: translateY(-50%);
    }

    .binded_wechat_tip {
        display: inline-block;
        vertical-align: middle;
    }

    .bind_phone_tip,
    .unbind_wechat_tip {
        padding: 5px 10px;
        border: 1px solid #7f7f7f;
        color: #7f7f7f;
        border-radius: 4px;
    }

    .confirm_btn_box {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
    }

    .tip {
        position: fixed;
        left: -1000px;
        top: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, .8);
        color: #fff;
        padding: 10px 20px;
        border-radius: 4px;
        transition: opacity .5s, left 0s .53s;
        opacity: 0;
        z-index: 10;
        white-space: nowrap;
    }

    .tip.show {
        left: 50%;
        opacity: 1;
        transition: left 0s, opacity .5s .1s;
    }

    .close_validate {
        text-decoration: underline;
        margin-top: 24px;
    }
</style>
