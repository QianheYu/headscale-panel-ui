import request from '@/utils/request'

export function getACL() {
  return request({
    url: '/api/console/acl',
    method: 'get'
  })
}
export function postACL(data) {
  return request({
    url: '/api/console/acl',
    method: 'post',
    data
  })
}
