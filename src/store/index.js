import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'


Vue.use(Vuex)

const state = {
    routerList: {
        '/home': 0,
        '/brand': 1,
        '/user_index': 4,
        '/user_info': 5
    }
}

export default new Vuex.Store({
    state,
    mutations
})
