import request from '@/utils/request'
import axios from 'axios'
import util from '@/libs/util'

/* 设置高德api的权限，key */
const config_params1 = {
  key: '43bb2fcbc4da320563c7729d124a4e3e',
  keywords: '景点',
  citylimits: true,
  types: '110000',
  extensions: 'all'
}
const config_params2 = {
  key: '43bb2fcbc4da320563c7729d124a4e3e',
  keywords: '美食',
  // citylimits: true,
  types: '050000',
  sortrule: 'weight',
  radius: '10000',
  extensions: 'all'
}
const config_params3 = {
  key: '43bb2fcbc4da320563c7729d124a4e3e',
  keywords: '住宿',
  // citylimits: true,
  types: '100000',
  sortrule: 'weight',
  radius: '10000',
  extensions: 'all'
}
/* 设置万维景源api权限 */
const config_wanwei = {
  showapi_appid: '1210573',
  showapi_sign: '7ef28869875a4b2aaf01f6855e9b7900',
}
/* 高德api地址 */
const placesApi = 'https://restapi.amap.com/v3/place/text'
const eatingApi = 'https://restapi.amap.com/v3/place/around'
const livingApi = 'https://restapi.amap.com/v3/place/around'
/**
 * @description 获取景点信息
 * @param {Object} data
 */
export function GetplaceIntro (params) {
  return request({
    url: '/user/placeIntro',
    method: 'GET',
    params: params,
    headers: { Authorization: util.cookies.get('token') }
  })
}
/* 提交行程信息 */
export function SubmitPath (params) {
  return request({
    url: '/user/submitPath',
    method: 'POST',
    data: params,
    headers: { Authorization: util.cookies.get('token') }
  })
}
/* 根据城市名称获得该城市内的各个景点信息 */
export function PlacesList (params) {
  return request({
    url: placesApi,
    method: 'GET',
    params: { ...config_params1, ...params}
  })
}
/* 根据城市名称获得该城市内的各个餐饮信息 */
export function EatingList (params) {
  return request({
    url: eatingApi,
    method: 'GET',
    params: { ...config_params2, ...params}
  })
}
/* 根据城市名称获得该城市内的各个景点信息 */
export function LivingList (params) {
  return request({
    url: livingApi,
    method: 'GET',
    params: { ...config_params3, ...params}
  })
}
/* 判断所选择城市是否存在 */
export function InitPlaces (params) {
  return request({
    url: placesApi,
    method: 'GET',
    params: { ...config_params1, page: 1, offset: 5, ...params}
  })
}
/* 用户记录餐饮信息 */
export function SubmitEating (params) {
  return request({
    url: '/user/foodInfo',
    method: 'POST',
    data: params,
    headers: { Authorization: util.cookies.get('token') }
  })
}
/* 用户记录住宿信息 */
export function SubmitLiving (params) {
  return request({
    url: '/user/boardInfo',
    method: 'POST',
    data: params,
    headers: { Authorization: util.cookies.get('token') }
  })
}
/* 用户获得所有行程信息 */
export function GetPaths (params) {
  return request({
    url: '/user/pathInfo',
    method: 'GET',
    params: params,
    headers: { Authorization: util.cookies.get('token') }
  })
}
/* 用户获得推荐住宿与美食 */
export function GetSuggest (params) {
  return request({
    url: '/user/suggestInfo',
    method: 'GET',
    params: params,
    headers: { Authorization: util.cookies.get('token') }
  })
}
