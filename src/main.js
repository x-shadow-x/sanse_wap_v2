import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
import FastClick from 'fastclick'
import $ from 'jquery'
import './styles/common.css'
import './config/flexible_css.js'
import './config/flexible.js'
import request from './config/request.js'
import interfaceConfig from './config/interface_config.js'
import md5Api from './config/md5.js'
import helper from './config/helper.js'
import store from './store'
import axios from 'axios'

import './plugins/lazysizes.min.js'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.HOST = '/api'
Vue.prototype.$request = request
Vue.prototype.$interface = interfaceConfig
Vue.prototype.$helper = helper
Vue.prototype.$md5 = md5Api

console.log(md5Api);

function init() {
    // store.commit('SET_USER_ID', '304014');
    // store.commit('SET_COOKIE_ID', '23456006805d970d5438a354dc019fc295614979');
    let userId = localStorage.getItem('USER_ID');
    let cookieId = localStorage.getItem('COOKIE_ID');

    if (cookieId) {
        store.commit('SET_COOKIE_ID', cookieId);

    } else {
        // localStorage.setItem('COOKIE_ID', '23456006805d970d5438a354dc019fc295614979');
        // cookieId = '23456006805d970d5438a354dc019fc295614979';
        // store.commit('SET_COOKIE_ID', cookieId);
        let cookieId = md5Api(new Date().getTime());
        localStorage.setItem('COOKIE_ID', cookieId);
        store.commit('SET_COOKIE_ID', cookieId);
    }

    if (userId) {
        store.commit('SET_USER_ID', userId);
    }/* else {
        localStorage.setItem('USER_ID', '304014');
        userId = '304014';
        store.commit('SET_USER_ID', userId);
    }*/

    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function() {
            FastClick.attach(document.body);
        }, false);
    }
}

init();

Vue.use(VueRouter)
const router = new VueRouter({
    mode: 'history',
    // base: '/vue_mobile/',
    // base: '/sanse_wap_v2/dist/',
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next()
})

new Vue({
    router,
    store,
}).$mount('#app')
