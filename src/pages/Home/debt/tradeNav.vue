<script setup lang="ts">
import ljcr from '~/assets/images/icons/icon_ljcr.png'
import wysh from '~/assets/images/icons/icon_wysh.png'
import wyjy from '~/assets/images/icons/icon_wyjy.png'
import wyzb from '~/assets/images/icons/icon_wyzb.png'

const router = useRouter()
const navList = [
  {
    name: '立即存入',
    path: '/my/deposit',
    icon: ljcr,

  },
  {
    name: '我要赎回',
    path: '/my/withdraw',
    icon: wysh,

  },

  {
    name: '我要交易',
    path: '/my/tradeRecord',
    icon: wyjy,

  },
  {
    name: '我的账变',
    path: '/my/ledgerRecord',
    icon: wyzb,

  },
]

function toPage(path: string) {
  router.push(path)
}
</script>

<template>
  <div class="mt-[30px] flex-between-center px-[20px]">
    <div v-for="(item, index) in navList" :key="index" class="flex-col-center" @click="toPage(item.path)">
      <img :src="item.icon" alt="" class="mb-[8px] w-[42px]" />
      <span class="text-base font-600 text-white">{{ item.name }}</span>
    </div>
  </div>
</template>

<style scoped>

</style>
