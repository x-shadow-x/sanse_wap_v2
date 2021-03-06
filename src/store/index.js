import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'


Vue.use(Vuex)
  
const state = {
    userId: '0',     // 全局使用的userid，个人中心页几乎各项数据的获取都需要此字段~同时此字段也被用来判断用户是否已经登录~默认为0表示没有登录
    cookieId: '0',   // 一个随机id~因在多个页面获取数据时需要用到故作全局配置~默认为 0
    companyId: '1',  // 固定的id值
    brandId: '1',    // 固定的id值
    jpushId: '0',   // 固定的id值
    channelId: '0', // 固定的id值
    appId: '0',     // 固定的id值
    restTime: 5,    // 验证码重发时间
    versionType: 'MAPP', // 还未有wap的接口~此处使用和ios相同的配置参数去获取系统配置（待用）
    systypes: 'IOS',     // 还未有wap的接口~此处使用和ios相同的配置参数去获取系统配置（待用）
    layoutStyle: 'sanse-home-layout', // 首页广告布局名
    goodsListRecord: [], // 记录商品列表当前加载的商品数据的状况~以便从商品详情页返回的时候还原之前的状态
    isShowLoad: false,
    keyWord: '', // 当在商品搜索页输入关键词并跳转到搜索结果页时需先记录输入的关键词~以便再再次返回搜索页的时候直接显示上次输入的关键词
    userInfo: {},
    shoppingBagNum: 0,
    loginRouter: navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger' ? '/wx_login' : '/login', // 配置登录路由~机制为加载页面的时候检测页面是否是用微信打开~如果是则将此路由修改为/wx_login~对应wx_login.vue

    routerList: {
        '/home': 0,

        '/brand': 1,
        '/login': 2,
        '/goods_list': 5,
        '/goods_search': 6,
        '/goods_detail': 7,
        '/store_search': 8,

        '/shopping_bag': 2,
        '/settle_accounts': 8,
        '/delievry_time': 9,
        '/payment_list': 10,
        '/select_coupon': 11,

        '/user_index': 3,
        '/blance': 15,
        '/red_package': 16,
        '/point': 17,
        '/coupon': 18,
        '/orders_all': 19,
        '/orders_no_pay': 20,
        '/orders_no_send': 21,
        '/orders_no_receive': 22,
        '/order_detail': 40,
        'apply_return': 41,
        '/user_info': 23,
        '/address_manager': 24,
        '/my_collection': 25,
        '/help_center': 26,
        '/bind_phone_number': 30,
        '/coupon/no_use': 31,
        '/coupon/overdue': 32,

        '/store_pay': 4,
        '/history_pay': 50,
        '/pay_info': 51,
        '/history_pay/store_pay_result': 52,
    },
    
}

export default new Vuex.Store({
    state,
    mutations
})
