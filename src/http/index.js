
import log from '../lib/log'
import config from '../config'
import assign from 'lodash.assign'
import isEmpty from 'lodash.isempty'
import {getAuthToken} from '../lib/auth'

const logger = log('xr:http')

export const requestHandler = {
  config (p) {
    logger.log('ApiBaseUrl', config.ApiBaseUrl)
    p.url = config.ApiBaseUrl + p.url
    var authToken = getAuthToken()
    if (!isEmpty(authToken)) {
      p.header = assign({}, p.header, { 'X-Authorization': `token ${getAuthToken()}` })
    }
    return p
  },
  success (p) {
    logger.log('success')
    return p
  },
  fail (p) {
    logger.error('error', p)
    return p
  },
  complete(p) {
    logger.log('complete', p)
  }
}
