const SHOW_LOAD = 'SHOW_LOAD'
const HIDE_LOAD = 'HIDE_LOAD'
const SET_KEY_WORD = 'SET_KEY_WORD'
const SET_GOODS_LIST_RECORD = 'SET_GOODS_LIST_RECORD'
const PUSH_GOODS_LIST_RECORD = 'PUSH_GOODS_LIST_RECORD'

export default {

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

    [PUSH_GOODS_LIST_RECORD](state, arg) {
    	state.goodsListRecord = state.goodsListRecord.push(...data);
    }
}
