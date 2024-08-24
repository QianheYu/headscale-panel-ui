import { constantRoutes } from '@/router'
import { getUserMenuTreeByUserId } from '@/api/system/menu'
import Layout from '@/layout'
// eslint-disable-next-line no-unused-vars
var deep = 1
// var varRoutes = constantRoutes

export const loadComponent = (component) => {
  if (component === '' || component === 'Layout') {
    // 组件不存在使用默认布局
    return Layout
  }
  // 动态获取组件
  return (resolve) => require([`@/views${component}`], resolve)
}

// var rootRoute = {
//   path: '/',
//   // name: menu.name,
//   component: loadComponent('Layout'),
//   // hidden: 1,
//   redirect: '',
//   alwaysShow: 1,
//   children: []
// }
export const getRoutesFromMenuTree = (menuTree) => {
  const routes = []
  menuTree.forEach(menu => {
    if (menu.children && menu.children.length > 0) {
      deep++
      menu.children = getRoutesFromMenuTree(menu.children)
      deep--
    }
    // else if (deep === 1) {
    //   // 这里需要清理children, 否则右侧会显示下拉图标
    //   // delete menu.children
    //   // 需要处理没有children 的根菜单
    //   if (menu.component !== Layout) {
    //     varRoutes[0].children.push({
    //       path: menu.path,
    //       name: menu.name,
    //       component: () => import('@/views/' + menu.component),
    //       meta: { title: menu.title, icon: menu.icon, affix: true }
    //     })
    //     // rootRoute.children.push({
    //     //   path: menu.path,
    //     //   name: menu.name,
    //     //   component: loadComponent(menu.component),
    //     //   hidden: menu.hidden === 1,
    //     //   redirect: menu.redirect,
    //     //   alwaysShow: menu.alwaysShow === 1,
    //     //   children: menu.children,
    //     //   meta: {
    //     //     name: menu.name,
    //     //     title: menu.title,
    //     //     icon: menu.icon,
    //     //     noCache: menu.noCache === 1,
    //     //     breadcrumb: menu.breadcrumb === 1,
    //     //     activeMenu: menu.activeMenu,
    //     //     requiresLayout: menu.children.length === 0
    //     //   }
    //     // })
    //     return
    //   }
    // }
    routes.push({
      path: menu.path,
      name: menu.name,
      component: loadComponent(menu.component),
      hidden: menu.hidden === 1,
      redirect: menu.redirect,
      alwaysShow: menu.alwaysShow === 1,
      children: menu.children,
      meta: {
        name: menu.name,
        title: menu.title,
        icon: menu.icon,
        noCache: menu.noCache === 1,
        breadcrumb: menu.breadcrumb === 1,
        activeMenu: menu.activeMenu,
        requiresLayout: menu.children.length === 0
      }
    })
  })
  // if (deep === 1 && routes[0].children.length === 0) {
  //   if (routes[1].redirect !== routes[1].children[0].path) {
  //     routes[0].redirect = routes[1].children[0].path
  //   } else {
  //     routes[0].redirect = routes[1].path
  //   }
  // }
  return routes
}

const state = {
  routes: [],
  addRoutes: [],
  home: ''
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
    // state.routes = varRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, userinfo) {
    return new Promise((resolve, reject) => {
      let accessedRoutes = []
      // 获取菜单树
      getUserMenuTreeByUserId(userinfo.id).then(res => {
        const { data } = res
        const menuTree = data.menuTree
        accessedRoutes = getRoutesFromMenuTree(menuTree)
        // varRoutes[0].redirect = 'children' in varRoutes[0] ? '/' + varRoutes[0].children[0].path : varRoutes[0].path
        // // accessedRoutes.push(rootRoute)
        // console.debug(JSON.stringify(varRoutes[0]))
        // console.debug(JSON.stringify(varRoutes[1]))
        // console.debug(varRoutes)
        // console.debug(accessedRoutes)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
