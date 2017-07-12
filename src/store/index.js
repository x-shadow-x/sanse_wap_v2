import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'


Vue.use(Vuex)

const state = {
    userId: '0', // 全局使用的userid，个人中心页几乎各项数据的获取都需要此字段~同时此字段也被用来判断用户是否已经登录~默认为0表示没有登录
    cookieId: '0', // 一个随机id~因在多个页面获取数据时需要用到故作全局配置~默认为 0
    routerList: {
        '/home': 0,

        '/brand': 1,
        '/goods_list': 5,
        '/goods_search': 6,
        '/goods_detail': 7,
        '/store_search': 8,

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
    goodsListRecord: [], // 记录商品列表当前加载的商品数据的状况~以便从商品详情页返回的时候还原之前的状态
    isShowLoad: false,
    keyWord: '', // 当在商品搜索页输入关键词并跳转到搜索结果页时需先记录输入的关键词~以便再再次返回搜索页的时候直接显示上次输入的关键词
}

export default new Vuex.Store({
    state,
    mutations
})
