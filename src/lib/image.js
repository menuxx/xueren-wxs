import config from '../config'

export const cdnFullUrl = function (filename, keyPrefox) {
  return config.CDNBaseUrl + keyPrefox + filename
}
