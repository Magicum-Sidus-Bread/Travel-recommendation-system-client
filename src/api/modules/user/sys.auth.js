import request from '@/utils/request'
import axios from 'axios'

/**
 * @description 注册
 * @param {Object} data
 */
export function Register (params) {
  return request({
    url: '/home/register',
    method: 'POST',
    data: params
  })
}

/**
 * @description 登录
 * @param {Object} data
 */
export function Login (params) {
  return request({
    url: '/home/login',
    method: 'POST',
    data: params
  })
}

/**
 * @description 发送邮箱验证码
 * @param {Object} data
 */
export function SendVc (params) {
  return request({
    url: '/home/sendVC',
    method: 'POST',
    data: params
  })
}

/**
 * @description 找回密码
 * @param {Object} data
 */
export function FindPasswd (params) {
  return request({
    url: '/home/findpasswd',
    method: 'POST',
    data: params
  })
}

/**
 * @description 账号解封申诉
 * @param {Object} data
 */
export function Complaint (params) {
  return request({
    url: '/home/complaint',
    method: 'POST',
    data: params
  })
}

// 待修改
/**
 * @description 判断图形验证码是否正确
 * @param {Object} data
 */
export function LoginVerificationCheck (params) {
  return axios({
    url: 'https://api.it120.cc/WHU/verification/pic/check?code=' + params.code + '&key=' + params.key,
    method: 'POST'
  })
}
