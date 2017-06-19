const SHOW_LOAD = 'SHOW_LOAD'
const HIDE_LOAD = 'HIDE_LOAD'
const SET_KEY_WORD = 'SET_KEY_WORD'

export default {

    [SHOW_LOAD](state) {
    	state.isShowLoad = true;
    },
    
    [HIDE_LOAD](state) {
    	state.isShowLoad = false;
    },

    [SET_KEY_WORD](state, arg) {
    	state.keyWord = arg.value;
    }
}
