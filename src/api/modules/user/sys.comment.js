import request from '@/utils/request'
import axios from 'axios'
import util from '@/libs/util'

/**
 * @description 获取评论列表
 * @param {Object} data
 */
export function GetCommentList (params) {
  return request({
    url: '/user/commentlist',
    method: 'GET',
    params: params,
    headers: { Authorization: util.cookies.get('token') }
  })
}

/**
 * @description 增加评论
 * @param {Object} data
 */
export function AddComment (params) {
  return request({
    url: '/user/AddComment',
    method: 'POST',
    data: params,
    headers: { Authorization: util.cookies.get('token') }
  })
}

/**
 * @description 点赞评论
 * @param {Object} data
 */
export function Thumbsup (params) {
  return request({
    url: '/user/thumbsup',
    method: 'POST',
    data: params,
    headers: { Authorization: util.cookies.get('token') }
  })
}

/**
 * @description 踩评论
 * @param {Object} data
 */
export function Thumbsdown (params) {
  return request({
    url: '/user/thumbsdown',
    method: 'POST',
    data: params,
    headers: { Authorization: util.cookies.get('token') }
  })
}

/**
 * @description 举报评论
 * @param {Object} data
 */
export function ReportComment (params) {
  return request({
    url: '/user/reportcomment',
    method: 'POST',
    data: params,
    headers: { Authorization: util.cookies.get('token') }
  })
}
