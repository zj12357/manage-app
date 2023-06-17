import { deffHttp } from '~/utils/axios'

// 后面补类型
enum Api {
  APP_REGISTER = '/api/register', // 注册
  APP_LOGIN = '/api/login', // 登录
  APP_LOGIN_OUT = '/api/logout', // 登出
  APP_GET_USERINFO = '/api/userInfo', // 获取用户信息
  APP_GET_BALANCE = '/api/balance', // 获取用户余额
  APP_UPDATE_USERINFO = '/api/updateUserInfo', // 更新用户信息
  APP_UPDATE_PASSWORD = '/api/updatePassword', // 更新用户登录密码
  APP_UPDATE_TRADEPASSWORD = '/api/updateTradePassword', // 更新资金密码接口
  APP_ADD_TRADEPASSWORD = '/api/addTradePassword', // 设置资金密码接口
  APP_ADD_WALLET = '/api/addWallet', // 绑定USDT钱包
  APP_GET_WALLET = '/api/wallets', // 获取数字钱包
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

export function userLoginOut() {
  return deffHttp.post(
    { url: Api.APP_LOGIN_OUT },
    { errorMessageMode: 'message', withToken: true },
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

export function updatePassword(params: any) {
  return deffHttp.post(
    { url: Api.APP_UPDATE_PASSWORD, data: params },
    { errorMessageMode: 'message', withToken: true },
  )
}

export function updateTradePassword(params: any) {
  return deffHttp.post(
    { url: Api.APP_UPDATE_TRADEPASSWORD, data: params },
    { errorMessageMode: 'message', withToken: true },
  )
}

export function addTradePassword(params: any) {
  return deffHttp.post(
    { url: Api.APP_ADD_TRADEPASSWORD, data: params },
    { errorMessageMode: 'message', withToken: true },
  )
}

export function addWallet(params: any) {
  return deffHttp.post(
    { url: Api.APP_ADD_WALLET, data: params },
    { errorMessageMode: 'message', withToken: true },
  )
}

export function getWallet(params: any) {
  return deffHttp.post(
    { url: Api.APP_GET_WALLET, data: params },
    { errorMessageMode: 'message', withToken: true },
  )
}