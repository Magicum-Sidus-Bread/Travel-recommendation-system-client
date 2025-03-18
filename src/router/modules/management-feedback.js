import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/management-feedback',
  name: 'management-feedback',
  meta,
  redirect: { name: 'feedback-management' },
  component: layoutHeaderAside,
  children: [
    { path: 'feedbacklist', name: 'feedback-management', component: _import('system/feedback/feedback_admin'), meta: { ...meta, title: '反馈管理', Auth: 'admin' } }
  ]
}
