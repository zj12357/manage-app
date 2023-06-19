<script setup lang="ts">
// import yhk from '~/assets/images/icons/icon_yhk.png'
import icon_dq from '~/assets/images/icons/icon_dq.png'
import icon_yhk from '~/assets/images/icons/icon_yhk.png'
import icon_appxz from '~/assets/images/icons/icon_appxz.png'
import icon_kf from '~/assets/images/icons/icon_kf.png'

const { toNewWindow } = useNewWindow()
const common = useCommonStore()
const router = useRouter()
const navList = [
  // {
  //   name: '银行卡',
  //   path: '/my/userCenter/payCard',
  //   icon: yhk,
  //   type: 'route',

  // },
  {
    name: '定期',
    path: '/deposit',
    icon: icon_dq,
    type: 'route',
  },

  {
    name: '钱包管理',
    path: '/my/userCenter/payCard',
    icon: icon_yhk,
    type: 'route',
  },
  {
    name: 'APP下載',
    path: isIOS() ? common.config.ios_download_link : common.config.android_download_link,
    icon: icon_appxz,
    type: 'link',
  },
  {
    name: '客服',
    path: common.config.kefu_link,
    icon: icon_kf,
    type: 'link',
  },
]

function toPage(type: string, path: string) {
  if (type === 'route')
    router.push(path)
  else if (type === 'link')
    toNewWindow(path)
}
</script>

<template>
  <div class="flex-between-center bg-white p-[20px]">
    <div v-for="(item, index) in navList" :key="index" class="flex-col-center" @click="toPage(item.type, item.path)">
      <img :src="item.icon" alt="" class="mb-[8px] w-[42px]" />
      <span class="text-base font-600 text-assist3">{{ item.name }}</span>
    </div>
  </div>
</template>

<style scoped></style>
