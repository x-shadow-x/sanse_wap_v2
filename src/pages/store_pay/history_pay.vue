<template>
	<div class="history_pay_main" id="recordListBox">
		<div class="scroller">
			<ul class="record_list" @click="handleSelect($event)">
				<li class="record_item" v-for="(item, index) in recordList" :key="item.payment_id">
					<div class="click_hover" :data-index="index"></div>
					<div class="item_info">
                    	<h2 class="store_name">{{item.store_name}}</h2>
                    	<p class="pay_status" :class="{strong: item.payment_status == 0}">{{item.payment_status_name}}</p>
                    	<p class="create_time">{{item.create_time}}</p>
                    </div>
                    <span class="pay_amount">¥{{item.need_to_pay_amount}}</span>
				</li>
			</ul>
			<div :class="{transparent: !isMore}">
				<div id="pullUp">
					<span class="pullUpIcon"></span><span class="pullUpLabel">上拉加载更多</span>
				</div>
			</div>
		</div>
		<transition name="slide-right">
            <router-view :selectRecord="selectRecord"></router-view>
        </transition>
	</div>
</template>

<script>
	import  '../../plugins/iscroll.js';

	export default {
		data() {
			return {
				myScroll: null,
				isMore: false,
				pageIndex: 1,
				recordList: [],
				currentIndex: 0
			}
		},

		computed: {
			selectRecord: function() {
				return this.recordList[this.currentIndex];
			}
		},

		methods: {
			/**
			 * 还是要自己实现事件代理~坑爹
			 */
			handleSelect(e) {
				let target = $(e.target);
				if(target.hasClass('click_hover')) {
					this.currentIndex = target.attr('data-index');

					if(this.selectRecord.payment_status_name == '待支付') {
						this.$router.push('/history_pay/checkstand_pay_info');
					} else {
						this.$router.push('/history_pay/store_pay_result');
					}
					
				}
			}
		},

		mounted() {
			
			this.$request.get(this.$interface.GET_OFFLINE_ORDERINFORECORD_LIST, {
	                'userId': localStorage.getItem('USER_ID') || 0,
	                'pageIndex': this.pageIndex++,
	                'pageSize': this.$interface.PAGE_SIZE
	            }, (response) => {
	                let data = response.data;
	                this.recordList = data;
	                if(data.length == this.$interface.PAGE_SIZE) {
						// 因为接口返回的记录数据不是每个都有总数这一条~所以此处认为只要第一页数据的条数等于请求时声明的一页的条数~就认为需要分页
						this.isMore = true;
					} else {
	                    this.isMore = false;
	                }

	                setTimeout(() => {
	                    this.myScroll.refresh();
	                }, 320);
            });


            var pullUpEl,
				pullUpOffset,
				generatedCount = 0,
				tempLoad = 0;

			function pullUpAction () {
                this.$request.get(this.$interface.GET_OFFLINE_ORDERINFORECORD_LIST, {
                    'userId': localStorage.getItem('USER_ID') || 0,
                    'pageIndex': this.pageIndex++,
	                'pageSize': this.$interface.PAGE_SIZE
                }, (response) => {
                    let data = response.data;
                    this.recordList.push(...data);

                    if(data.length == this.$interface.PAGE_SIZE) {
                        // 因为接口返回的记录数据不是每个都有总数这一条~所以此处认为只要第一页数据的条数等于请求是声明的一页条数~就认为需要分页
                        this.isMore = true;
                    } else {
                        this.isMore = false;
                    }

                    setTimeout(() => {
                        this.myScroll.refresh();
                    }, 320);
                })
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
			}

            loaded.bind(this)();
		}
	}
</script>

<style scoped>
	.history_pay_main {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: 0 auto;
		overflow: hidden;
		z-index: 12;
		background: #fff;
	}

	.scroller {
        position: absolute;
        z-index: 1;
        width: 100%;
        padding: 0;
    }

	.record_item {
		padding: 2% 4%;
		position: relative;
		line-height: 1.4;
		border-bottom: 1px solid #efefef;
	}

	.item_info {
		display: inline-block;
		vertical-align: top;
	}

	.store_name {
		font-size: 14px;
		margin-bottom: 8px;
	}

	.pay_status,
	.create_time {
		color: #7f7f7f;
	}

	.pay_status.strong {
		color: red;
	}

	.pay_amount {
		position: absolute;
		right: 4%;
		font-family: 'sansefont_bold';
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

	.slide-right-enter-active {
        transition: all .32s;
    }

    .slide-right-leave-active {
        transition: all .32s;
    }

    .slide-right-enter, .slide-right-leave-to {
        transform: translateX(100%);
    }

    .click_hover {
    	position: absolute;
    	left: 0;
    	right: 0;
    	top: 0;
    	bottom: 0;
    	z-index: 2;
    }
</style>