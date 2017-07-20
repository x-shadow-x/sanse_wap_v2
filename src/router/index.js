import App from '../App'

const home = r => require.ensure([], () => r(require('../pages/home/home.vue')), 'home')
const login = r => require.ensure([], () => r(require('../pages/user/login.vue')), 'login')
const wxLogin = r => require.ensure([], () => r(require('../pages/user/wx_login.vue')), 'wxLogin')

const brand = r => require.ensure([], () => r(require('../pages/brand/brand.vue')), 'brand')
const goodsList = r => require.ensure([], () => r(require('../pages/brand/goods_list.vue')), 'goods')
const goodsSearch = r => require.ensure([], () => r(require('../pages/brand/goods_search.vue')), 'goods')
const goodsDetail = r => require.ensure([], () => r(require('../pages/brand/goods_detail.vue')), 'goods')
const storeSearch = r => require.ensure([], () => r(require('../pages/brand/store_search.vue')), 'goods')

const shoppingBag = r => require.ensure([], () => r(require('../pages/shopping_bag/shopping_bag.vue')), 'shoppingBag')
const settleAccounts = r => require.ensure([], () => r(require('../pages/shopping_bag/settle_accounts.vue')), 'shoppingBag')

const userIndex = r => require.ensure([], () => r(require('../pages/user/user_index.vue')), 'user')
const blance = r => require.ensure([], () => r(require('../pages/user/blance.vue')), 'user')
const redPackage = r => require.ensure([], () => r(require('../pages/user/red_package.vue')), 'user')
const point = r => require.ensure([], () => r(require('../pages/user/point.vue')), 'user')
const coupon = r => require.ensure([], () => r(require('../pages/user/coupon.vue')), 'user')
const couponNoUse = r => require.ensure([], () => r(require('../pages/user/coupon_no_use.vue')), 'user')
const couponOverdue = r => require.ensure([], () => r(require('../pages/user/coupon_overdue.vue')), 'user')

const myCommission = r => require.ensure([], () => r(require('../pages/user/my_commission.vue')), 'commission')

const userInfo = r => require.ensure([], () => r(require('../pages/user/user_info.vue')), 'userInfo')
const bindPhoneNumber = r => require.ensure([], () => r(require('../pages/user/bind_phone_number.vue')), 'userInfo')

const ordersAll = r => require.ensure([], () => r(require('../pages/user/orders_all.vue')), 'orders')
const ordersNoPay = r => require.ensure([], () => r(require('../pages/user/orders_no_pay.vue')), 'orders')
const ordersNoSend = r => require.ensure([], () => r(require('../pages/user/orders_no_send.vue')), 'orders')
const ordersNoReceive = r => require.ensure([], () => r(require('../pages/user/orders_no_receive.vue')), 'orders')
const orderDetail = r => require.ensure([], () => r(require('../pages/user/order_detail.vue')), 'orders')
const applyReturn = r => require.ensure([], () => r(require('../pages/user/apply_return.vue')), 'orders')

const delievryTime = r => require.ensure([], () => r(require('../pages/shopping_bag/delievry_time.vue')), 'ordersAccount')
const paymentList = r => require.ensure([], () => r(require('../pages/shopping_bag/payment_list.vue')), 'ordersAccount')
const selectCoupon = r => require.ensure([], () => r(require('../pages/shopping_bag/select_coupon.vue')), 'ordersAccount')

const addressManager = r => require.ensure([], () => r(require('../pages/user/address_manager.vue')), 'address')
const addressAdd = r => require.ensure([], () => r(require('../pages/user/address_add.vue')), 'address')
const addressEdit = r => require.ensure([], () => r(require('../pages/user/address_edit.vue')), 'address')

const myCollection = r => require.ensure([], () => r(require('../pages/user/my_collection.vue')), 'collection')

const helpCenter = r => require.ensure([], () => r(require('../pages/user/help_center.vue')), 'helpCenter')
const helpCenterContent = r => require.ensure([], () => r(require('../pages/user/help_center_content.vue')), 'helpCenter')


export default [{
    path: '/',
    component: App,
    children: [{
        path: '',
        redirect: '/home',
        meta: {
            title: '首页'
        }
    }, {
        path: '/home',
        component: home,
        meta: {
            title: '首页'
        }
    }, {
        path: '/login',
        component: login,
        meta: {
            title: '登录'
        }
    },{
        path: '/wx_login',
        component: wxLogin,
        meta: {
            title: '微信登录'
        }
    },{
        path: '/brand',
        component: brand,
        meta: {
            title: '品牌'
        }
    }, {
        path: '/goods_list',
        component: goodsList,
        meta: {
            title: '商品列表'
        }
    }, {
        path: '/goods_search',
        component: goodsSearch,
        meta: {
            title: '搜索商品'
        }
    }, {
        path: '/goods_detail',
        component: goodsDetail,
        meta: {
            title: '商品详情'
        }
    }, {
        path: '/store_search',
        component: storeSearch,
        meta: {
            title: '库存查询'
        }
    }, {
        path: '/shopping_bag',
        component: shoppingBag,
        meta: {
            title: '购物袋'
        }
    }, {
        path: '/settle_accounts',
        component: settleAccounts,
        meta: {
            title: '结算'
        }
    }, {
        path: '/delievry_time',
        component: delievryTime,
        meta: {
            title: '收货时间'
        }
    }, {
        path: '/payment_list',
        component: paymentList,
        meta: {
            title: '支付方式'
        }
    }, {
        path: '/select_coupon',
        component: selectCoupon,
        meta: {
            title: '优惠券'
        }
    }, {
        path: '/user_index',
        component: userIndex,
        meta: {
            title: '会员中心'
        }
    }, {
        path: '/blance',
        component: blance,
        meta: {
            title: '我的余额'
        }
    }, {
        path: '/red_package',
        component: redPackage,
        meta: {
            title: '我的红包'
        }
    }, {
        path: '/point',
        component: point,
        meta: {
            title: '我的积分'
        }
    }, {
        path: '/coupon',
        component: coupon,
        meta: {
            title: '优惠券'
        },
        children: [{
            path: '/coupon/no_use',
            component: couponNoUse,
            meta: {
                title: '优惠券'
            }
        }, {
            path: '/coupon/overdue',
            component: couponOverdue,
            meta: {
                title: '优惠券'
            }
        }]
    }, {
        path: '/my_commission',
        component: myCommission,
        meta: {
            title: '我的提成'
        }
    }, {
        path: '/user_info',
        component: userInfo,
        meta: {
            title: '个人资料'
        }
    }, {
        path: '/bind_phone_number',
        component: bindPhoneNumber,
        meta: {
            title: '修改绑定手机号码'
        }
    }, {
        path: '/orders_all',
        component: ordersAll,
        meta: {
            title: '全部订单'
        }
    }, {
        path: '/order_no_pay',
        component: ordersNoPay,
        meta: {
            title: '待付款订单'
        }
    }, {
        path: '/orders_no_send',
        component: ordersNoSend,
        meta: {
            title: '待发货订单'
        }
    }, {
        path: '/orders_no_receive',
        component: ordersNoReceive,
        meta: {
            title: '待收货订单'
        }
    }, {
        path: '/order_detail',
        component: orderDetail,
        meta: {
            title: '订单详情'
        }
    }, {
        path: '/apply_return',
        component: applyReturn,
        meta: {
            title: '退货申请'
        }
    }, {
        path: '/address_manager',
        component: addressManager,
        meta: {
            title: '地址管理'
        }
    }, {
        path: '/address_add',
        component: addressAdd,
        meta: {
            title: '新增地址'
        }
    }, {
        path: '/address_edit',
        component: addressEdit,
        meta: {
            title: '编辑地址'
        }
    }, {
        path: '/my_collection',
        component: myCollection,
        meta: {
            title: '我的收藏'
        }
    }, {
        path: '/help_center',
        component: helpCenter,
        meta: {
            title: '帮助中心'
        },
        children: [{
            path: '/help_center/help_center_content',
            component: helpCenterContent,
            meta: {
                title: '关于SANSE APP'
            }
        }, {
            path: '/help_center/help_center_content',
            component: helpCenterContent,
            meta: {
                title: '如何使用SANSE APP'
            }
        }, {
            path: '/help_center/help_center_content',
            component: helpCenterContent,
            meta: {
                title: '线上购物新手指南-浏览商品'
            }
        }, {
            path: '/help_center/help_center_content',
            component: helpCenterContent,
            meta: {
                title: '线上购物新手指南-如何下单'
            }
        }, {
            path: '/help_center/help_center_content',
            component: helpCenterContent,
            meta: {
                title: '线上购物新手指南-售前须知'
            }
        }, {
            path: '/help_center/help_center_content',
            component: helpCenterContent,
            meta: {
                title: '线上购物新手指南-售后须知'
            }
        }]
    }]
}]
