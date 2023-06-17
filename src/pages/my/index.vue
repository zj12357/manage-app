<script setup lang="ts">
import info from './info.vue'
import walletNav from './walletNav.vue'
import oftenNav from './oftenNav.vue'

const { fetchGlobalUserInfo } = useGlobalData()
const user = useUserStore()
const time = ref()
async function fetchGetUserBalance() {
  time.value = setInterval(async () => {
    const res = await getUserBalance()
    if (res.code === 200)
      user.setUserBalance(res.data.balance)
  }, 5000)
}

onMounted(() => {
  userToken.getToken() && fetchGlobalUserInfo()
  fetchGetUserBalance()
})
onUnmounted(() => {
  clearInterval(time.value)
})
</script>

<template>
  <div>
    <info />
    <div class="relative w-full p-[20px]">
      <walletNav />
      <oftenNav />
    </div>
  </div>
</template>

<style scoped></style>
