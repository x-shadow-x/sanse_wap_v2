const SHOW_LOAD = 'SHOW_LOAD'
const HIDE_LOAD = 'HIDE_LOAD'

const SHOW_ALERT = 'SHOW_ALERT'
const HIDE_ALERT = 'HIDE_ALERT'

export default {

    [SHOW_LOAD](state) {
    	state.isShowLoad = true;
    },
    
    [HIDE_LOAD](state) {
    	state.isShowLoad = false;
    },

    [SHOW_ALERT](state) {
    	state.isShowAlert = true;
    },
    
    [HIDE_ALERT](state) {
    	state.isShowAlert = false;
    }
}
