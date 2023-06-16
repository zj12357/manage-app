<script setup lang="ts">
import dlmm from '~/assets/images/icons/icon_user_dlmm.png'
import zfmm from '~/assets/images/icons/icon_user_zfmm.png'
import kpgl from '~/assets/images/icons/icon_user_kpgl.png'
import jyjl from '~/assets/images/icons/icon_user_jyjl.png'
import crjl from '~/assets/images/icons/icon_user_crjl.png'
import zbjl from '~/assets/images/icons/icon_user_zbjl.png'
import dqjl from '~/assets/images/icons/icon_user_dqjl.png'

const router = useRouter()
const navList = [
  {
    name: '登录密码',
    path: '/my/userCenter/loginPassword',
    icon: dlmm,

  },
  {
    name: '支付密码',
    path: '/my/userCenter/tradePassword',
    icon: zfmm,

  },

  {
    name: '卡片管理',
    path: '/my/userCenter/payCard',
    icon: kpgl,

  },
  {
    name: '交易记录',
    path: '/my/tradeRecord',
    icon: jyjl,

  },
  {
    name: '存入记录',
    path: '/my/rechargeRecord',
    icon: crjl,

  },

  {
    name: '账变记录',
    path: '/my/ledgerRecord',
    icon: zbjl,

  },
  {
    name: '定期记录',
    path: '/my/terminalRecord',
    icon: dqjl,

  },
]

function toPage(path: string) {
  router.push(path)
}
</script>

<template>
  <div class="mt-[65px] w-full rounded-[16px] bg-white shadow-base">
    <div class="w-full flex-start-center p-[20px]">
      <div class="mr-[4px] h-[16px] w-[5px] rounded-[5px] bg-primary"></div>
      <span class="text-lg font-500 text-assist6">常用功能</span>
    </div>
    <div class="mt-[8px] w-full flex-start-center-warp">
      <div v-for="(item, index) in navList" :key="index" class="mb-[18px] w-[25%] flex-col-center" @click="toPage(item.path)">
        <img :src="item.icon" alt="" class="mb-[8px] w-[48px]" />
        <span class="text-sm font-600 text-assist3">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
