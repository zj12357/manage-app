<script setup lang="ts">
import bankCard from '~/assets/images/icons/icon_bank_card.png'
import numberCard from '~/assets/images/icons/icon_number_card.png'

const router = useRouter()
const cardNavList = [
  {
    icon: bankCard,
    cardName: '银联存入',
    des: '单笔 100 - 1,000,000',
    path: '/my/deposit/bank',
  },
  {
    icon: numberCard,
    cardName: '数字货币存入',
    des: '单笔 100 - 1,000,000',
    path: '/my/deposit/number',
  },
]

function toPage(path: string) {
  router.push(path)
}
</script>

<template>
  <div class="w-full">
    <NavBar title="存入方式" />
    <div class="w-full flex-col-center px-[20px] pt-[10px]">
      <div
        v-for="(item, index) in cardNavList"
        :key="index"
        class="mb-[20px] h-[84px] w-full flex-between-center rounded-[8px] bg-white p-[10px] shadow-base"
        @click="toPage(item.path)"
      >
        <img :src="item.icon" alt="" class="w-[60px]" />
        <div class="mx-[6px] h-full flex-col-center-start flex-1">
          <span class="mb-[8px] text-md">{{ item.cardName }}</span>
          <span class="text-md text-assist8">{{ item.des }}</span>
        </div>
        <div i-carbon-chevron-right class="text-lg text-assist8"></div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<route lang="yaml">
meta:
  layout: user
</route>
