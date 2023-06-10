import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import path from 'path'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // get user info
          // note: roles must be an object array! such as: ['admin'] or ,['developer','editor']
          const { id, roles } = await store.dispatch('user/getInfo')
          const userinfo = { id: id, roles: roles }
          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', userinfo)
          // console.debug(accessRoutes)
          // if (accessRoutes.length === 0) {
          //   Message.error('无权限访问')
          //   next(`/login?redirect=${to.path}`)
          //   NProgress.done()
          // }
          if ('children' in accessRoutes[0] && accessRoutes[0].children.length > 0 && accessRoutes[0].path !== accessRoutes[0].children[0].path) {
            accessRoutes.push({ path: '/', redirect: path.join(accessRoutes[0].path, accessRoutes[0].children[0].path), hidden: true })
          } else {
            accessRoutes.push({ path: '/', redirect: accessRoutes[0].path, hidden: true })
          }
          accessRoutes.push({ path: '*', redirect: '/404', hidden: true })
          // dynamically add accessible routes
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.fullPath}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // console.debug(to)
      // other pages that do not have permission to access are redirected to the login page.
      if (to.fullPath === '/') {
        // if is logged in, redirect to the home page which is decided by login page
        next('/login')
      } else {
        next(`/login?redirect=${to.fullPath}`)
      }
      // next(`/login?redirect=${to.fullPath}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
