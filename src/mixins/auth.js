
import wepy from 'wepy'
import log from '../lib/log'
import * as auth from '../lib/auth'
import api from '../http/api'

const logger = log('xr:auth-mixin')

export default class AuthMixin extends wepy.mixin {
  onLoad(args) {
    var self = this
    // 已经登录
    auth.checkAuth().then(({ userInfo, token }) => {
      logger.log({ args, userInfo, token })
      self.onAuthLoad(args, userInfo)
    }, err => {
      logger.log(err.message)
      // 没有登录, 就尝试登录
      auth.retryGetUserInfo((userInfo) => {
        logger.log(err.message)
        logger.log('userInfo', userInfo)
        var {encryptedData, iv, rawData, signature} = userInfo
        wepy.login().then(({code}) => {
          return api.miniCodeToSession(code, encryptedData, iv, rawData, signature)
        })
        .then((res) => {
          var {token, userInfo} = res.data
          auth.setAuthToken(token)
          auth.setUserInfo(userInfo)
          self.onAuthLoad(args, userInfo)
        })
      })
    })
  }
}
