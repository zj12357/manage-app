<script setup lang="ts">
const state = reactive({
  depositValue: 1,
  statusValue: 1,
})
const router = useRouter()
const depositTypeList = [
  {
    label: '订单状态',
    value: 1,
  },
  {
    label: '订单日期',
    value: 2,
  },
  {
    label: '订单号',
    value: 3,
  },
]

const statusList = [
  {
    label: '全部',
    value: 1,
  },
  {
    label: '存入成功',
    value: 2,
  },
  {
    label: '存入失败',
    value: 3,
  },
  {
    label: '等待付款',
    value: 4,
  },
]

function toPage(path: string) {
  router.push(path)
}

function changeDepositType(type: number) {
  state.depositValue = type
}
function changeStatusType(type: number) {
  state.statusValue = type
}
</script>

<template>
  <div class="w-full">
    <NavBar title="存入记录" />
    <div class="w-full bg-white p-[20px]">
      <div class="flex-start-center border-b-solid border-light pb-[20px]">
        <div
          v-for="(item, index) in depositTypeList"
          :key="index"
          class="mr-[15px] h-[30px] flex-center rounded-[15px] bg-assist9 px-[18px]"
          :class="state.depositValue === item.value ? 'text-primary' : ''"
          @click="changeDepositType(item.value)"
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

<style scoped>

</style>
