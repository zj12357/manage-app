<script setup lang="ts">
import home from '~/assets/images/icons/icon_home.png'
import homeActive from '~/assets/images/icons/icon_home_active.png'
import market from '~/assets/images/icons/icon_market.png'
import marketActive from '~/assets/images/icons/icon_market_active.png'
import trade from '~/assets/images/icons/icon_trade.png'
import customer from '~/assets/images/icons/icon_customer.png'
import customerActive from '~/assets/images/icons/icon_customer_active.png'
import my from '~/assets/images/icons/icon_my.png'
import myActive from '~/assets/images/icons/icon_my_active.png'

const route = useRoute()
const router = useRouter()
const navList = [
  {
    name: '首页',
    path: '/',
    icon: home,
    activeIcon: homeActive,
  },
  {
    name: '行情',
    path: '/market',
    icon: market,
    activeIcon: marketActive,
  },
  {
    name: '',
    path: '/trade',
    icon: '',
    activeIcon: trade,
  },
  {
    name: '客服',
    path: '/customer',
    icon: customer,
    activeIcon: customerActive,
  },
  {
    name: '我的',
    path: '/my',
    icon: my,
    activeIcon: myActive,
  },
]
function toPage(path: string) {
  router.push(path)
}
</script>

<template>
  <div class="fixed bottom-0 left-0 right-0 z-[99] h-[54px] w-full bg-white">
    <div class="relative h-full w-full flex-between-center">
      <div v-for="(item, index) in navList" :key="index" class="flex-col-center" @click="toPage(item.path)">
        <div v-if="item.path !== '/trade'" class="h-full w-[80px] flex-col-center">
          <img :src="route.path === item.path ? item.activeIcon : item.icon" alt="" class="mb-[4px] w-[25px]" />
          <span :class="route.path === item.path ? 'text-primary' : 'assist1' ">{{ item.name }}</span>
        </div>
        <div v-else class="mx-[20px] flex-center">
          <div class="absolute top-[-15px] h-[60px] w-[60px] flex-center rounded-[50%] bg-white">
            <img :src="item.activeIcon" alt="" class="w-[45px]" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
