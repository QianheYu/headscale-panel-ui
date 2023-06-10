import request from '@/utils/request'

export function getPreAuthKeys() {
  return request({
    url: '/api/console/preauthkey',
    method: 'get'
  })
}

export function createPreAuthKey(data) {
  return request({
    url: '/api/console/preauthkey',
    method: 'post',
    data
  })
}

export function expirePreAuthKey(data) {
  return request({
    url: '/api/console/preauthkey',
    method: 'delete',
    data
  })
}
