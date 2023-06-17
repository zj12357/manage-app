import { acceptHMRUpdate, defineStore } from 'pinia'
import { getStorage, setStorage } from '~/utils/storage'

export const useCommonStore = defineStore('commmon', {
  state: () => ({
    config: getStorage('config') || {},
    initLoad: getStorage('initLoad') || false,
  }),
  actions: {
    setConfig(value: any) {
      this.config = value
      setStorage('config', value)
    },
    setInitLoad(value: boolean) {
      this.initLoad = value
      setStorage('initLoad', value)
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useCommonStore as any, import.meta.hot),
  )
}
