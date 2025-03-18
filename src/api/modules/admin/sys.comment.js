import request from '@/utils/request'
import axios from 'axios'
import util from '@/libs/util'

/**
 * @description 获取评论列表
 * @param {Object} data
 */
export function GetCommentlist (params) {
  return request({
    url: 'http://127.0.0.1:4523/m1/1724263-0-default/admin/commentlist',
    method: 'GET',
    data: params,
    headers: { Authorization: util.cookies.get('token') }
  })
}

/**
 * @description 搜索评论
 * @param {Object} data
 */
export function SearchComment (params) {
  return request({
    url: 'http://127.0.0.1:4523/m1/1724263-0-default/admin/searchcomment',
    method: 'GET',
    data: params,
    headers: { Authorization: util.cookies.get('token') }
  })
}

/**
 * @description 删除评论
 * @param {Object} data
 */
export function DeleteComment (params) {
  return request({
    url: 'http://127.0.0.1:4523/m1/1724263-0-default/admin/deletecomment',
    method: 'POST',
    data: params,
    headers: { Authorization: util.cookies.get('token') }
  })
}

/**
 * @description 处理被举报评论
 * @param {Object} data
 */
export function HandleReportCom (params) {
  return request({
    url: '/admin/handleReportCom',
    method: 'POST',
    data: params,
    headers: { Authorization: util.cookies.get('token') }
  })
}

/**
 * @description 获取被举报评论列表
 * @param {Object} data
 */
export function ReportComList (params) {
  return request({
    url: '/admin/ReportComList',
    method: 'GET',
    data: params,
    headers: { Authorization: util.cookies.get('token') }
  })
}
