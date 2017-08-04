<template>
	<div class="wx_login_main">
		<div class="login_box">
			<div class="wechat_login" @click="wxLogin">
		    	<span class="wechat_login_logo"></span>
		    	<p>使用微信授权登录</p>
		    </div>
		    
		    <div class="phone_login">
		    	<router-link to="/login" class="phone_login_btn">手机验证登录</router-link>
		    </div>
		</div>
	</div>
</template>

<script>
	var root = process.env.API_WX_PAY_ROOT

    export default {
        data() {
            return {
            	original: this.$route.query.original
            }
        },

        methods: {
            wxLogin() {
            	let tempUrl = root + "/wx_login.php?act=weixin_authorize&original=" + this.original;
            	let urlArr = tempUrl.split('#');
            	window.location.href = root + "/wx_login.php?act=weixin_authorize&original=" + urlArr[0] + '&hash=' + urlArr[1];
            }
        }
    }
</script>


<style scoped>
	.wx_login_main {
		position: absolute;
        left: 0;
        right: 0;
        top: 0;
        height: 100%;
        z-index: 3;
        padding: 32% 0.773rem;
        box-sizing: border-box;
        background: url('../../images/common/login_bg.jpg') center top no-repeat #222;
        background-size: 100% auto;
        color: #fff;
        text-align: center;
	}

	.login_box {
		position: absolute;
		left: 50%;
		bottom: 20%;
		transform: translateX(-50%);
	}

	.wechat_login_logo {
		display: inline-block;
		width: 32px;
		height: 32px;
		background: url('../../images/common/wechat_icon.png') center no-repeat;
		background-size: 100% auto;
		margin-bottom: 0.1rem;
	}

	.phone_login {
		margin-top: 0.8rem;
	}

	.phone_login_btn {
		display: inline-block;
		border: 1px solid #fff;
		border-radius: 32px;
		line-height: 24px;
		padding: 0 10px;
	}
</style>