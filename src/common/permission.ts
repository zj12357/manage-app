// 全局路由拦截
import userToken from './token'

const whiteList = ['/', '/auth/login', '/auth/register', '/404']
export function routeInterception(routerList: any[], to: any, from: any, next: any) {
  console.log(routerList.every(item => item.path !== to.path), to.path)
  if (routerList.every(item => item.path !== to.path))
    next('/404')

  if (!userToken.getToken() && !whiteList.includes(to.path))
    next('/auth/login')

  else next()
}
