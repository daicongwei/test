
const state = {
    // userInfo: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
    userInfo:{}
}
const mutations = {
    SET_USERINFO(state, payload) {
        state.userInfo = payload
    },
    CLEAR_USERINFO(state, payload) {
        state.userInfo = payload;
        localStorage.removeItem('user')
    }
}
const getters = {
    // userInfo: (state) => state.userInfo
    userInfo:(state) => {
        let u = {}
        if(JSON.stringify(state.userInfo) == '{}'){
            u = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
        }else{
             u = state.userInfo
        }
        return u
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    getters
}