import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/pathplanning',
  name: 'pathplanning',
  meta,
  redirect: { name: 'placeinput' },
  component: layoutHeaderAside,
  children: [
    { path: 'placeinput', name: 'placeinput', component: _import('system/pathplanning/placeinput'), meta: { ...meta, title: '路径规划', Auth: 'user' } },
    { path: 'place', name: 'placeplanning', component: _import('system/pathplanning/placeintroduction'), meta: { ...meta, title: '目的景点', Auth: 'user' } },
    { path: 'sum', name: 'sum', component: _import('system/pathplanning/pathsum'), meta: { ...meta, title: '路径总览', Auth: 'user' } },,
    { path: 'eating', name: 'eatingplanning', component: _import('system/pathplanning/eatingintroduction'), meta: { ...meta, title: '景点餐饮', Auth: 'user' } },
    { path: 'living', name: 'livingplanning', component: _import('system/pathplanning/livingintroduction'), meta: { ...meta, title: '景点住宿', Auth: 'user' } }
  ]
}
