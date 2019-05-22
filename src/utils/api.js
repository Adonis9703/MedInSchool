// let baseUrl = 'http://47.101.185.46:3000'
let baseUrl = 'http://127.0.0.1:3000'

export const api = {
  base: baseUrl,
  login: baseUrl + '/login',  //登录
  update: baseUrl + '/update',   //更新用户信息
  getChatReqListByDocId: baseUrl + '/getChatListByDocId', //获取问诊列表
  getMsgHistory: baseUrl + '/getMsgHistory',  //获取消息历史
  getUserInfo: baseUrl + '/getUserInfoById',  //获取用户信息
  updateChatInfo: baseUrl + '/updateChat',  //更新问诊信息
  addMedInfo: baseUrl + '/addMedInfo',  //新增药品
  getMedInfoList: baseUrl + '/getMedInfoList', //获取药品列表
  updateMedInfo: baseUrl + '/updateMedInfo',  //更新药品信息
  createRp: baseUrl + '/createRp', //新建处方单
  getRpByChatId: baseUrl + '/getRpByChatId',  //通过问诊id获取处方
  getDoctorList: baseUrl + '/getDoctorList', //获取医生列表
  addDoctor: baseUrl + '/register', //添加医生
}
