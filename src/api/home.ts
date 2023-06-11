import { deffHttp } from '~/utils/axios'

// 后面补类型
enum Api {
  APP_CAROUSELS = '/api/carousels', // 首页轮播图
}

export function getCarousels() {
  return deffHttp.post(
    { url: Api.APP_CAROUSELS },
    { errorMessageMode: 'message', withToken: false },
  )
}
