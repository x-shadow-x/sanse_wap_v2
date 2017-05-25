import App from '../App'

const home = r => require.ensure([], () => r(require('../pages/home/home')), 'home')

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
    }]
}]