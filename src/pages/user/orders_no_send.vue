<template>
    <div class="all_orders_main">
        <div class="filter_box">
            <ul class="filter_tab">
                <li class="filter_tab_item" :class="{active: item.isActive}" v-for="(item, index) in filterTab" @click="handleFilter(index)">
                    {{item.text}}
                </li>
            </ul>
        </div>
        <div class="record_list_box" id="recordListBox">
            <div class="scroller">
                <ul class="record_list" v-if="orderRecord.length > 0">
                    <li class="record_item" v-for="item in orderRecord">
                        <router-link :to="{path: '/order_detail', query: {orderId: item.order_id}}">
                            <div class="order_sum_box">
                                <span class="money_tip">¥</span><span class="order_sum">{{item.order_amount}}</span>
                            </div>
                            <div class="order_info_box">
                                <div>
                                    单号:<span class="order_info">{{item.order_sn}}</span>
                                </div>
                                <div>
                                    日期:<span class="order_info">{{item.createTime}}</span>
                                </div>
                                <div>
                                    <span class="order_status">{{item.orderStatus}}</span>
                                </div>
                            </div>
                        </router-link>
                    </li>
                </ul>
                <div v-else class="empty_orders_tip_contain">
                    <div class="empty_orders_tip_box">
                        <p class="empty_orders_tip">暂无待付款</p>
                        <router-link to="/home" class="link" v-if="orderType == 1">去挑选</router-link>
                    </div>
                </div>
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
                myScroll: null,
                isMore: false,
                orderType: 1, // 1：手机订单~ 2：店铺订单
                orderStatus: 2, // 2：待发货
                pageIndex: 1,
                dataInterface: '',
                orderRecord: [],
                filterTab: [
                    {
                        'text': '手机订单',
                        'type': '1',
                        'isActive': true
                    },
                    {
                        'text': '店铺订单',
                        'type': '2',
                        'isActive': false
                    }
                ],
                showLoad: false
            }
        },

        methods: {
            handleFilter(index) {
                this.pageIndex = 1;
                let currentItem = this.filterTab[index];
                if(currentItem.isActive) {
                    return;
                }
                this.filterTab.forEach(function(item) {
                    item.isActive = false;
                });
                currentItem.isActive = true;
                this.orderType = currentItem.type;

                this.dataInterface = this.orderType == 1 ? this.$interface.GET_APP_VARIOUSTYPE_ORDER_LIST : this.$interface.GET_MWIN_ORDER_LIST;

                this.$store.commit('SHOW_LOAD');

                this.$request.get(this.dataInterface, {
                    'header': {
                        'platform_src': 'WAP',
                        'cookie_id': this.$store.state.cookieId,
                        'systype': 'wap'
                    },
                    'userId': this.$store.state.userId,
                    'orderStatus': this.orderStatus,
                    'pageSize': this.$interface.PAGE_SIZE,
                    'pageIndex': this.pageIndex++
                }, (response) => {

                    this.$store.commit('HIDE_LOAD');

                    let data = response.data;

                    this.orderRecord = data;

                    if(data.length == this.$interface.PAGE_SIZE) {
                        this.isMore = true;
                    }

                    setTimeout(() => {
                        this.myScroll.refresh();
                    }, 320);
                });
            }
        },

        mounted() {

            this.dataInterface = this.orderType == 1 ? this.$interface.GET_APP_VARIOUSTYPE_ORDER_LIST : this.$interface.GET_MWIN_ORDER_LIST;

            this.$request.get(this.dataInterface, {
                'header': {
                    'platform_src': 'WAP',
                    'cookie_id': this.$store.state.cookieId,
                    'systype': 'wap'
                },
                'userId': this.$store.state.userId,
                'orderStatus': this.orderStatus,
                'pageSize': this.$interface.PAGE_SIZE,
                'pageIndex': this.pageIndex++
            }, (response) => {
                let data = response.data;

                this.orderRecord = data; // 积分记录数组

                if(data.length == this.$interface.PAGE_SIZE) {
                    // 因为接口返回的记录数据不是每个都有总数这一条~所以此处认为只要第一页数据的条数等于请求是声明的一页条数~就认为需要分页
                    this.isMore = true;
                }

                setTimeout(() => {
                    this.myScroll.refresh();
                }, 320);
            });

            var pullUpEl, pullUpOffset,
                generatedCount = 0;
            var tempLoad = 0;

            function pullUpAction () {

                this.$request.get(this.dataInterface, {
                    'header': {
                        'platform_src': 'WAP',
                        'cookie_id': this.$store.state.cookieId,
                        'systype': 'wap'
                    },
                    'userId': this.$store.state.userId,
                    'orderStatus': this.orderStatus,
                    'pageSize': this.$interface.PAGE_SIZE,
                    'pageIndex': this.pageIndex++
                }, (response) => {
                    let data = response.data;

                    this.orderRecord.push(...data);

                    if(data.length == this.$interface.PAGE_SIZE) {
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
                            pullUpAction.bind(that)();
                        }
                    }
                });

            }
            
            loaded.bind(this)();
        }
    }
</script>

<style scoped>
    .all_orders_main {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        z-index: 2;
        height: 100%;
        overflow: visible;
        background: #fff;
        box-sizing: border-box;
    }

    .filter_box {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
    }

    .filter_tab {
        display: flex;
        line-height: 1.4rem;
        text-align: center;
        border-bottom: 1px solid #e6e6e6;
    }

    .filter_tab_item {
        flex: 1;
        text-align: center;
        position: relative;
        background: #f4f4f4;
        color: #626262;
    }

    .filter_tab_item + .filter_tab_item {
        border-left: 1px solid #efefef;
    }

    .filter_tab_item.active {
        background: #fff;
        color: #333;
    }

    .record_list_box {
        position: absolute;
        width: 100%;
        top: 1.4rem;
        bottom: 0;
        left: 0;
        overflow: hidden;
    }

    .scroller {
        position: absolute;
        z-index: 1;
        width: 100%;
        padding: 0;
        min-height: 100%;
    }

    .record_list {
        padding: 0.676329rem 2% 0 2%;
    }

    .record_item {
        position: relative;
        padding: 6px 0;
        line-height: 24px;
        border: 1px solid #959595;
        border-radius: 4px;
        position: relative;
        margin-bottom: 0.483092rem;
    }

    .order_sum_box, .order_info_box {
        display: inline-block;
        vertical-align: middle;
    }

    .order_sum_box {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 28%;
        text-align: center;
        border-right: 1px solid #959595;
        height: 100%;
        font-weight: bolder;
    }

    .order_sum_box:after {
        content: '';
        display: inline-block;
        vertical-align: middle;
        width: 0;
        height: 100%;
    }

    .money_tip {
        display: inline-block;
        vertical-align: text-top;
        font-size: 9px;
        line-height: 12px;
    }

    .order_sum {
        display: inline-block;
        vertical-align: middle;
        font-size: 16px;
    }

    .order_info_box {
        margin-left: 28%;
        padding-left: 5%;
    }

    .order_info {
        margin-left: 10px;
    }

    .order_status {
        color: #ef8200;
    }

    .transparent {
        visibility: hidden;
        display: none;
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

    .empty_orders_tip_contain {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .empty_orders_tip_box {
        position: absolute;
        top: 36%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: url('../../images/orders_common/orders_no_pay_empty.png') center  15% no-repeat;
        background-size: 60px auto;
        padding-top: 70px;
        color: #939393;
        text-align: center;
    }

    .link {
        position: absolute;
        left: 50%;
        top: 100%;
        transform: translateX(-50%);
        white-space: nowrap;
        text-align: center;
        background: #ef8200;
        color: #fff;
        padding: 0.338164rem 1.111111rem;
        margin-top: 0.483rem;
    }
</style>
