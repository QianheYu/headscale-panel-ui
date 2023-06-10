import request from '@/utils/request'

export function getHeadscaleConfig() {
  return request({
    url: '/api/system/headscale',
    method: 'get'
  })
}

export function postHeadscaleConfig(data) {
  return request({
    url: '/api/system/headscale',
    method: 'post',
    data
  })
}

