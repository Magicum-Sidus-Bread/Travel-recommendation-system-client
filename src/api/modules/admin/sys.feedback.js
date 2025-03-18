import request from '@/utils/request'
import axios from 'axios'
import util from '@/libs/util'

/**
 * @description 获取反馈列表
 * @param {Object} data
 */
export function FBlist (params) {
  return request({
    url: '/admin/fblist',
    method: 'GET',
    data: params,
    headers: { Authorization: util.cookies.get('token') }
  })
}

/**
 * @description 搜索反馈
 * @param {Object} data
 */
export function Searchfb (params) {
  return request({
    url: '/admin/searchfb',
    method: 'GET',
    data: params,
    headers: { Authorization: util.cookies.get('token') }
  })
}

/**
 * @description 处理反馈
 * @param {Object} data
 */
export function Handlefeedback (params) {
  return request({
    url: '/admin/handlefeedback',
    method: 'POST',
    data: params,
    headers: { Authorization: util.cookies.get('token') }
  })
}
