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
        '/red_package': 15,
        '/point': 16,
        '/blance': 17,
        '/bind_phone_number': 18
    }
}

export default new Vuex.Store({
    state,
    mutations
})
