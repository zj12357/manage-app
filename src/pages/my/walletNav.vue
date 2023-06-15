<script setup lang="ts">
import cr from '~/assets/images/icons/icon_user_cr.png'
import sh from '~/assets/images/icons/icon_user_sh.png'
import jy from '~/assets/images/icons/icon_user_jy.png'
import zb from '~/assets/images/icons/icon_user_zb.png'

const router = useRouter()
const navList = [
  {
    name: '存入',
    path: '/my/deposit',
    icon: cr,

  },
  {
    name: '赎回',
    path: '/my/withdraw',
    icon: sh,

  },

  {
    name: '交易',
    path: '/my/tradeRecord',
    icon: jy,

  },
  {
    name: '账变',
    path: '/my/ledgerRecord',
    icon: zb,

  },
]

function toPage(path: string) {
  router.push(path)
}
</script>

<template>
  <div class="absolute left-0 right-0 top-[-50px] h-[120px] w-full flex-center p-[20px]">
    <div class="h-[120px] w-full flex-between-center rounded-[16px] bg-white px-[10px] shadow-base">
      <div v-for="(item, index) in navList" :key="index" class="flex-col-center" @click="toPage(item.path)">
        <img :src="item.icon" alt="" class="mb-[4px] w-[60px]" />
        <span class="font-600 text-assist3">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
