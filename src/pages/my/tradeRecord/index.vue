<script setup lang="ts">
import binZs from '~/assets/images/icons/icon_bin_zs.png'

const state = reactive({
  recordValue: 1,
  binValue: 1,
  timeValue: 1,
})
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

const timeTypeList = [
  {
    label: '昨天',
    value: 1,
  },
  {
    label: '今天',
    value: 2,
  },
  {
    label: '近7天',
    value: 3,
  },
]

function changeRecordType(type: number) {
  state.recordValue = type
}

function changeBinType(type: number) {
  state.binValue = type
}

function changeTimeType(type: number) {
  state.timeValue = type
}

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
          class="mr-[15px] h-[30px] flex-center rounded-[15px] bg-assist9 px-[18px]"
          :class="state.recordValue === item.value ? 'text-primary' : ''"
          @click="changeRecordType(item.value)"
        >
          {{ item.label }}
        </div>
      </div>
      <p class="my-[14px] text-sm">
        当前系统支持查询最近7天的交易记录
      </p>

      <div v-if="state.recordValue === 1" class="w-full flex-start-center-warp">
        <div
          v-for="(item, index) in binTypeList"
          :key="index"
          class="mb-[10px] mr-[10px] h-[28px] flex-center rounded-[14px] bg-assist9 px-[18px]"
          :class="state.binValue === item.value ? 'text-primary' : ''"
          @click="changeBinType(item.value)"
        >
          {{ item.label }}
        </div>
      </div>
      <div v-else class="w-full flex-start-center-warp">
        <div
          v-for="(item, index) in timeTypeList"
          :key="index"
          class="mb-[10px] mr-[10px] h-[28px] flex-center rounded-[14px] bg-assist9 px-[18px]"
          :class="state.timeValue === item.value ? 'text-primary' : ''"
          @click="changeTimeType(item.value)"
        >
          {{ item.label }}
        </div>
      </div>
    </div>

    <div
      class="mt-[8px] w-full bg-white p-[20px]"
      @click="toPage('/my/tradeRecord/detail')"
    >
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
