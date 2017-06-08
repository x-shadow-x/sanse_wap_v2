<template>
    <div class="my_collection_main">
        <div class="record_list_box" id="recordListBox">
            <div class="scroller">
                <ul class="record_list" v-if="collectionRecord.length > 0">
                    <li class="record_item" v-for="item in collectionRecord">
                        <router-link :to="'/order_detail/' + item.order_id">
                            
                        </router-link>
                    </li>
                </ul>
                <div v-else class="empty_collection_tip_contain">
                    <div class="empty_collection_tip_box">
                        <p class="empty_collection_tip">暂无收藏商品</p>
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
                orderStatus: 1, // 1：待付款
                goodsId: 0,
                colorId: 0,
                dataInterface: '',
                collectionRecord: [],
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

                this.$store.commit('SHOW_LOAD');

                // 此处分页不是靠pageIndex~而是提供当前页中最后一条数据的goodsId和colorId然后后台这两个参数返回下一页的数据
                // favType字段目前固定写2~cookieId此处先给定一个值~之后对接时与userId一样由php接口返回并做全局配置
                this.$request.get(this.$interface.GET_FAVOURITE_GOODS_LIST, {
                    'userId': '304014',
                    'cookieId': '23456006805d970d5438a354dc019fc295614979',
                    'favType': 2,
                    'pageSize': this.$interface.PAGE_SIZE,
                    'goodsId': this.goodsId,
                    'colorId': this.colorId
                }, (response) => {

                    this.$store.commit('HIDE_LOAD');

                    let data = response.data;

                    this.collectionRecord = data;

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

            this.$request.get(this.$interface.GET_FAVOURITE_GOODS_LIST, {
                'userId': '304014',
                'cookieId': '23456006805d970d5438a354dc019fc295614979',
                'favType': 2,
                'pageSize': this.$interface.PAGE_SIZE,
                'goodsId': this.goodsId,
                'colorId': this.colorId
            }, (response) => {
                let data = response.data;

                this.collectionRecord = data; // 积分记录数组

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

                this.$request.get(this.$interface.GET_FAVOURITE_GOODS_LIST, {
                    'userId': '304014',
                    'cookieId': '23456006805d970d5438a354dc019fc295614979',
                    'favType': 2,
                    'pageSize': this.$interface.PAGE_SIZE,
                    'goodsId': this.goodsId,
                    'colorId': this.colorId
                }, (response) => {
                    let data = response.data;

                    this.collectionRecord.push(...data);

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

            document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
            loaded.bind(this)();
        }
    }
</script>

<style scoped>
    .my_collection_main {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        z-index: 2;
        height: 100%;
        overflow: visible;
        background: #fff;
        box-sizing: border-box;
        padding-top: 2rem;
        padding-top: 0.29rem;
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
        padding: 0.483092rem 2% 0 2%;
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

    .empty_collection_tip_contain {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .empty_collection_tip_box {
        position: absolute;
        top: 36%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: url('../../images/my_collection/collection_empty_icon.png') center 15% no-repeat;
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
