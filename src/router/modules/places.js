import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/places',
  name: 'places',
  meta,
  redirect: { name: 'places-list' },
  component: layoutHeaderAside,
  children: [
    { path: 'list', name: 'places-list', component: _import('system/places/place'), meta: { ...meta, title: '景点列表', Auth: 'user' } },
    { path: 'eating', name: 'eating', component: _import('system/eating/eating'), meta: { ...meta, title: '餐饮列表', Auth: 'user' } },
    { path: 'living', name: 'living', component: _import('system/living/living'), meta: { ...meta, title: '住宿酒店', Auth: 'user' } }
  ]
}
