import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/management-user',
  name: 'management-user',
  meta,
  redirect: { name: 'user-management' },
  component: layoutHeaderAside,
  children: [
    { path: 'userlist', name: 'user-management', component: _import('system/user_management/user_management'), meta: { ...meta, title: '用户管理', Auth: 'admin' } },
    { path: 'userAppeal', name: 'user-appeal', component: _import('system/user_management/user_appeal'), meta: { ...meta, title: '申诉处理', Auth: 'admin' } }
  ]
}
