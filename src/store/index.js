import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'


Vue.use(Vuex)

const state = {
    routerList: {
        '/home': 0,

        '/brand': 1,
        '/goods_list': 5,
        '/goods_search': 6,
        '/goods_detail': 7,

        '/shopping_bag': 3,
        '/settle_accounts': 8,

        '/user_index': 4,
        '/blance': 15,
        '/red_package': 16,
        '/point': 17,
        '/coupon': 18,
        '/orders_all': 19,
        '/orders_no_pay': 20,
        '/orders_no_send': 21,
        '/orders_no_receive': 22,
        '/user_info': 23,
        '/address_manager': 24,
        '/my_collection': 25,
        '/help_center': 26,
        '/bind_phone_number': 30,
        '/coupon/no_use': 31,
        '/coupon/overdue': 32,
    },
    goodsListRecord: [],
    isShowLoad: false,
    keyWord: ''
}

export default new Vuex.Store({
    state,
    mutations
})
