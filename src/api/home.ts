import { deffHttp } from '~/utils/axios'
import type { GetNewsParams } from '~/types/api/home'

// 后面补类型
enum Api {
  APP_CAROUSELS = '/api/carousels', // 首页轮播图
  APP_NOTICE = '/api/notice', // 首页公共
  APP_NEWS = '/api/news', // 首页资讯
  APP_NEWS_DETAIL = '/api/new', // 首页资讯详情
}

export function getCarousels() {
  return deffHttp.post(
    { url: Api.APP_CAROUSELS },
    { errorMessageMode: 'message', withToken: false },
  )
}

export function getNotice() {
  return deffHttp.post(
    { url: Api.APP_NOTICE },
    { errorMessageMode: 'message', withToken: false },
  )
}

export function getNews() {
  return deffHttp.post(
    { url: Api.APP_NEWS },
    { errorMessageMode: 'message', withToken: false },
  )
}

export function getNewsDetail(params: GetNewsParams) {
  return deffHttp.post(
    { url: Api.APP_NEWS_DETAIL, data: params },
    { errorMessageMode: 'message', withToken: false },
  )
}
