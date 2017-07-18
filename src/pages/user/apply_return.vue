<template>
	<div class="apply_return_main">
		<div class="info_input_box">
			<input type="text" class="info_input" placeholder="请数据退货数量" v-model="goodsNum">
		</div>
		<div class="info_input_box">
			<input type="text" class="info_input" placeholder="退货原因" v-model="returnReason">
			<span class="input_hover"></span>
		</div>
		<div class="info_input_box">
			<input type="text" class="info_input" placeholder="问题说明" v-model="problemDes">
		</div>
		<div class="return_reason_list_box">
			<div class="return_reason_list_handle_box">
				<span class="return_reason_list_btn cancel_btn">取消</span>
				<h2>请选择退货原因</h2>
			</div>
			<ul class="return_reason_list">
				<li class="return_reason" v-for="(item, index) in returnReasonList" :key="item._id" @click="">{{item._reason}}</li>
			</ul>
		</div>
		<div class="confirm_btn">确认</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				goodsNum: '',
				returnReason: '',
				problemDes: '',
				returnReasonList: []
			};
		},
		mounted() {
			this.$request.get(this.$interface.GET_REASON_LIST, {}, (response) => {
            	let data = response.data;
            	this.returnReasonList = data;
			});
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
		bottom: 0;
		z-index: 10;
		background: #fff;
		text-align: center;
	}

	.return_reason_list_handle_box {
		position: relative;
		background: #7f7f7f;
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