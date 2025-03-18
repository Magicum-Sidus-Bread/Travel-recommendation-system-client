import axios from 'axios'
import { startLoading, closeLoading } from './loading.js'

// ref:https://juejin.cn/post/7030695217409818638
const instance = axios.create({
  baseURL: 'http://192.168.1.107:8080',
  timeout: 4000
})

// request 拦截
instance.interceptors.request.use(
  function (config) {
    startLoading()
    // 可以在此添加 token
    return config
  },
  function (error) {
    // 拦截错误
    return Promise.reject(error)
  }
)

// response 拦截
instance.interceptors.response.use(
  (response) => {
    closeLoading()
    // 添加其他条件, 比如置全局的loading为false
    return response.data
  },
  function (error) {
    // 拦截错误
    return Promise.reject(error)
  }
)

export default instance
