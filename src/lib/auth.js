
import log from '../lib/log'
import wepy from 'wepy'
import isEmpty from 'lodash.isempty'
import {cacheSet, cacheGet} from '../lib/cache'

const logger = log('xr:auth-lib')
const __user_info__ = 'wx:user_info'
const __auth_token__ = 'wx:auth_token'

function needAuthorize (cb) {
  return wepy.getSetting().then((res) => { return !res.authSetting['scope.userInfo'] })
}
function requestAuthorize (success, retry) {
  wepy.authorize({scope: 'scope.userInfo'}).then(res => {
    return wepy.getUserInfo().then(success)
  }, err => {
    if (err.errMsg === 'authorize:fail auth deny') {
      wepy.openSetting().then(res => {
        logger.log('openSetting-success', res)
        retry(!res.authSetting['scope.userInfo'])
      })
    }
  })
}

function tryGetUserInfo(isNeed, cb) {
  if (isNeed) {
    requestAuthorize(cb, isNeed => { tryGetUserInfo(true, cb) })
  } else {
    requestAuthorize(cb, (isNeed) => {})
  }
}

export const getUserInfo = () => {
  return cacheGet(__user_info__)
}

export const setUserInfo = (userinfo) => {
  cacheSet(__user_info__, userinfo)
}

export const getAuthToken = () => {
  return cacheGet(__auth_token__)
}

export const setAuthToken = (token) => {
  cacheSet(__auth_token__, token)
}

// 反复重试获取用户信息
export const retryGetUserInfo = (cb) => {
  needAuthorize().then(isNeed => {
    tryGetUserInfo(isNeed, cb)
  })
}

export const checkAuth = () => {
  var token = getAuthToken()
  return new Promise((resolve, reject) => {
    if (isEmpty(token)) {
      reject(new Error('用户未登录'))
    } else {
      var userInfo = getUserInfo()
      if (isEmpty(userInfo)) {
        reject(new Error('用户信息不完整'))
      } else {
        resolve({ token, userInfo })
      }
    }
  })
}
