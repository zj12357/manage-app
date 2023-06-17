/**
 * @description:  token处理;
 */
import { getStorage, removeStorage, setStorage } from '~/utils/storage'

const tokenKey = 'token'

export const userToken = Object.freeze({
  clearToken: () => {
    removeStorage(tokenKey)
  },
  setToken: (data: string) => {
    setStorage(tokenKey, data)
  },
  getToken: () => {
    return getStorage(tokenKey)
  },
})
