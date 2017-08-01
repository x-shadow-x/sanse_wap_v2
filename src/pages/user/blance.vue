<template>
	<div class="blance_main">
		<div class="main_content" @scroll="handleScroll($event)" @touchstart="retract">
			<div class="info_box" id="infoBox">
				<div class="point_value" :style="{marginBottom: marginBottom + '%'}">
					<span class="integer" :style="{fontSize: fontSize + 'px'}">{{balanceInteger}}.</span>{{balanceDecimals}}元
				</div>
			</div>
			<div class="record_list_box" id="recordListBox" @touchstart.stop="spread">
				<div class="scroller">
					<div class="record_title_box">余额记录</div>
					<ul class="record_list">
						<li class="record_item" v-for="item in blanceRecord">
							<span class="date">{{item._custom_change_time}}</span>
							<div class="amount_box" :class="{cut_down: item._custom_amount_change < 0}">
								<span class="amount">{{item._custom_amount_change}}</span>
							</div>
							<div class="remark_box">
								<p class="remark">{{item._reason}}</p>
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
	</div>
</template>

<script>

	import  '../../plugins/iscroll.js';

	const FONTSIZE = 90; // 红包整数部分数值原始字体大小
	const MARGINBOTTOM = 10; // 红包数据值所在盒子的原始底部外边距

	export default {

		data() {
			return {
				myScroll: null,
				// 交互方式为若记录盒子未展开~则用户拖动外部盒子可以逐步展开~若记录盒子因为touchstart而自动展开~则在touchstart外部盒子时收起
				isSpread: false,
				isMore: false,
				balance: '0.00',
				blanceRecord: [],
				fontSize: FONTSIZE,
				marginBottom: MARGINBOTTOM, //红包数值所在盒子的底部外边距范围为(-20%~10%)
				MAXSCROLLDISTANCE: 0, // 页面主题部分所能滚动的最大距离
				TOPTHRESHOLD: 0, // 红包列表所能到达的距离顶部最小的距离
				originalOffsetTop: 0, // 页面加载后红包列表距离顶部的原始距离
				opacity: 1 // 使用红包按钮的透明度~范围为(0~1)
			}
		},

		computed: {

			balanceInteger() {
				return Math.floor(this.balance)
			},
			balanceDecimals() {
				return this.balance.split('.')[1];
			}
		},

		methods: {
			handleScroll(even) {
				var curentFontSize = FONTSIZE - even.target.scrollTop;
				this.opacity = ($('#recordListBox').offset().top - this.TOPTHRESHOLD) / this.MAXSCROLLDISTANCE;
				this.marginBottom = 2 * MARGINBOTTOM * (($('#recordListBox').offset().top - this.TOPTHRESHOLD) / this.MAXSCROLLDISTANCE) - MARGINBOTTOM;
				this.fontSize = curentFontSize > 40 ? curentFontSize : 40;
			},

			/**
			 * 当记录过多需要下拉加载时~iscroll盒子与外部盒子都面临滑动的情况
			 * 为方便处理~此处处理成触摸到记录盒子时就滑动到页面底部~之后用户需要滑动就只有记录盒子
			 * @return {[type]} [description]
			 */
			spread() {
				this.isSpread = true;
				$('.main_content').animate({scrollTop: $('#footerMenuList').offset().top}, 1000);
			},

			retract() {
				if(this.isSpread) {
					$('.main_content').animate({scrollTop: 0}, 500);
					this.isSpread = false;
				}

			}
		},

		mounted() {

			if(!this.$helper.isLogin()) {
                this.$router.push({path: this.$store.state.loginRouter, query:{original: window.location.href}});
            }

            if(this.$store.state.userInfo.account_balance) {
            	this.balance = this.$store.state.userInfo.account_balance;
            } else {
            	this.$request.get(this.$interface.GET_USERINFO_PUSH, {
	                'userId': localStorage.getItem('USER_ID') || 0,
	                'jpushId': this.$store.state.jpushId,
	                'channelId': this.$store.state.channelId,
	                'appId': this.$store.state.appId,
	                
	            }, (res) => {
	                let data = res.data;
	                this.balance = data.account_balance;
	                this.$store.commit('SET_USER_INFO', data);
	            })
            }

			function handleDate(data) {
				data.forEach(function(item) {
					let tempCustomChangeTime = item._custom_change_time.split(' ');
					item._custom_change_time = tempCustomChangeTime[0].substr(6) + ' ' + tempCustomChangeTime[1].substring(0, tempCustomChangeTime[1].length - 2);
				})
			}

			this.$request.get(this.$interface.GET_USER_ACCOUNT_LIST, {
				'userId': localStorage.getItem('USER_ID') || 0,
				'pageIndex': '1',
				'pageSize': this.$interface.PAGE_SIZE
			}, (response) => {
				let data = response.data;

				handleDate(data);
				this.blanceRecord = data; // 积分记录数组

				if(data.length == this.$interface.PAGE_SIZE) {
					// 因为接口返回的记录数据不是每个都有总数这一条~所以此处认为只要第一页数据的条数等于请求是声明的一页条数~就认为需要分页
					this.isMore = true;
				}
			})


			// 此处缺陷是计算MAXSCROLLDISTANCE 和 TOPTHRESHOLD时跟具体下面css代码有关~具体看.record_list_box的height设置成多少~
			// 这里因为height为80%~所以此处阈值为0.2
			this.MAXSCROLLDISTANCE = $('#recordListBox').offset().top - $(window).height() * 0.2;
			this.TOPTHRESHOLD = $(window).height() * 0.2;
			this.originalOffsetTop = $('#recordListBox').offset().top;


			var pullUpEl, pullUpOffset,
				generatedCount = 0;
			var tempLoad = 0;

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
			
			setTimeout(() => {
				loaded.bind(this)();
			}, 900);
        }
	}
</script>

<style scoped>
	.blance_main {
		position: absolute;
		z-index: 2;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		overflow: hidden;
		background: url('../../images/blance/my_blance_bg.jpg') center top repeat-y;
		background-size: 100% auto;
	}

	.main_content {
		height: 100%;
		overflow: auto;
	}

	.info_box {
		text-align: center;
		margin-top: 32%;
	}

	.point_value {
		color: #e47372;
		font-size: 24px;
		margin-bottom: 10%;
	}

	.integer {
		font-size: 90px;
		line-height: 90px;
		transition: font-size .1s;
	}

	.point_btn {
		display: inline-block;
		background: #ef8200;
		color: #fff;
		line-height: 1.2rem;
		border-radius: 1.4rem;
		width: 51%;
	}

	.record_list_box {
		position: relative;
		width: 90%;
		margin: 10% auto 0 auto;
		background: url('../../images/user_index/record_list_line.png') 28% top repeat-y #fff;
		background-size: 1px auto;
		height: 80%;
		overflow: hidden;
	}

	.scroller {
        position: absolute;
        z-index: 1;
        width: 100%;
        padding: 0;
    }

	.record_title_box {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		line-height: 0.966184rem;
		border-bottom: 1px solid #e4e4e3;
		padding: 0 5%;
		box-sizing: border-box;
		background: #fff;
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

	.date {
		color: #7f7f7f;
		display: inline-block;
		vertical-align: middle;
		width: 25.55%;
		text-align: left;
		font-size: 11px;
	}

	.amount_box {
		display: inline-block;
		vertical-align: middle;
		position: relative;
		font-size: 11px;
		padding-left: 10px;
	}

	.amount_box:before,
	.amount_box:after {
		content: '';
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}

	.amount_box:before {
		left: -3px;
		width: 6px;
		height: 6px;
		border-radius: 5px;
		background: #f7c592;
	}

	.amount_box:after {
		left: 5px;
		height: 20px;
		width: 10px;
		background: url('../../images/user_index/amount_arrow.png') center no-repeat;
		background-size: auto 19px;
	}

	.amount {
		display: inline-block;
		vertical-align: middle;
		background: #e47372;
		color: #fff;
		line-height: 24px;
		border-radius: 24px;
		min-width: 1.207729rem;
		text-align: center;
		padding: 0 10px;
	}

	.amount_box.cut_down .amount {
		background: #b1b1b1;
	}

	.amount_box.cut_down:after {
		background-image: url('../../images/user_index/amount_cut_down_arrow.png')
	}

	.remark_box {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		font-size: 11px;
		text-align: right;
		max-width: 45%;
	}

	.remark {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.display_expire_date {
		color: #7f7f7f;
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
