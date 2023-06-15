<script setup lang="ts">
import binZs from '~/assets/images/icons/icon_bin_zs.png'

const state = reactive({
  orderValue: 1,
  statusValue: 1,
})
const router = useRouter()
const orderTypeList = [
  {
    label: '订单状态',
    value: 1,
  },
  {
    label: '订单日期',
    value: 2,
  },
]

const statusList = [
  {
    label: '全部',
    value: 1,
  },
  {
    label: '认购',
    value: 2,
  },
  {
    label: '存入',
    value: 3,
  },
  {
    label: '匹配成功',
    value: 4,
  },
  {
    label: '赎回',
    value: 5,
  },
  {
    label: '赎回退回',
    value: 6,
  },
  {
    label: '调整添加余额',
    value: 7,
  },
  {
    label: '礼金赠送',
    value: 8,
  },

  {
    label: '调整减少余额',
    value: 9,
  },
  {
    label: '定期转出',
    value: 10,
  },
  {
    label: '数字钱包',
    value: 11,
  },
]

function toPage(path: string) {
  router.push(path)
}

function changeOrderType(type: number) {
  state.orderValue = type
}
function changeStatusType(type: number) {
  state.statusValue = type
}
</script>

<template>
  <div class="w-full">
    <NavBar title="账变记录" />

    <div class="w-full bg-white p-[20px]">
      <div class="flex-start-center border-b-solid border-light pb-[20px]">
        <div
          v-for="(item, index) in orderTypeList"
          :key="index"
          class="mr-[15px] h-[30px] flex-center rounded-[15px] bg-assist9 px-[18px]"
          :class="state.orderValue === item.value ? 'text-primary' : ''"
          @click="changeOrderType(item.value)"
        >
          {{ item.label }}
        </div>
      </div>
      <p class="my-[14px] text-sm">
        当前系统支持查询最近7天的交易记录
      </p>

      <div class="w-full flex-start-center-warp">
        <div
          v-for="(item, index) in statusList"
          :key="index"
          class="mb-[10px] mr-[10px] h-[28px] flex-center rounded-[14px] bg-assist9 px-[18px]"
          :class="state.statusValue === item.value ? 'text-primary' : ''"
          @click="changeStatusType(item.value)"
        >
          {{ item.label }}
        </div>
      </div>
    </div>

    <div class="mt-[8px] w-full bg-white p-[20px]" @click="toPage('/my/tradeRecord/detail')">
      <div class="flex-between-center">
        <img :src="binZs" alt="" class="w-[36px]" />
        <div>
          <span></span>
          <span></span>
        </div>
        <div>
          <span></span>
          <span></span>
        </div>
        <div i-carbon:chevron-right class="text-lg text-assist8"></div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<route lang="yaml">
meta:
  layout: user
</route>
