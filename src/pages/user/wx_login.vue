<template>
	<div class="Choose_login" id="Choose_login">
		<div class="weChat_login" id="loginButton" @click="wxLogin">
	    	<div class="weChat_login_logo"></div>
	    	<span class="weichat-login C_fff" href="?act=weixin_authorize" id="">使用微信授权登录</span>
	    </div>
	    
	    	<span class="weichat-login-loading" id="weichatLoginLoading"></span>
	    
	    <div class="number_login round">
	    	<a type="button" class="mobile-login C_fff" href="logincaptcha.php?act=logincaptcha">手机验证登录</a><!--"?act=login"-->
	    </div>
	</div>
</template>

<script>
    import alert from '../../components/common/alert.vue';
    export default {
        data() {
            return {
                phoneNumber: '',
                // 记录是否重发验证码
                isOverdue: false,
                // 重发验证码剩余时间
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
            wxLogin() {
            	window.location.href = "http://www.sanse.com/sanse_wap_v2/api/wx_login.php?act=weixin_authorize";
            }
            
        },
        components: {
            alert
        }
    }
</script>


<style>

#btns_bar{display:none;}
.head_margin{display:none;}
.Choose_login{
	height:100%;
	box-sizing:border-box;
	/*background:url(images/img_wxlogin_bg.jpg) #222 no-repeat left center;*/
	background-size:100% auto;
	position:relative;
	}
.weChat_login{
	position:absolute;
	left:50%;
	bottom:4rem;
	transform:translateX(-50%);
	-moz-transform:translateX(-50%);
	-ms-transform:translateX(-50%);
	-o-transform:translateX(-50%);
	-webkit-transform:translateX(-50%);
	
	}
.weChat_login_logo{
	width:80%;
	padding-top:80%;
	margin:0px auto;
	/*background:url(images/wx_login.png) no-repeat left top;*/
	background-size:100% auto;
	margin-bottom:.2rem;
	}
.number_login{
	padding:.1rem .2rem;
	border:1px solid #fff;
	position:absolute;
	bottom:2rem;
	left:50%;
	transform:translateX(-50%);
	-moz-transform:translateX(-50%);
	-ms-transform:translateX(-50%);
	-o-transform:translateX(-50%);
	-webkit-transform:translateX(-50%);
	}
</style>