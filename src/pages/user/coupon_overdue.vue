<template>
    <div class="record_list_box" id="couponOverdueListBox">
        <div class="scroller">
            <ul class="record_list">
                <li class="record_item" v-for="(item, index) in couponRecord" :key="item.bonus_id">
                    <!-- <img :src="item.bg_image_path" alt="优惠券背景图" class="coupon_bg"> -->
                    <div class="coupon_box">
                        <img src="../../images/temp_coupon_out_of_date.jpg" alt="过期优惠券背景图" class="coupon_bg">
                        <img src="../../images/coupon/overdue_icon.png" alt="过期水印" class="overdue_icon">
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
                pageIndex: 1,
                couponRecord: []
            }
        },

        methods: {
            toggleSpread(index) {
                let tempValue = this.couponRecord[index].isSpread;
                this.couponRecord[index].isSpread = !tempValue;
            }
        },

        mounted() {

            this.$request.get(this.$interface.GET_MEMBERINFO_BONUSLIST, {
                'userId': localStorage.getItem('USER_ID') || 0,
                'type': '4',
                'pageIndex': this.pageIndex++,
                'pageSize': this.$interface.PAGE_SIZE
            }, (response) => {
                let data = response.data;
                pretreatData(data);
                this.couponRecord = data;

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

            function pretreatData(data) {
                data.forEach(function(item) {
                    item.isSpread = false;
                    var tempDiscountArr = item.discount.split('.');
                    if(tempDiscountArr[1] == '00') {
                        item.discount = tempDiscountArr[0];
                    } else {
                        item.discount = (+item.discount).toFixed(1);
                    }

                    var tempTypeMoneyArr = item.type_money.split('.');
                    if(tempTypeMoneyArr[1] == '00') {
                        item.type_money = tempTypeMoneyArr[0];
                    } else if(/[1-9]0/.test(tempTypeMoneyArr[1])) {
                        item.type_money = (+item.type_money).toFixed(1);
                    }
                });
            }

            var pullUpEl,
                pullUpOffset,
                generatedCount = 0,
                tempLoad = 0;

            function pullUpAction () {
                this.$request.get(this.$interface.GET_MEMBERINFO_BONUSLIST, {
                    'userId': localStorage.getItem('USER_ID') || 0,
                    'type': '4',
                    'pageIndex': this.pageIndex++,
                    'pageSize': this.$interface.PAGE_SIZE
                }, (response) => {
                    let data = response.data;
                    pretreatData(data);
                    this.couponRecord.push(...data);

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

                this.myScroll = new iScroll('couponOverdueListBox', {
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
                            pullUpAction.bind(that)();  // Execute custom function (ajax call?)
                        }
                    }
                });

            }
            
            loaded.bind(this)();
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
        margin: 0 auto 30px auto;
    }

    .coupon_box {
        position: relative;
        font-size: 0;
    }

    .coupon_bg {
        width: 100%;
    }

    .overdue_icon {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
    }

    .coupon_value_box {
        position: absolute;
        color: #fff;
        left: 10px;
        bottom: 20px;
    }

    .coupon_value {
        font-size: 50px;
    }

    .quantifier {
        display: inline-block;
        vertical-align: top;
        font-size: 16px;
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

