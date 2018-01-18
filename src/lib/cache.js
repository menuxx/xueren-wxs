import wepy from 'wepy'
import isEmpty from 'lodash.isempty'

/**
 * @param {string} key
 * @param {*} data
 */
export const cacheSet = (key, data) => {
  wepy.setStorageSync(key, { meta: { createAt: Date.now() }, body: data })
}

/**
 * @param {string} key
 * @param {*} data
 * @param {int} expire
 */
export const cacheGet = (key, data, expire = 3600) => {
  var storeData = wepy.getStorageSync(key)
  if (isEmpty(storeData)) {
    return null
  }
  // 过期条件
  if (Date.now() - storeData.meta.createAt > expire * 1000) {
    return null
  } else {
    return storeData.body
  }
}
