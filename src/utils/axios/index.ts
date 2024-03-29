import { showFailToast } from 'vant'
import type { AxiosInterceptor, CreateAxiosOptions } from './axiosConfig'
import { iAxios } from './iAxios'
import { checkStatus } from './axiosStatus'
import { errorData } from './errorConfig'
import { isString } from '~/utils/tools'
import { ContentTypeEnum } from '~/enums/httpEnum'

/**
 * @description:一下所有拦截器请根据自身使用场景更改
 */
const interceptor: AxiosInterceptor = {
  /**
     * @description: 处理请求数据。如果数据不是预期格式，可直接抛出错误
     */
  requestHook: (res, options) => {
    /**
         * 此处方法是对请求回来的数据进行处理，
         * 根据自己的使用场景更改
         */
    const { data } = res
    const { errorMessageMode } = options
    if (data) {
      if (data.code !== 200) {
        if (errorMessageMode === 'modal')
          showFailToast(data.msg)

        else if (errorMessageMode === 'message')
          showFailToast(data.msg)

        if (data.code === 8888) {
          userToken.clearToken()
          window.location.href = '/'
        }

        return errorData(res)
      }
      else {
        return data
      }
    }
    return data
  },

  /**
     * @description: 请求失败的错误处理
     */
  requestCatchHook: (e, _options) => {
    return Promise.reject(e)
  },

  /**
     * @description: 请求之前处理config
     */
  beforeRequestHook: (config, options) => {
    const { urlPrefix } = options
    if (urlPrefix && isString(urlPrefix))
      config.url = `${urlPrefix}${config.url}`
    return config
  },

  /**
     * @description: 请求拦截器处理
     */
  requestInterceptors: (config) => {
    const { requestOptions } = config
    if (requestOptions?.withToken) {
      (config as Recordable).headers.token = userToken.getToken()
      if (requestOptions?.specialToken) {
        (config as Recordable).headers.token
                    = requestOptions?.specialToken
      }
    }

    return config
  },

  /**
     * @description: 请求拦截器错误处理
     */
  requestInterceptorsCatch: (error) => {
    return error
  },

  /**
     * @description: 响应拦截器处理
     */
  responseInterceptors: (res) => {
    return res
  },

  /**
     * @description: 响应拦截器错误处理
     */
  responseInterceptorsCatch: (error: any) => {
    const { response, config } = error || {}
    const errorMessageMode
            = config.requestOptions.errorMessageMode || 'none'
    checkStatus(response ? response.status : 404, errorMessageMode)
    if (response?.status === 401) {
      userToken.clearToken()
      window.location.href = '/'
    }
    return error
  },
}

function createAxios(options?: Partial<CreateAxiosOptions>) {
  // eslint-disable-next-line new-cap
  return new iAxios({
    ...{
      baseURL: API_URL,
      // 请求时间
      timeout: 10 * 1000,
      // (拦截器)数据处理方式
      interceptor,
      headers: { 'Content-Type': ContentTypeEnum.JSON },
      // 配置项（需要在拦截器中做的处理），下面的选项都可以在独立的接口请求中覆盖
      requestOptions: {
        withToken: true,
        errorMessageMode: 'message',
      },
    },
    ...(options || {}),
  })
}
export const deffHttp = createAxios()
