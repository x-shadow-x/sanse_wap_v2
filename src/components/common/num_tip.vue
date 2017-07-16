<template>
	<span v-if="num > 0" class="num_tip_box">
		<span class="hide">{{tipNum}}</span>
		<span class="num_tip">{{tipNum}}</span>
	</span>
</template>

<script>
    export default {
        props: ['num'],
        computed: {
        	tipNum: function() {
        		if(this.num > 99) {
        			return '99+';
        		} else {
        			return this.num;
        		}
        	}
        }
    }
</script>

<style scoped>
	.num_tip_box {
		position: absolute;
		background: #ef8200;
		color: #fff;
		text-align: center;
		min-width: 12px;
		height: 16px;
		padding: 0 2px;
		border-radius: 100px;
		font-size: 8px;
		line-height: 1;
		font-weight: bolder;
		right: 3px;
		top: 3px;
		font-family: 'sansefont_bold';
	}

	.num_tip_box .hide {
		visibility: hidden;
	}

	.num_tip {
		margin-top: 1px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
</style>