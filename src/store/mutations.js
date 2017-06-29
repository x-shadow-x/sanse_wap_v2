const SET_USER_ID = 'SET_USER_ID'
const SET_COOKIE_ID = 'SET_COOKIE_ID'
const SHOW_LOAD = 'SHOW_LOAD'
const HIDE_LOAD = 'HIDE_LOAD'
const SET_KEY_WORD = 'SET_KEY_WORD'
const SET_GOODS_LIST_RECORD = 'SET_GOODS_LIST_RECORD'
const PUSH_GOODS_LIST_RECORD = 'PUSH_GOODS_LIST_RECORD'

export default {

    [SET_USER_ID](state, data) {
        state.userId = data;
    },

    [SET_COOKIE_ID](state, data) {
        state.cookieId = data;
    },

    [SHOW_LOAD](state) {
    	state.isShowLoad = true;
    },
    
    [HIDE_LOAD](state) {
    	state.isShowLoad = false;
    },

    [SET_KEY_WORD](state, arg) {
    	state.keyWord = arg.value;
    },

    [SET_GOODS_LIST_RECORD](state, data) {
    	state.goodsListRecord = data;
    },

    [PUSH_GOODS_LIST_RECORD](state, data) {
        state.goodsListRecord.push(...data);
    }
}
