import { getToken } from '@/utils/auth'
import { EventSourcePolyfill } from 'event-source-polyfill'

export function UtilEventSource(resoureUrl, options = {}) {
  return new EventSourcePolyfill(resoureUrl, {
    headers: {
      'Authorization': 'Bearer ' + getToken()
    },
    ...options
  })
}

