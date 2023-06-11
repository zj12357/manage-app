import { acceptHMRUpdate, defineStore } from 'pinia'
import { getStorage, setStorage } from '~/utils/storage'

export const useCommonStore = defineStore('commmon', {
  state: () => ({
    config: getStorage('config') || {},
  }),
  actions: {
    setConfig(value: any) {
      this.config = value
      setStorage('config', value)
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useCommonStore as any, import.meta.hot),
  )
}
