import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'


Vue.use(Vuex)

const state = {
    routerList: {
        '/home': 0,
        '/user_index': 4
    }
}

export default new Vuex.Store({
    state,
    mutations
})
