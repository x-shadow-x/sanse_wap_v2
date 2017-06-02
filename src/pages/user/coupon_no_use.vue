<template>
	<div class="record_list_box" id="recordListBox">
		<div class="scroller">
			<ul class="record_list">
				<li class="record_item" v-for="item in couponRecord">
					<img :src="item.bg_image_path" alt="优惠券背景图" class="coupon_bg">
					<div class="coupon_value">
						<template v-if="item.discount == '0.00'">
							<span class="coupon_value">{{item.type_money}}</span>
							<span class="quantifier">元</span>
						</template>
						<template v-else>
							<span class="coupon_value">{{item.discount}}</span>
							<span class="quantifier">折</span>
						</template>
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
</template>

<script>

	import  '../../plugins/iscroll.js';

	export default {

		data() {
			return {
				myScroll: null,
				isMore: false,
				couponRecord: []
			}
		},

		methods: {
		},

		mounted() {

			this.$request.get('/Get_MemberInfo_BonusList/', {
				'userId': '304014',
				'type': '1',
				'pageIndex': '1',
				'pageSize': '10'
			}, (response) => {
				let data = response.data;

				this.couponRecord = data; // 积分记录数组

				if(data.length == 10) { 
					// 因为接口返回的记录数据不是每个都有总数这一条~所以此处认为只要第一页数据的条数等于请求是声明的一页条数~就认为需要分页
					this.isMore = true;
				}
			})

			var pullUpEl,
				pullUpOffset,
				generatedCount = 0,
				tempLoad = 0;

			function pullUpAction () {

			}

			function loaded() {
				pullUpEl = document.getElementById('pullUp');	
				pullUpOffset = pullUpEl.offsetHeight;
				var that = this;
				
				this.myScroll = new iScroll('recordListBox', {
					useTransition: true,
					vScrollbar: false,
					onRefresh: function () {
						if (pullUpEl.className.match('loading')) {
							pullUpEl.className = '';
							pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多';
						}
					},
					onScrollMove: function () {
						if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
							pullUpEl.className = 'flip';
							pullUpEl.querySelector('.pullUpLabel').innerHTML = '释放加载';
							this.maxScrollY = this.maxScrollY;
						} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
							pullUpEl.className = '';
							pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多';
							this.maxScrollY = pullUpOffset;
						}
					},
					onScrollEnd: function () {
						if (pullUpEl.className.match('flip')) {
							pullUpEl.className = 'loading';
							pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载...';				
							pullUpAction.bind(that)();	// Execute custom function (ajax call?)
						}
					}
				});
				
				setTimeout(function () { document.getElementById('recordListBox').style.left = '0'; }, 800);
			}

			document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
			setTimeout(() => {
				loaded.bind(this)();
			}, 900);
        }
	}
</script>

<style scoped>

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
		position: relative;
		font-size: 0;
		padding: 0.386473rem 0;
		line-height: 16px;
	}

	.coupon_bg {
		width: 100%;
	}

	.transparent {
		visibility: hidden;
	}

	#pullUp {
		line-height:40px;
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