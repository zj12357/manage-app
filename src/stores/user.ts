import { acceptHMRUpdate, defineStore } from 'pinia'
import { getStorage, setStorage } from '~/utils/storage'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: getStorage('userInfo') || {},
    balance: 0,
  }),
  actions: {
    setUserInfo(value: any) {
      this.userInfo = value
      setStorage('userInfo', value)
    },
    setUserBalance(value: number) {
      this.balance = value
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot))
