import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'


Vue.use(Vuex)

const state = {
    routerList: {
        '/home': 0,
        '/brand': 1,
        '/user_index': 4,
        '/user_info': 5,
        '/blance': 15,
        '/red_package': 16,
        '/point': 17,
        '/coupon': 18,
        '/bind_phone_number': 19
    }
}

export default new Vuex.Store({
    state,
    mutations
})
