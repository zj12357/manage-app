import { deffHttp } from '~/utils/axios'

// 后面补类型
enum Api {
  APP_CONFIGS = '/api/configs', // 公共配置
}

export function getConfigs() {
  return deffHttp.post(
    { url: Api.APP_CONFIGS },
    { errorMessageMode: 'message', withToken: false },
  )
}
