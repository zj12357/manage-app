<script setup lang="ts">
const router = useRouter()
const recordTypeList = [
  {
    label: '交易仓位',
    value: 1,
  },
  {
    label: '时间选择',
    value: 2,
  },
]

const binTypeList = [
  {
    label: '全部',
    value: 1,
  },
  {
    label: '普通仓',
    value: 2,
  },
  {
    label: 'VIP仓',
    value: 3,
  },
  {
    label: '贵宾仓',
    value: 4,
  },
  {
    label: '钻石仓',
    value: 5,
  },
]

function toPage(path: string) {
  router.push(path)
}
</script>

<template>
  <div class="w-full">
    <NavBar title="交易记录" />

    <div class="w-full bg-white p-[20px]">
      <div class="flex-start-center border-b-solid border-light pb-[20px]">
        <div
          v-for="(item, index) in recordTypeList"
          :key="index"
          class="mr-[15px] h-[30px] w-[100px] flex-center rounded-[15px] bg-assist9"
        >
          {{ item.label }}
        </div>
      </div>
      <p class="my-[14px] text-sm">
        当前系统支持查询最近7天的交易记录
      </p>

      <div class="w-full flex-start-center-warp">
        <div
          v-for="(item, index) in binTypeList"
          :key="index"
          class="mb-[10px] mr-[15px] h-[28px] w-[94px] flex-center rounded-[14px] bg-assist9"
        >
          {{ item.label }}
        </div>
      </div>
    </div>

    <div class="mt-[8px] w-full bg-white p-[20px]" @click="toPage('/my/tradeRecord/detail')">
    </div>
  </div>
</template>

<style scoped></style>

<route lang="yaml">
meta:
  layout: user
</route>
