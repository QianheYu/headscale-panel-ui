import request from '@/utils/request'

export function getRoute(params) {
  return request({
    url: '/api/console/route',
    method: 'get',
    params
  })
}

export function switchRoute(data) {
  return request({
    url: '/api/console/route',
    method: 'patch',
    data
  })
}

export function deleteRoute(data) {
  return request({
    url: '/api/console/route',
    method: 'delete',
    data
  })
}
