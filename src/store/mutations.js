const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'

export default {
    [TOGGLE_SIDEBAR](state, payload) {
        if (payload.spreadSidebar == true) {
            state.spreadSidebar = true;
        } else {
            state.spreadSidebar = false;
        }
    }
}
