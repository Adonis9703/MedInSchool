// let baseUrl = 'http://47.101.185.46:3000'
let baseUrl = 'http://localhost:3000'

export const api = {
  base: baseUrl,
  login: baseUrl + '/login',  //登录
  getChatReqListByDocId: baseUrl + '/getChatListByDocId', //获取问诊列表
  getMsgHistory: baseUrl + '/getMsgHistory',  //获取消息历史
  getUserInfo: baseUrl + '/getUserInfoById',  //获取用户信息
  updateChatInfo: baseUrl + '/updateChat',  //更新问诊信息
  addMedInfo: baseUrl + '/addMedInfo',  //新增药品
  getMedInfoList: baseUrl+ '/getMedInfoList', //获取药品列表
}
