import { deffHttp } from '~/utils/axios'

// 后面补类型
enum Api {
  APP_REGISTER = '/api/register', // 注册
  APP_LOGIN = '/api/login', // 登录
  APP_LOGIN_OUT = '/api/logout', // 登出

}

export function userRegister(params: any) {
  return deffHttp.post(
    { url: Api.APP_REGISTER, data: params },
    { errorMessageMode: 'message', withToken: false },
  )
}

export function userLogin(params: any) {
  return deffHttp.post(
    { url: Api.APP_LOGIN, data: params },
    { errorMessageMode: 'message', withToken: false },
  )
}

export function userLoginOut(params: any) {
  return deffHttp.post(
    { url: Api.APP_LOGIN_OUT, data: params },
    { errorMessageMode: 'message', withToken: false },
  )
}
