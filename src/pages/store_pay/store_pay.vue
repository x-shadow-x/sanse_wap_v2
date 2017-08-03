<template>
	<div class="store_pay_main">
		<h2 class="pay_tip_title">请向收银人员出示当前页面</h2>
		<div class="code_box">
			<!-- <img src="http://www.sanse.com/mobile/buildcode.php?code=905635507642800017&no=0.34316262090578675" alt="条码" class="bar_code"> -->
			<img alt="条码" class="bar_code" id="barCode" :alt="payCode">
			<div class="qr_box">
				<img src="../../images/common/sanse_logo.png" alt="sanse logo" class="logo">
				<div id="qrCode" class="qr_code"></div>
			</div>
			<div class="auto_update" @click="updateCode">
				<span class="auto_update_text">每分钟自动更新</span>
			</div>
		</div>

		<router-link to="/history_pay" class="history_pay">
			<span class="history_pay_text">历史支付信息</span>
		</router-link>
	</div>
</template>

<script>

	import '../../config/jquery.qrcode.min.js';
	import '../../config/JsBarcode.all.min.js';

	export default {
		data() {
			return {
				payCode: '',
				updateCodeTimer: 0,
				validateIsScanTimer: 0,
				paymentId: 0
			}
		},

		methods: {
			createRandomCode(lowNum, heightNum) {
				return Math.floor(Math.random() * (heightNum - lowNum) + lowNum) + 1;
			},

			// 随机打乱18位数字生成最后的支付码
			encodeCode(content, length) {
				let resultArr = new Array(length);
			    let iLength = length / 3;
			    let iEnd = length % 3;
			    if (iEnd != 0) {
			        for(let i = 0; i < iEnd; i++) {
			            resultArr[i] = content[i];
			        }
			    }
			    let s = iEnd;
			    if (iLength != 0) {
			        for (let i = 0; i < iLength; i++) {
			            resultArr[s] =  content[iEnd+i];
			            resultArr[++s] =  content[iEnd+iLength+i];
			            resultArr[++s] =  content[iEnd+iLength+iLength+i];
			            ++s;
			        }
			    }

			    return resultArr;
			},

			createPayCode() {
				let userId = localStorage.getItem('USER_ID').split('');

				if(userId.length < 8)  {
					let restArr = Array.apply(null, Array(8 - userId.length)).map(function(item, i) {
					    return 0;
					});

					restArr.concat(userId);
					restArr.push(...userId);
					userId = restArr;
					// userId.push(...restArr);
				}
				let lArr = this.createRandomCode(10000, 100000).toString().split('');
				let rArr = this.createRandomCode(10000, 100000).toString().split('');
				let code = lArr.concat(userId, rArr);
				let result = this.encodeCode(code, 18);
				return result.join('');
			},

			// 更新条形码和二维码
			updateCode() {
				this.payCode = this.createPayCode();
				this.updateQrCode(this.payCode);
				this.updateBarcode(this.payCode);
				clearTimeout(this.updateCodeTimer);
				this.updateCodeTimer = setTimeout(() => {
					this.updateCode();
				}, 60000);
			},

			updateQrCode(data) {
				$('#qrCode').empty().qrcode({
				    render: "canvas", //也可以替换为table
				    width: $('#qrCode').width(),
				    height: $('#qrCode').width(),
				    text: data
				});
			},

			updateBarcode(data) {
				JsBarcode("#barCode", data, {
					height: '36%',
					fontSize: 20,
				});
			},

			isScan() {
				if(!localStorage.getItem('USER_ID')) {
					return;
				}
				// GET_OFFLINE_ORDERINFO
				this.$request.get(this.$interface.GET_OFFLINE_ORDERINFO, {
					'userId': localStorage.getItem('USER_ID') || 0,
	                'qrPayCode': this.payCode
	            }, (response) => {
	            	this.paymentId = response.data;
	            	if(this.paymentId > 0) {
	            		// 已经扫描
	            		localStorage.setItem('PAYMENT_ID', this.paymentId);
	            		this.$router.push(`/pay_info?paymentId=${this.paymentId}`);
	            	}
	            });

				if(this.paymentId <= 0) {
					clearTimeout(this.validateIsScanTimer);

		            this.validateIsScanTimer = setTimeout(() => {
		            	this.isScan();
		            }, 2000);
				}
	            
			}
		},

		mounted() {
			if(!this.$helper.isLogin()) {
                this.$router.push({path: this.$store.state.loginRouter, query:{original: window.location.href}});
            }
			this.updateCode();
			this.isScan();
		}
	}
</script>

<style scoped>
	.store_pay_main {
		position: fixed;
		z-index: 12;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: url('../../images/store_pay/shop_pay_bg_code.jpg') 0 0 repeat-x;
		background-size: auto 100%;
		padding: 2% 3%;
		overflow: hidden;
		text-align: center;
	}

	.pay_tip_title {
		color: #fff;
		letter-spacing: 1px;
		font-size: 14px;
		margin: 14% 0 8% 0;
	}

	.code_box {
		width: 84%;
		margin: 0 auto;
		background: #fff;
		border-radius: 10px;
		padding: 8% 0 4% 0;
	}

	.bar_code {
		width: 78%;
	}

	.qr_box {
		width: 68%;
		margin: 5% auto;
		position: relative;
	}

	.logo {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 20px;
		height: 20px;
		z-index: 2;
		border-radius: 4px;
	}

	.auto_update {
		display: inline-block;
		line-height: 2;
	}

	.auto_update:before{
		content: '';
		display: inline-block;
		vertical-align: middle;
		width: 18px;
		height: 18px;
		background: url('../../images/store_pay/refresh_icon.png') center no-repeat;
		background-size: 100% auto;
	}

	.auto_update_text {
		display: inline-block;
		vertical-align: middle;
	}

	.history_pay {
		position: fixed;
		bottom: 0;
		background: #fff;
		line-height: 1.2rem;
		left: 0;
		right: 0;
	}

	.history_pay:before {
		content: '';
		display: inline-block;
		vertical-align: middle;
		width: 18px;
		height: 18px;
		background: url('../../images/store_pay/history_pay_icon.png') center no-repeat;
		background-size: 100% auto;
	}

	.history_pay_text {
		display: inline-block;
		vertical-align: middle;
	}
</style>