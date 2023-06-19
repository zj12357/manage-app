import { deffHttp } from '~/utils/axios'

// 后面补类型
enum Api {
  APP_ROOMS = '/api/rooms', // 倉位列表
  APP_INVESTMENT = '/api/investment', // 定期
  APP_MOVE_IN = '/api/moveIn', // 转入
  APP_MOVE_RECORD = '/api/moveRecord',
  APP_ISSUES = '/api/issues',
  APP_PLAY_WAYS = '/api/play_ways',
  APP_BET = 'api/bet',
}

export function getRooms() {
  return deffHttp.post(
    { url: Api.APP_ROOMS },
    { errorMessageMode: 'message', withToken: false },
  )
}
export function getInvestMents() {
  return deffHttp.post(
    { url: Api.APP_INVESTMENT },
    { errorMessageMode: 'message', withToken: true },
  )
}
// 转入
export function depositIn(params: any) {
  return deffHttp.post(
    { url: Api.APP_MOVE_IN, data: params },
    { errorMessageMode: 'message', withToken: true },
  )
}
// 转出记录
export function getMoveRecord(params: any) {
  return deffHttp.post(
    { url: Api.APP_MOVE_RECORD, data: params },
    { errorMessageMode: 'message', withToken: true },
  )
}

// 仓详情
export function getIssues(params: any) {
  return deffHttp.post(
    { url: Api.APP_ISSUES, data: params },
    { errorMessageMode: 'message', withToken: true },
  )
}

// 玩法
export function getPlayWays(params: any) {
  return deffHttp.post(
    { url: Api.APP_PLAY_WAYS, data: params },
    { errorMessageMode: 'message', withToken: true },
  )
}
// 下單
export function submitBet(params: any) {
  return deffHttp.post(
    { url: Api.APP_BET, data: params },
    { errorMessageMode: 'message', withToken: true },
  )
}
