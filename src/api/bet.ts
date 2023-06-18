import { deffHttp } from '~/utils/axios'

// 后面补类型
enum Api {
  APP_GET_ROOMS = '/api/rooms', // 公共配置
}

export function getRooms() {
  return deffHttp.post(
    { url: Api.APP_GET_ROOMS },
    { errorMessageMode: 'message', withToken: false },
  )
}
