<template>
    <div class="my_collection_main">
        <div class="record_list_box" id="recordListBox">
            <div class="scroller">
                <ul class="record_list" v-if="collectionRecord.length > 0">
                    <li class="record_item" v-for="(item, index) in collectionRecord">
                        <router-link :to="'/home?args=' + item.order_id">
                            <div class="goods_img_box">
                                <img :src="item.goods_img" :alt="item.goods_name" class="goods_img">
                            </div>
                            <div class="goods_info_box">
                                <span class="goods_name">{{item.goods_name}}</span>
                                <span class="goods_sn">{{item.alias_goods_sn}}</span>
                                <div class="price_box">
                                    <span class="money_tip">￥</span>
                                    <span class="price">{{item.price}}</span>
                                </div>
                                <span class="collection_time">收藏时间 {{item.add_fav_time.split(' ')[0]}}</span>
                            </div>
                        </router-link>
                        <span class="cancel_collection" @click.stop="deleteCollection(index)">取消收藏</span>
                    </li>
                </ul>
                <div v-else class="empty_collection_tip_contain">
                    <div class="empty_collection_tip_box">
                        <p class="empty_collection_tip">暂无收藏商品</p>
                        <router-link to="/brand" class="link">去挑选</router-link>
                    </div>
                </div>
                <div :class="{transparent: !isMore}">
                    <div id="pullUp">
                        <span class="pullUpIcon"></span><span class="pullUpLabel">上拉加载更多</span>
                    </div>
                </div>
            </div>
        </div>
        <confirm
        :isShowConfirm="isShowConfirm"
        :tipTitleF="tipTitleF"
        :tipContentF="tipContentF"
        @confirmEvent="confirmEvent"
        @cancelEvent="cancelEvent"></confirm>
    </div>
</template>


<script>

    import  '../../plugins/iscroll.js';
    import confirm from '../../components/common/confirm.vue';

    export default {
        data() {
            return {
                myScroll: null,
                isMore: false,
                goodsId: 0,
                colorId: 0,
                collectionRecord: [],
                showLoad: false,
                isShowConfirm: false,
                tipTitleF: '',
                tipContentF: '',
                confirmCbParams: {}
            }
        },

        methods: {
            deleteCollection(index) {
                this.tipTitleF = '确认要删除吗？';
                this.isShowConfirm = true;
                this.confirmCbName = 'removeCollection';
                this.confirmCbParams.index = index;
            },

            confirmEvent() {
                this.isShowConfirm = false;
                this[this.confirmCbName](this.confirmCbParams.index);
            },

            cancelEvent() {
                this.isShowConfirm = false;
            },

            removeCollection(index) {

                this.$store.commit('SHOW_LOAD');

                let selectedCollectionRecord = this.collectionRecord[index];

                this.$request.get(this.$interface.DELETE_FAVOURITE_GOODS, {
                    'userId': '304014',
                    'goodsId': selectedCollectionRecord.goods_id,
                    'cookieId': '23456006805d970d5438a354dc019fc295614979',
                    'colorId': selectedCollectionRecord.color_id
                }, (response) => {
                    this.collectionRecord.splice(index, 1);
                    this.$store.commit('HIDE_LOAD');
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

                if(data.length == 0) {
                    return;
                }

                this.collectionRecord = data; // 积分记录数组

                if(data.length == this.$interface.PAGE_SIZE) {
                    // 因为接口返回的记录数据不是每个都有总数这一条~所以此处认为只要第一页数据的条数等于请求是声明的一页条数~就认为需要分页
                    this.isMore = true;
                }

                let lastRecord = data[data.length - 1];

                this.goodsId = lastRecord.goods_id;
                this.color_id = lastRecord.color_id;

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

            loaded.bind(this)();
        },

        components: {
            confirm
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
    }

    .record_list_box {
        position: absolute;
        width: 100%;
        top: 0;
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

    .record_item {
        position: relative;
        padding: 0.29rem 0.242rem;
        line-height: 1;
        border-bottom: 1px solid #d8d8d8;
    }

    .goods_img_box {
        display: inline-block;
        vertical-align: middle;
        position: relative;
        width: 36.1%;
        padding-top: 36.1%;
    }

    .goods_img {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 100%;
        transform: translate(-50%, -50%);
    }

    .goods_info_box {
        position: absolute;
        left: 36.1%;
        top: 0.338rem;
        bottom: 0.29rem;
        font-size: 12px;
        width: 58.3%;
        box-sizing: border-box;
        padding: 20px 0 24px 12px;
    }

    .goods_name {
        position: absolute;
        top: 0;
        left: 12px;
        font-weight: bold;
        font-size: 14px;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .alias_goods_sn {
        color: #888;
    }

    .price_box {
        position: relative;
        font-weight: bolder;
        font-size: 0;
        padding: 0.242rem 0 0.386rem 0;
        margin-bottom: 0.386rem;
    }

    .price_box:after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 20px;
        height: 3px;
        background: #000;
    }

    .money_tip {
        display: inline-block;
        vertical-align: text-top;
        font-size: 9px;
    }

    .price {
        display: inline-block;
        vertical-align: text-top;
        font-size: 14px;
    }

    .collection_time {
        color: #888;
    }

    .cancel_collection {
        position: absolute;
        bottom: 0.289855rem;
        right: 4%;
        color: #888;
        background: url('../../images/my_collection/del_collection.png') left center no-repeat;
        background-size: 14px auto;
        padding-left: 16px;
        line-height: 14px;
    }
</style>
