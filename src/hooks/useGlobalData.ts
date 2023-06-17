export function useGlobalData() {
  const common = useCommonStore()
  const user = useUserStore()
  async function fetchGlobalUserInfo() {
    const res = await getUserInfo()
    if (res.code === 200)
      user.setUserInfo(res.data)
    user.setUserBalance(res.data.balance)
  }

  async function fetchGlobalConfigs() {
    const res = await getConfigs()
    if (res.code === 200)
      common.setConfig(res.data)
  }

  return {
    fetchGlobalUserInfo,
    fetchGlobalConfigs,
  }
}
