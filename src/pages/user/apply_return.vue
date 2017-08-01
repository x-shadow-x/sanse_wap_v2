<template>
	<div class="apply_return_main">
		<div class="info_input_box">
			<input type="text" class="info_input" placeholder="请数据退货数量" v-model="returnData.goodsNum.value">
		</div>
		<div class="info_input_box">
			<input type="text" class="info_input" placeholder="退货原因" v-model="returnData.returnReason.value">
			<span class="input_hover" @click="showReturnReasonList"></span>
		</div>
		<div class="info_input_box">
			<input type="text" class="info_input" placeholder="问题说明" v-model="returnData.problemDes.value">
		</div>
		<div class="return_reason_list_box" :class="{show: isShowReturnReasonListBox}">
			<div class="return_reason_list_handle_box">
				<span class="return_reason_list_btn cancel_btn" @click="hideReturnReasonList">取消</span>
				<h2>请选择退货原因</h2>
			</div>
			<ul class="return_reason_list">
				<li class="return_reason" v-for="(item, index) in returnReasonList" :key="item._id" @click="selectReacon(index)">{{item._reason}}</li>
			</ul>
		</div>
		<div class="confirm_btn" @click="submitReturnApply">确认</div>
		<err-tip :errText="errTip" :isShowErrTip="isShowErrTip" v-on:hideErrTip="hideErrTip"></err-tip>
		<alert :isShowAlert="isShowAlert" :tipTitleF="tipTitleF" :tipContentF="tipContentF" :isBlackF="true" v-on:hideAlert="hideAlert"></alert>
	</div>
</template>

<script>
	import errTip from '../../components/common/err_tip.vue';
	import alert from '../../components/common/alert.vue';

	export default {
		data() {
			return {
				returnData: {
					goodsNum: {
						attr: 'num',
						text: '退货数量无效',
						value: ''
					},
					returnReason: {
						attr: 'need',
						text: '退货原因不能为空',
						value: '',
						returnReasonId: ''
					},
					problemDes: {
						attr: 'need',
						text: '问题描述不能为空',
						value: ''
					}
				},
				errTip: '',
				returnReasonList: [],
				isShowReturnReasonListBox: false,
				isShowErrTip: false,
				isShowAlert: false,
				tipTitleF: '',
				tipContentF: ''
			};
		},

		mounted() {
			this.$request.get(this.$interface.GET_REASON_LIST, {}, (response) => {
            	let data = response.data;
            	this.returnReasonList = data;
			});
		},

		methods: {
			showReturnReasonList() {
				this.isShowReturnReasonListBox = true;
			},

			hideReturnReasonList() {
				this.isShowReturnReasonListBox = false;
			},

			selectReacon(index) {
				this.returnData.returnReason.value = this.returnReasonList[index]._reason;
				this.returnData.returnReason.returnReasonId = this.returnReasonList[index]._id;
				this.isShowReturnReasonListBox = false;
			},

			hideErrTip() {
				this.isShowErrTip = false;
			},

			hideAlert() {
				this.isShowAlert = false;
				this.$router.go(-1);
			},

			submitReturnApply() {
				if(this.validate(this.returnData)) {
					let tempDataStr = localStorage.getItem('APPLY_RETURN_DATA');
					let goodsInfo = JSON.parse(tempDataStr);

					this.$request.get(this.$interface.CREATE_RESHIPORDER, {
						'relatedOrderId': goodsInfo.relatedOrderId,
						'userId': localStorage.getItem('USER_ID') || 0,
						'returnType': 1, // 目前只有退货，值为 1
						'returnReasonId': this.returnData.returnReason.returnReasonId,
						'returnRemark': this.returnData.problemDes.value,
						'consignee': goodsInfo.consignee,
						'telephone': goodsInfo.telephone,
						'districtId': goodsInfo.districtId,
						'addr': goodsInfo.addr,
						'returnGoodsnum': this.returnData.goodsNum.value,
						'goodsId': goodsInfo.goodsId,
						'productId': goodsInfo.productId,
						'goodsType': goodsInfo.goodsType,
					}, (res) => {
		            	if(res.code == '-1') {
		            		this.errTip = res.msg;
		            		this.isShowErrTip = true;
		            	} else {
		            		this.tipTitleF = '提示';
		            		this.tipContentF = '提交成功';
		            		this.isShowAlert = true;
		            	}
					}, null, {
						cb: (res) => {
							let code = res.data.code;
	                        if(code == '-1') {
	                            return true;
	                        }
						}
					});
				}
			},

			validate(data) {
				for(let key in data) {
					let currentData = data[key];

					if(currentData.attr == 'num') {
						if(!parseInt(currentData.value)) {
							this.errTip = currentData.text;
							this.isShowErrTip = true;
							return false;
						}
					} else if(currentData.attr == 'need') {
						if(currentData.value == '') {
							this.errTip = currentData.text;
							this.isShowErrTip = true;
							return false;
						}
					}
				}
				return true;
			}
		},

		components: {
			errTip,
			alert
		}
	}
</script>

<style scoped>
	.apply_return_main {
		position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 2;
        background: #fff;
        box-sizing: border-box;
        padding: 0 2%;
	}

	.info_input_box {
		border: 1px solid #efefef;
		border-radius: 4px;
		background: #fff;
		padding: 5px 10px;
		box-sizing: border-box;
		margin: 2% auto;
		position: relative;
	}

	.info_input {
		width: 100%;
		height: 0.9rem;
		border: none;
		outline: none;
	}

	.input_hover {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 2;
	}

	.return_reason_list_box {
		position: fixed;
		left: 0;
		right: 0;
		bottom: -100%;
		z-index: 10;
		background: #fff;
		text-align: center;
		transition: bottom .32s;
	}

	.return_reason_list_box.show {
		bottom: 0;
	}

	.return_reason_list_handle_box {
		position: relative;
		background: #b2b2b2;
		color: #fff;
		line-height: 1rem;
	}

	.return_reason_list_btn {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}

	.cancel_btn {
		left: 4%;
	}

	.return_reason_list {
		max-height: 4.8rem;
		overflow: auto;
	}

	.return_reason {
		line-height: 0.96rem;
	}

	.return_reason + .return_reason {
		border-top: 1px solid #efefef;
	}

	.confirm_btn {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		line-height: 1.2rem;
		background: #ef8200;
		color: #fff;
		text-align: center;
	}
</style>