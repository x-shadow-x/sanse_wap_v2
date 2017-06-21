<template>
    <div class="shopping_bag_main">
        <div class="batch_processing_box" v-if="shoppingbagRecord.length > 0">
            <div class="select_all_box">
                <span class="select_btn" :class="{active: selectAll}" @click="handleSelectedAll"></span>
                <span>全选</span>
            </div>
            <div class="edit_all_box" @click="toggleEditAll">
                <span class="edit_all_btn" v-if="!isEditAllStatus">编辑全部</span>
                <span class="complete_edit_all_btn" v-else>完成</span>
            </div>
        </div>
        <div class="record_list_box" id="recordListBox">
            <div class="scroller">
                <ul class="record_list" v-if="shoppingbagRecord.length > 0">
                    <li class="record_item" :class="{edit_status: item.isEdit}" v-for="(item, index) in shoppingbagRecord" :key="item.goods_id">
                        <div class="select_box">
                            <span class="select_btn" :class="{active: item.selected}" @click="handleSelectedItem(index)"></span>
                        </div>
                        <router-link to="'/home" class="goods_link">
                            <div class="goods_img_box">
                                <img :src="item.goods_img" :alt="item.goods_name" class="goods_img">
                            </div>
                        </router-link>
                        <div class="info_area">
                            <div class="info_swiper" :class="{edit_status: item.isEdit}">
                                <div class="goods_info">
                                    <h2 class="goods_name">{{item.goods_name}}</h2>
                                        <div class="goods_color">颜色: {{item.goods_color}}</div>
                                        <div class="goods_size">尺码: {{item.goods_size}}</div>
                                        <div class="price_box">
                                            <div class="old_price_box">
                                                <span class="money_tip">¥</span><span class="price">{{item.market_price}}</span>
                                            </div>
                                            <div class="current_price_box">
                                                <span class="money_tip">¥</span><span class="price">{{item.price}}</span>
                                            </div>
                                        </div>
                                        <span class="goods_num">数量: {{item.number}}</span>
                                        <span class="edit_btn" @click="item.isEdit = true;">编辑</span>
                                </div>
                                <div class="edit_box">
                                    <span class="remove_goods_btn" @click.stop="deleteGoods(index)"></span>
                                    <div class="goods_color">颜色: {{item.goods_color}}</div>
                                    <div class="goods_size">尺码: {{item.goods_size}}</div>
                                    <div class="edit_num_box">
                                        <span class="subtract num_edit_btn" :class="{disable: item.number <= 1}" @click="subtractGoods(index)"></span>
                                        <span class="goods_num_result">{{item.number}}</span>
                                        <span class="add num_edit_btn" :class="{disable: item.product_number <= 0}" @click="addGoods(index)"></span>
                                    </div>
                                    <div class="product_number">库存: {{item.product_number}}</div>
                                    <span class="complete_btn" @click="item.isEdit = false;" v-if="!isEditAllStatus">完成</span>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div v-else class="empty_tip_contain">
                    <div class="empty_tip_box">
                        <p>购物袋暂无商品</p>
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
        <div class="bottom_handle_box" v-if="shoppingbagRecord.length > 0">
            <div class="balance_box" v-if="!isEditAllStatus">
                <div class="subtotal_box">
                    <span>小计：</span><span class="money_tip">¥</span><span class="price">{{totalPrice}}</span>
                </div>
                <router-link to="settle_accounts" class="balance_btn_box">
                    结算<span>({{totalNum}})</span>
                </router-link>
            </div>
            <div class="remove_all_goods_box" v-else>
                <div class="batch_remove_goods_btn" @click="batchDeleteGoods">删除</div>
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
                shoppingbagRecord: [],
                showLoad: false,
                isShowConfirm: false,
                isEditAllStatus: false,
                selectAll: true,
                totalPrice: 0,
                totalNum: 0,
                tipTitleF: '',
                tipContentF: '',
                confirmCbParams: {}
            }
        },

        methods: {
            handleData(data) {
                data.forEach(function(item) {
                    var tempArr = item.goods_attr.split(' \r\n');
                    item.goods_color = tempArr[0].split(':')[1];
                    item.goods_size = tempArr[1].split(':')[1];
                    item.selected = true;
                    item.isEdit = false;
                });
            },

            culateTotal(data) {
                this.totalPrice = 0;
                this.totalNum = 0;
                data.forEach((item) => {
                    this.totalPrice = this.totalPrice + item.price * item.number;
                    this.totalNum = +item.number + this.totalNum;
                });

                this.totalPrice = this.totalPrice.toFixed(2);
            },

            handleSelectedAll() {
                this.selectAll = !this.selectAll;
                if(this.selectAll) {
                    this.shoppingbagRecord.forEach(function(item) {
                        item.selected = true;
                    });
                } else {
                    this.shoppingbagRecord.forEach(function(item) {
                        item.selected = false;
                    });
                }
            },

            toggleEditAll() {
                this.isEditAllStatus = !this.isEditAllStatus;
                if(this.isEditAllStatus) {
                    this.shoppingbagRecord.forEach((item) => {
                        item.isEdit = true;
                    });
                } else {
                    this.shoppingbagRecord.forEach((item) => {
                        item.isEdit = false;
                    });
                }
            },

            handleSelectedItem(index) {
                let currentItem = this.shoppingbagRecord[index];
                currentItem.selected = !currentItem.selected;
                this.checkIsAllSelected();
            },

            checkIsAllSelected() {
                this.selectAll = this.shoppingbagRecord.every(function(item) {
                    return item.selected;
                })
            },

            deleteGoods(index) {
                this.tipTitleF = '确认要删除吗？';
                this.isShowConfirm = true;
                this.confirmCbName = 'removeGoods';
                this.confirmCbParams.index = index;
            },

            batchDeleteGoods() {
                this.tipTitleF = '确认要删除吗？';
                this.isShowConfirm = true;
                this.confirmCbName = 'batchRemoveGoods';
            },

            confirmEvent() {
                this.isShowConfirm = false;
                this[this.confirmCbName](this.confirmCbParams.index);
            },

            cancelEvent() {
                this.isShowConfirm = false;
            },

            removeGoods(index) {

                this.$store.commit('SHOW_LOAD');

                let selectedCollectionRecord = this.shoppingbagRecord[index];

                this.$request.get(this.$interface.DEL_BUY_GOODS, {
                    'recId': selectedCollectionRecord.rec_id
                }, (response) => {
                    this.shoppingbagRecord.splice(index, 1);
                    this.culateTotal(this.shoppingbagRecord);
                    this.$store.commit('HIDE_LOAD');
                });
            },

            batchRemoveGoods() {
                let postStr = '';
                let tempArr = [];
                this.$store.commit('SHOW_LOAD');

                this.shoppingbagRecord.forEach((item) => {
                    tempArr.push(JSON.stringify({'RecID': item.rec_id, 'Number': item.number, 'IsDel': 1}));
                });

                postStr = '[' + tempArr.join(',') + ']';

                this.$request.get(this.$interface.BATCH_OPTIMIZE_BUY_CAR, {
                    'postStr': postStr
                }, (response) => {
                    this.shoppingbagRecord = [];
                    this.$store.commit('HIDE_LOAD');
                });
            },

            subtractGoods(index) {
                let currentItem = this.shoppingbagRecord[index];
                if(currentItem.number > 1) {
                    // 未到最小值~可以减少
                    currentItem.number = +currentItem.number - 1;
                    currentItem.product_number = +currentItem.product_number + 1;
                }

                this.culateTotal(this.shoppingbagRecord);
            },

            addGoods(index) {
                let currentItem = this.shoppingbagRecord[index];
                if(currentItem.product_number > 0 ) {
                    // 未超过库存量~可以继续添加
                    currentItem.number = +currentItem.number + 1;
                    currentItem.product_number = +currentItem.product_number - 1;
                }

                this.culateTotal(this.shoppingbagRecord);
            }
        },

        mounted() {

            this.$request.get(this.$interface.GET_BUY_CAR_GOOD_LIST, {
                'userId': '304014',
                'cookieId': '23456006805d970d5438a354dc019fc295614979'
            }, (response) => {
                let data = response.data;

                if(data.length == 0) {
                    return;
                }

                this.handleData(data);

                this.shoppingbagRecord = data;

                this.culateTotal(data);

                if(data.length == this.$interface.PAGE_SIZE) {
                    // 因为接口返回的记录数据不是每个都有总数这一条~所以此处认为只要第一页数据的条数等于请求是声明的一页条数~就认为需要分页
                    this.isMore = true;
                }

                let lastRecord = data[data.length - 1];

                this.goodsId = lastRecord.goods_id;
                this.color_id = lastRecord.color_id;

                setTimeout(() => {
                    loaded.bind(this)();
                    this.myScroll.refresh();
                }, 320);
            });

            var pullUpEl, pullUpOffset,
                generatedCount = 0;

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

                    this.shoppingbagRecord.push(...data);

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

        },

        components: {
            confirm
        }
    }
</script>

<style scoped>
    .shopping_bag_main {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 1.4rem;
        z-index: 2;
        overflow: visible;
        background: #fff;
        box-sizing: border-box;
    }

    .record_list_box {
        position: absolute;
        width: 100%;
        top: 48px;
        bottom: 2.8rem;
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

    .empty_tip_contain {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .empty_tip_box {
        position: absolute;
        top: 36%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: url('../../images/shopping_bag/shopping_bag_empty_icon.png') center 15% no-repeat;
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

    .batch_processing_box {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        box-sizing: border-box;
        padding: 16px 3%;
        line-height: 16px;
    }

    .select_all_box {
        display: inline-block;
    }

    .select_all_box .select_btn {
        display: inline-block;
        position: static;
        width: 10vw;
        height: 16px;
        vertical-align: middle;
    }

    .edit_all_box {
        position: absolute;
        right: 3%;
        top: 50%;
        transform: translateY(-50%);
        text-align: right;
    }

    .edit_all_btn,
    .complete_edit_all_btn{
        display: inline-block;
        line-height: 16px;
        background: url('../../images/common/edit_icon.png') left center no-repeat;
        background-size: 16px auto;
        padding-left: 20px;
    }

    .complete_edit_all_btn {
        background-image: url('../../images/common/complete_icon.png');
        margin-left: 20px;
    }

    .record_list {
        padding: 0 3% 3% 3%;
    }

    .record_item {
        position: relative;
        padding: 0.29rem 0.242rem;
        border: 1px solid #d8d8d8;
        border-radius: 4px;
        margin-bottom: 3%;
    }

    .record_item.edit_status {
        border-color: #ef8200;
        box-shadow: 0 0 0 1px #ef8200 inset;
    }

    .select_box {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        vertical-align: middle;
        width: 10%;
        padding-left: 0.242rem;
    }

    .select_btn {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: url('../../images/common/checkbox_icon.png') center no-repeat;
        background-size: 16px auto;
    }

    .select_btn.active {
        background-image: url('../../images/common/checkbox_icon_active.png');
    }

    .goods_link {
        display: inline-block;
        vertical-align: middle;
        position: relative;
        width: 36%;
        padding-top: 36%;
        margin-left: 10%;

    }

    .goods_img_box {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .goods_img {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 100%;
        transform: translate(-50%, -50%);
    }

    .info_area {
        position: absolute;
        left: 46%;
        top: 0.338rem;
        bottom: 0.29rem;
        font-size: 12px;
        margin-left: 12px;
        width: 50%;
        box-sizing: border-box;
        overflow: hidden;
    }

    .info_swiper {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 200%;
        transition: transform .24s linear;
    }

    .info_swiper.edit_status {
        transform: translateX(-50%);
    }

    .goods_info,
    .edit_box {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 50%;
        box-sizing: border-box;
    }

    .goods_info {
        padding-top: 20px;
    }

    .edit_box {
        left: 51%;
    }

    .goods_name {
        position: absolute;
        top: 0;
        left: 0;
        font-weight: bolder;
        font-size: 14px;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .goods_color,
    .goods_size {
        line-height: 0.435rem;
    }

    .price_box {
        position: relative;
        font-weight: bolder;
        font-size: 0;
        padding: 0.072rem 0 0.386rem 0;
        margin-bottom: 0.386rem;
        line-height: 0.29rem;
    }

    .old_price_box {
        color: #888;
        font-weight: normal;
    }

    .old_price_box .price {
        text-decoration: line-through;
        font-size: 13px;
        line-height: 13px;
    }

    .money_tip {
        display: inline-block;
        vertical-align: text-top;
        font-size: 8px;
        line-height: 8px;
    }

    .price {
        display: inline-block;
        vertical-align: text-top;
        font-size: 14px;
        line-height: 14px;
    }

    .goods_num,
    .product_number {
        position: absolute;
        left: 0;
        bottom: 0;
        line-height: 14px;
    }

    .edit_btn,
    .complete_btn {
        position: absolute;
        bottom: 0;
        right: 12px;
        color: #888;
        text-decoration: underline;
        line-height: 14px;
    }

    .complete_btn {
        color: #333;
        text-decoration: none;
    }

    .edit_num_box {
        font-size: 0;
        margin-top: 0.338164rem;
    }

    .num_edit_btn {
        width: 32px;
        height: 32px;
        display: inline-block;
        vertical-align: middle;
        border: 1px solid #efefef;
        background: url('../../images/common/add_icon.png') center no-repeat;
        background-size: 14px auto;
    }

    .subtract {
        background-image: url('../../images/common/subtract_icon.png');
    }

    .subtract.disable {
        background-image: url('../../images/common/subtract_disable_icon.png');
    }

    .add.disable {
        background-image: url('../../images/common/add_disable_icon.png');
    }

    .goods_num_result {
        display: inline-block;
        vertical-align: middle;
        width: 70px;
        height: 32px;
        line-height: 32px;
        border-top: 1px solid #efefef;
        border-bottom: 1px solid #efefef;
        font-size: 12px;
        text-align: center;
    }

    .bottom_handle_box {
        position: fixed;
        left: 0;
        bottom: 1.4rem;
        width: 100%;
        line-height: 1.4rem;
        font-size: 0;
        box-shadow: 0 1px 0 0 #efefef inset;
    }

    .remove_goods_btn {
        position: absolute;
        right: 12px;
        top: 0;
        width: 32px;
        height: 32px;
        background: url('../../images/shopping_bag/del_goods_item_icon.png') right top no-repeat;
        background-size: 16px auto;
    }

    .balance_btn_box {
        background: #ef8200;
        color: #fff;
        display: inline-block;
        vertical-align: middle;
        width: 40%;
        text-align: center;
        font-size: 12px;
    }

    .subtotal_box {
        font-weight: bold;
        display: inline-block;
        vertical-align: middle;
        width: 60%;
        box-sizing: border-box;
        padding-left: 3%;
        font-size: 12px;
    }

    .subtotal_box .money_tip {
        margin-left: 5px;
    }

    .remove_all_goods_box {
        text-align: right;
    }

    .batch_remove_goods_btn {
        display: inline-block;
        vertical-align: middle;
        background: #ef8200;
        color: #fff;
        width: 40%;
        text-align: center;
        font-size: 12px;
    }
</style>