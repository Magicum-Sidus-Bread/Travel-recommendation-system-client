import request from '@/utils/request'
import axios from 'axios'
import util from '@/libs/util'

/**
 * @description 发送反馈
 * @param {Object} data
 * @param {Object} data
 */
export function SendFeedback (params) {
  return request({
    url: '/user/feedback',
    method: 'POST',
    data: params,
    headers: { Authorization: util.cookies.get('token') }
  })
}
