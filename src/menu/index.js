import { uniqueId } from 'lodash'

// 插件
import demoPlugins from './modules/demo-plugins'
// 组件
import demoComponents from './modules/demo-components'
// 功能
import demoPlayground from './modules/demo-playground'
import personal from './modules/personal'
import places from './modules/places'
import feedback from './modules/feedback'
import pathplanning from './modules/pathplanning'
// eslint-disable-next-line camelcase
import user_management from './modules/user_management'
// eslint-disable-next-line camelcase
import feedback_management from './modules/feedback_management'
// eslint-disable-next-line camelcase
import report_management from './modules/report_management'

import util from '@/libs/util'

let menuH = []
let menuA = []

/**
 * @description 给菜单数据补充上 path 字段
 * @description https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
function supplementPath (menu) {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId('d2-menu-empty-'),
    ...e.children ? {
      children: supplementPath(e.children)
    } : {}
  }))
}

export default function getHeadMenu () {
  return new Promise((resolve, reject) => {
    if (util.cookies.get('role') == 'admin') {
      // console.log('我选择了admin')
      menuH = [
        {
          path: '/index',
          title: '首页',
          icon: 'home'
        },
        // demoPlayground,
        // demoComponents,
        // demoPlugins,

        // eslint-disable-next-line camelcase
        user_management,
        // eslint-disable-next-line camelcase
        feedback_management,
        // eslint-disable-next-line camelcase
        report_management
      ]
    } else {
      // console.log('我选择了user')
      menuH = [
        {
          path: '/index',
          title: '首页',
          icon: 'home'
        },
        // demoPlayground,
        // demoComponents,
        // demoPlugins,
        places,
        pathplanning,
        personal,
        feedback
      ]
    }

    const menuHeader = supplementPath(menuH)
    resolve(menuHeader)
  })
}

// 菜单 顶栏
// if (util.cookies.get('role') == 'admin') {
//   console.log('我选择了admin')
//   menuH = [
//     {
//       path: '/index',
//       title: '首页',
//       icon: 'home'
//     },
//     // demoPlayground,
//     // demoComponents,
//     // demoPlugins,
//
//     // eslint-disable-next-line camelcase
//     user_management,
//     // eslint-disable-next-line camelcase
//     feedback_management,
//     // eslint-disable-next-line camelcase
//     report_management
//   ]
// } else {
//   console.log('我选择了user')
//   menuH = [
//     {
//       path: '/index',
//       title: '首页',
//       icon: 'home'
//     },
//     // demoPlayground,
//     // demoComponents,
//     // demoPlugins,
//     places,
//     pathplanning,
//     personal,
//     feedback
//   ]
// }
//
// export const menuHeader = supplementPath(menuH)

// 菜单 侧栏
if (util.cookies.get('role') == 'admin') {
  menuA = [
    {
      path: '/index',
      title: '首页',
      icon: 'home'
    },
    // demoPlayground,
    // demoComponents,
    // demoPlugins,

    // eslint-disable-next-line camelcase
    user_management,
    // eslint-disable-next-line camelcase
    feedback_management,
    // eslint-disable-next-line camelcase
    report_management
  ]
} else {
  menuA = [
    {
      path: '/index',
      title: '首页',
      icon: 'home'
    },
    // demoPlayground,
    // demoComponents,
    // demoPlugins,
    places,
    pathplanning,
    personal,
    feedback
  ]
}

export const menuAside = supplementPath(menuA)

// 菜单 顶栏
// export const menuHeader = supplementPath([
//   {
//     path: '/index',
//     title: '首页',
//     icon: 'home'
//   },
//   // demoPlayground,
//   // demoComponents,
//   // demoPlugins,
//   places,
//   personal,
//   // eslint-disable-next-line camelcase
//   user_management,
//   pathplanning
// ])

// 菜单 侧边栏
// export const menuAside = supplementPath([
//   {
//     path: '/index',
//     title: '首页',
//     icon: 'home'
//   },
//   // demoComponents,
//   // demoPlugins,
//   // demoPlayground,
//   places,
//   personal,
//   // eslint-disable-next-line camelcase
//   user_management,
//   pathplanning
// ])
