import request from '@/utils/request'

export function getSystemInfo(params) {
  return request({
    url: '/api/system/info',
    method: 'get',
    params
  })
}
export function getStatus(params) {
  return request({
    url: '/api/system/status',
    method: 'get',
    params
  })
}

export function install(data) {
  return request({
    url: '/api/system/install',
    method: 'post',
    data
  })
}
