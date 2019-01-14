const mutations = {
  setUserInfo(state, value) {
    state.userInfo = value
  },
  setToken(state, value) {
    state.token = value
  },
  setChatInfo(state, value) {
    state.chatInfo = value
  },
  setMsgHistory(state, value) {
    state.msgHistory = value
  }
}

export default mutations
