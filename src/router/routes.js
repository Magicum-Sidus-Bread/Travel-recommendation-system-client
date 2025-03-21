import playground from './modules/playground'
import plugins from './modules/plugins'
import components from './modules/components'
import personal from './modules/personal'
import places from './modules/places'
import managementFeedback from './modules/management-feedback'
import managementUser from './modules/management-user'
import managementReport from './modules/management-report'
import pathplanning from './modules/pathplanning'
import feedback from './modules/feedback'

import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页
      {
        path: 'index',
        name: 'index',
        meta: {
          title: '首页',
          auth: true
        },
        component: _import('system/index')
      },
      // 系统 前端日志
      {
        path: 'log',
        name: 'log',
        meta: {
          title: '前端日志',
          auth: true
        },
        component: _import('system/log')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: _import('system/function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: _import('system/function/redirect')
      }
    ]
  },
  playground,
  plugins,
  components,
  personal,
  places,
  pathplanning,
  feedback,
  managementUser,
  managementFeedback,
  managementReport
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/system/login/login')
  },
  // 注册
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/system/login/register')
  },
  // 密码找回
  {
    path: '/forget',
    name: 'forget',
    component: () => import('@/views/system/login/forget_password')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('system/error/404')
  },
  {
    path: '/unauth',
    name: 'unauth',
    component: _import('system/error/unauth')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
