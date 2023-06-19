<script setup lang="ts">
import info from './info.vue'
import walletNav from './walletNav.vue'
import oftenNav from './oftenNav.vue'

const { fetchGlobalUserInfo, fetchGetUserBalance } = useGlobalData()
const time = ref()

async function getBalance() {
  time.value = setInterval(() => {
    fetchGetUserBalance()
  }, 3000)
}

onMounted(() => {
  userToken.getToken() && fetchGlobalUserInfo()
  getBalance()
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
