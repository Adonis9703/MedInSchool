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
  },
  addMsgHistory(state, value) {
    state.msgHistory.push(value)
  },
  setPatientSocket(state, value) {
    state.patientSocketId = value
  },
  setNavIndex(state, value) {
    state.navIndex = value
  },
  setRpTemp(state, value) {
    state.rpTemp = value
  }
}

export default mutations
