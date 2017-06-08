const SHOW_LOAD = 'SHOW_LOAD'
const HIDE_LOAD = 'HIDE_LOAD'

export default {

    [SHOW_LOAD](state) {
    	state.isShowLoad = true;
    },
    
    [HIDE_LOAD](state) {
    	state.isShowLoad = false;
    }
}
