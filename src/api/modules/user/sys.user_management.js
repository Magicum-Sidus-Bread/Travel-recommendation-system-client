import request from '@/utils/request'
import axios from 'axios'
import util from '@/libs/util'
/**
 * @description 上传头像
 * @param {Object} data
 */
export function UpdateAvatar (params) {
  return request({
    url: '/user/updateAvatar',
    method: 'POST',
    data: params,
    headers: { Authorization: util.cookies.get('token') }
  })
}

/**
 * @description 修改个人信息
 * @param {Object} data
 */
export function ModifyInfo (params) {
  return request({
    url: '/user/modifyInfo',
    method: 'POST',
    data: params,
    headers: { Authorization: util.cookies.get('token') }
  })
}
