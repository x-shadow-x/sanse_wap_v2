import App from '../App'

const home = r => require.ensure([], () => r(require('../pages/home/home.vue')), 'home')
const brand = r => require.ensure([], () => r(require('../pages/brand/brand.vue')), 'brand')
const userIndex = r => require.ensure([], () => r(require('../pages/user/user_index.vue')), 'user')
const userInfo = r => require.ensure([], () => r(require('../pages/user/user_info.vue')), 'user')
const bindPhoneNumber = r => require.ensure([], () => r(require('../pages/user/bind_phone_number.vue')), 'user')
const blance = r => require.ensure([], () => r(require('../pages/user/blance.vue')), 'user')
const redPackage = r => require.ensure([], () => r(require('../pages/user/red_package.vue')), 'user')
const point = r => require.ensure([], () => r(require('../pages/user/point.vue')), 'user')


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
        path: '/brand',
        component: brand,
        meta: {
            title: '品牌'
        }
    }, {
        path: '/user_index',
        component: userIndex,
        meta: {
            title: '会员中心'
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
    }]
}]
