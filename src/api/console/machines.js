import request from '@/utils/request'

export function getMachines(params) {
  return request({
    url: '/api/console/machine',
    method: 'get',
    params
  })
}

export function postMachine(data) {
  return request({
    url: '/api/console/machine',
    method: 'post',
    data
  })
}

export function deleteMachine(data) {
  return request({
    url: '/api/console/machine',
    method: 'delete',
    data
  })
}

export function updateTags(data) {
  return request({
    url: '/api/console/machine',
    method: 'patch',
    data
  })
}

export function moveMachine(data) {
  return request({
    url: '/api/console/machine',
    method: 'put',
    data
  })
}
