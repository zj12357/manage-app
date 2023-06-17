import { deffHttp } from '~/utils/axios'

// 后面补类型
enum Api {
  APP_REGISTER = '/api/register', // 注册
  APP_LOGIN = '/api/login', // 登录
  APP_LOGIN_OUT = '/api/logout', // 登出
  APP_GET_USERINFO = '/api/userInfo', // 获取用户信息
  APP_GET_BALANCE = '/api/balance', // 获取用户余额
  APP_UPDATE_USERINFO = '/api/updateUserInfo', // 更新用户信息
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

export function getUserInfo() {
  return deffHttp.post(
    { url: Api.APP_GET_USERINFO },
    { errorMessageMode: 'message', withToken: true },
  )
}

export function getUserBalance() {
  return deffHttp.post(
    { url: Api.APP_GET_BALANCE },
    { errorMessageMode: 'message', withToken: true },
  )
}

export function updateUserInfo(params: any) {
  return deffHttp.post(
    { url: Api.APP_UPDATE_USERINFO, data: params },
    { errorMessageMode: 'message', withToken: true },
  )
}
