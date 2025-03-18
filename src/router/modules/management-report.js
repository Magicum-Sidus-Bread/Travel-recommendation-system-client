import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/management-report',
  name: 'management-report',
  meta,
  redirect: { name: 'report-management' },
  component: layoutHeaderAside,
  children: [
    { path: 'reportlist', name: 'report-management', component: _import('system/report/report_management'), meta: { ...meta, title: '举报评论列表', Auth: 'admin' } }
  ]
}
