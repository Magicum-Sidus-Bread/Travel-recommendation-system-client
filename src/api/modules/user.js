import request from '@/utils/request'

export function SendFeedback (params) {
  return request({
    url: '/user/feedback',
    method: 'POST',
    data: params,
    headers: { Authorization: localStorage.token }
  })
}
