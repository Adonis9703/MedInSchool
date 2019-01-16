// let baseUrl = 'http://47.101.185.46:3000'
let baseUrl = 'http://localhost:3000'

export const api = {
  base: baseUrl,
  login: baseUrl + '/login',
  getChatReqListByDocId: baseUrl + '/getChatListByDocId',
  getMsgHistory: baseUrl + '/getMsgHistory',
  getUserInfo: baseUrl + '/getUserInfoById',
  updateChatInfo: baseUrl + '/updateChat',
  
}
