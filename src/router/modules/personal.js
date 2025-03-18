import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/personal',
  name: 'personal',
  meta,
  redirect: { name: 'personal-info' },
  component: layoutHeaderAside,
  children: [
    { path: 'info', name: 'personal-info', component: _import('system/personal/personal_info'), meta: { ...meta, title: '用户信息', Auth: 'user' } },
    { path: 'setting', name: 'personal-setting', component: _import('system/personal/personal_setting'), meta: { ...meta, title: '用户设置', Auth: 'user' } },
    { path: 'feedback', name: 'personal-feedback', component: _import('system/feedback/feedback_user'), meta: { ...meta, title: '用户反馈', Auth: 'user' } }
  ]
}
