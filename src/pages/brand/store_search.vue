<template>
	<div class="store_search_main">
		<div class="goods_info_box">
			<div class="goods_img_box">
				<img src="../../images/test_img.jpg" alt="商品图片" class="goods_img">
			</div>
			<div class="goods_detail_info_box">
				<h2 class="goods_name">ORIGINALS TRACKTOP</h2>
				<div class="goods_attr_box">
					<span class="goods_color">白色</span>
					<span>
						货号：<span>CG5911</span>
					</span>
				</div>
			</div>
		</div>

		<div class="record_list_box" id="couponNoUseListBox">
			<div class="scroller">
				<ul class="record_list">
					<!-- <li class="record_item" v-for="(item, index) in couponRecord" :key="item.bonus_id">
						<div class="coupon_box">
	                        <img src="../../images/temp_coupon.jpg" alt="优惠券背景图" class="coupon_bg">
	                        <div class="coupon_value_box">
	                            <template v-if="item.discount == '0'">
	                                <span class="coupon_value">{{item.type_money}}</span>
	                                <span class="quantifier">元</span>
	                            </template>
	                            <template v-else>
	                                <span class="coupon_value">{{item.discount}}</span>
	                                <span class="quantifier">折</span>
	                            </template>
	                        </div>
	                    </div>
	                    <div class="intro_box">
	                        <div class="intro" :class="{spread: item.isSpread}">
	                            <p class="intro_text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
	                        </div>
	                        <div class="intro_box_tab" @click="toggleSpread(index)">
	                            <span class="intro_box_tab_text">适用范围</span><i class="arrow_icon" :class="{spread: item.isSpread}"></i>
	                        </div>
	                    </div>
					</li> -->
					<li class="record_item">
						<div class="coupon_box">
	                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt voluptatum fuga amet eum neque, quos perferendis, corporis doloremque iusto sed, totam? Eos, omnis iste ea ab ad quia deleniti esse.
	                    </div>
					</li>
				</ul>
				<div :class="{transparent: !isMore}">
					<div id="pullUp">
						<span class="pullUpIcon"></span><span class="pullUpLabel">上拉加载更多</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import  '../../plugins/iscroll.js';

	export default {
		data() {
			return {
				isMore: true
			}
		},
	}
</script>

<style scoped>

	.store_search_main {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: #fff;
		z-index: 3;
		text-align: center;
	}

	.goods_info_box {
		background: #000;
		color: #fff;
		padding: 0.36rem 0;
	}

	.goods_img_box,
	.goods_detail_info_box {
		display: inline-block;
		vertical-align: middle;
	}

	.goods_img_box {
		width: 1.2rem;
		height: 1.2rem;
		overflow: hidden;
		border-radius: 1000px;
		position: relative;
	}

	.goods_img {
		width: 100%;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.goods_detail_info_box {
		text-align: left;
	}
	
	.goods_name {
	    overflow: hidden;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    margin-bottom: 0.32rem;
	}

	.record_list_box {
		position: relative;
		width: 96%;
		height: 100%;
		margin: 0 auto;
		overflow: hidden;
	}

	.scroller {
        position: absolute;
        z-index: 1;
        width: 100%;
        padding: 0;
    }

	.record_list {
		padding: 0.966184rem 5% 0 5%;
	}

	.record_item {
		margin: 0 auto 30px auto;
	}

	.transparent {
		visibility: hidden;
        display: none;
	}

	#pullUp {
		line-height: 40px;
		text-align: center;
	}

	.pullUpIcon {
		display: inline-block;
		vertical-align: middle;
		width: 0.386473rem;
		height: 0.386473rem;
		background: url('../../images/common/load_more.gif') center no-repeat;
		background-size: 100% auto;
		margin-right: 0.193237rem;
	}

	.pullUpLabel {
		display: inline-block;
		vertical-align: middle;
	}
</style>