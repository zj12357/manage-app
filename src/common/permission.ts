// 全局路由拦截

const whiteList = ['/', '/auth/login', '/auth/register', '/404', '/home/news/detail']
export function routeInterception(routerList: any[], to: any, from: any, next: any) {
  console.log(to)
  // if (routerList.every(item => item.path !== to.path))
  //   next('/404')

  if (!userToken.getToken() && !whiteList.includes(to.path))
    next('/auth/login')

  else next()
}
