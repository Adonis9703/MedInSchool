import axios from 'axios'
// import Qs from 'qs'
import {Loading} from 'element-ui'
import store from '../store'

export const setURL = (url, args) => {
  if (typeof url === 'undefined') {
    throw 'no url!'
  }
  if (!args) return url
  for (var i = 0; i < args.length; i++) {
    if (url.indexOf('{?}') < 0) {
      break
    }
    url = url.replace(/\{\?\}/, args[i] + '')
  }
  // 最后是否有/{?}
  if (url.lastIndexOf('/{?}') > -1) {
    url = url.substr(0, url.lastIndexOf('/{?}'))
  }
  console.log(url)
  return url
}

const postBase = {
  // 请求的接口，在请求的时候，如axios.get(url,config);这里的url会覆盖掉config中的url
  url: '/post',
  // 请求方法同上
  method: 'post', // default
  // 请求头信息
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset-utf-8'
    // 'Content-Type': 'application/json;charset=UTF-8'
  },
  // 设置超时时间
  timeout: 50000,
  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: true, // default
  // 返回数据类型
  responseType: 'json' // default
}

const postBaseResponseText = {...postBase, responseType: 'text'}

const postBaseJsontype = {
  ...postBase,
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded;charset-utf-8'
    'Content-Type': 'application/json;charset=UTF-8'
  }
}

const postFile = {
  ...postBase,
  timeout: 5000,
  // 请求头信息
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded;charset-utf-8'
    'Content-Type': 'multipart/form-data'
  }
}

const postResArraybuffer = {
  ...postBase,
  // 请求头信息
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  // 返回数据类型
  responseType: 'arraybuffer'
}

/**
 * option {
    isLoading: boolean true 菊花， false， 没有菊花（ 相当于无声请求）
    loadingTarget: 覆盖的元素,默认是ts - main - content, 传入body全屏
    loadingText: 请稍等...
    url: '' //可以传apiurl中的key, 也可以传整个url
    param: 作为post数据传过去，json对象或者字符串, 如果是字符串那么可能是body形式传过去，
    postType: postBase//不写默认 text:postBase_responseText json postBase_jsontype file: post_File, arraybuffer: post_resArraybuffer
  }
 返回 Promise
 */
// let loading
export const post = (option) => {
  let url = setURL(option.url, option.requestParam)
  let isLoading = option.isLoading
  if (isLoading) {
  }
  let param

  if (option.param) {
    if (typeof option.param === 'string') {
      param = option.param
    } else {
      if (option.postType === 'json' || option.postType === 'file') {
        param = option.param
      } else {
        param = new URLSearchParams()
        for (let x in option.param) {
          param.append(x, option.param[x])
        }
      }
    }
  }
  let postType = postBase
  
  if (option.postType === 'text') {
    postType = postBaseResponseText
  } else if (option.postType === 'json') {
    postType = postBaseJsontype
  } else if (option.postType === 'file') {
    postType = postFile
  } else if (option.postType === 'arraybuffer') {
    postType = postResArraybuffer
  }
  let method = option.method ? option.method : 'post'
  
  if (store.state.token) {
    postType.headers.token = store.state.token
  }
  
  return new Promise((resolve, reject) => {
    axios[method](url, param, postType).then((response) => {
      // if (isLoading) {
      // }
      if (response.status === 200) {
        resolve(response)
      } else {
        // if (isLoading) {
        // }
        reject(response)
      }
    }).catch((error) => {
      // if (isLoading) {
      // }
      if (!error || error.status === 404 || error.status === 500 || error.status === 502 || error.status === 503 || error.status === 504) {
        Toast.fail('网络或服务器异常,请检查网络')
      }
      reject(error || {})
    })
  })
}

export const get = (option) => {
  option.method = 'get'
  this.post(option)
}
