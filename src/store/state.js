const  state = {
  navIndex: 1,  //导航位置
  userInfo: null,
  token: null,
  chatInfo: null, //正在进行中的问诊
  msgHistory: null, //问诊聊天信息
  patientSocketId: null, //正在问诊的病人socket id
  rpTemp: null,
}

export default state
