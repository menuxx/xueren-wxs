import wepy from 'wepy'
import config from '../config'
import qs from 'querystring'

export default {
  miniCodeToSession (code, encryptedData, iv, rawData, signature) {
    return wepy.request({
      url: '/wxauth/mini_code_to_session',
      method: 'PUT',
      data: {
        code, encryptedData, iv, rawData, signature
      }
    })
  },
  consumeCodeToGroup(groupId, pathCode) {
    return wepy.request({
      url: `/user/xr_groups/${groupId}`,
      data: {
        code: pathCode
      }
    })
  },
  /**
   * 获取我的书籍
   */
  loadMyGroups (pageNum = 1) {
    return wepy.request({
      url: `/user/xr_groups?${qs.stringify({pageNum})}`
    })
  },
  /**
   * 创建一个话题
   */
  postTopic(groupId, content) {
    return wepy.request({
      method: 'POST',
      url: `/xr_groups/${groupId}/topics`,
      data: { content }
    })
  },
  // 加载群组通过id
  loadMyGroupById(groupId) {
    return wepy.request({
      url: `/user/xr_groups/${groupId}`
    })
  },
  loadGroupTopics(groupId) {
    return wepy.request({
      url: `/xr_groups/${groupId}/topics`
    })
  }
}
