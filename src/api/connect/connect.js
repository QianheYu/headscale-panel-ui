import request from '@/utils/request'

export function connect(data) {
  return request({
    url: '/api/oidc/authorize',
    method: 'post',
    data
  })
}
