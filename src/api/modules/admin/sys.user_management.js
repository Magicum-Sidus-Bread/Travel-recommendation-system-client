import request from '@/utils/request'
import axios from 'axios'
import util from '@/libs/util'

/**
 * @description 封号
 * @param {Object} data
 */
export function BanUser (params) {
  return request({
    url: '/admin/banuser',
    method: 'POST',
    data: params,
    headers: { Authorization: util.cookies.get('token') }
  })
}

/**
 * @description 获取用户列表
 * @param {Object} data
 */
export function GetUserlist (params) {
  return request({
    url: '/admin/userlist',
    method: 'GET',
    data: params,
    headers: { Authorization: util.cookies.get('token') }
  })
}

/**
 * @description 搜索用户
 * @param {Object} data
 */
export function SearchUser (params) {
  return request({
    url: '/admin/searchuser',
    method: 'GET',
    data: params,
    headers: { Authorization: util.cookies.get('token') }
  })
}

/**
 * @description 获取申诉列表
 * @param {Object} data
 */
export function ComplaintList (params) {
  return request({
    url: '/admin/ComplaintList',
    method: 'GET',
    data: params,
    headers: { Authorization: util.cookies.get('token') }
  })
}

/**
 * @description 处理申诉信息
 * @param {Object} data
 */
export function handleComplaint (params) {
  return request({
    url: '/admin/handleComplaint',
    method: 'POST',
    data: params,
    headers: { Authorization: util.cookies.get('token') }
  })
}
