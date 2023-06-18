<script setup lang="ts">
import dayjs from 'dayjs'
import icon_record_usdt from '~/assets/images/icons/icon_record_usdt.png'

const state = reactive({
  orderValue: 1,
  statusValue: 0,
  type: 0,
  start_date: undefined as any,
  picker_date: undefined,
  recordList: [] as any[],
  showPicker: false,
  choose_date: `${dayjs().format('YYYY-MM-DD')} - ${dayjs().format('YYYY-MM-DD')}`,
  loading: false,
  finished: false,
  page: 1,
  limit: 10,
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
    value: 0,
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

function initState() {
  state.page = 1
  state.recordList = []
  state.loading = false
  state.finished = false
  state.type = 0
  state.start_date = undefined
}

function toPage(path: string) {
  router.push(path)
}

function changeOrderType(type: number) {
  if (type !== state.orderValue) {
    initState()
    state.orderValue = type
    if (type === 2)
      state.start_date = dayjs().format('YYYY-MM-DD')
  }
}
function changeStatusType(type: number) {
  if (type !== state.statusValue) {
    initState()
    state.statusValue = type
    state.type = type
  }
}
function handleDateConfirm(value: any) {
  initState()
  state.choose_date = `${value.selectedValues.join('-')} - ${dayjs().format('YYYY-MM-DD')}`
  state.start_date = value.selectedValues.join('-')
  state.showPicker = false
}
async function fetchGetUserBillRecord() {
  state.loading = true
  const res = await getUserBillRecord({
    type: state.type,
    start_date: state.start_date,
    limit: state.limit,
    page: state.page,
  })
  if (res.code === 200) {
    state.loading = false
    state.recordList = [...state.recordList, ...res.data.data]
    if (res.data.data?.length === 0)
      state.finished = true
  }
}

function handleLoadPage() {
  state.page = state.page + 1
  fetchGetUserBillRecord()
}

onMounted(() => {
  fetchGetUserBillRecord()
})

watch(() => [state.start_date, state.statusValue, state.orderValue], (newValue, oldValue) => {
  if (newValue !== oldValue)
    fetchGetUserBillRecord()
})
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

      <div v-if="state.orderValue === 1" class="w-full flex-start-center-warp">
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
      <div v-else>
        <van-field
          v-model="state.choose_date"
          readonly
          label="时间选择"
          placeholder="点击选择时间"
          @click="state.showPicker = true"
        />
        <van-popup v-model:show="state.showPicker" position="bottom">
          <van-date-picker
            v-model="state.picker_date"
            title="选择日期"
            :max-date="new Date()"
            @cancel="state.showPicker = false"
            @confirm="handleDateConfirm"
          />
        </van-popup>
      </div>
    </div>

    <van-list
      v-model:loading="state.loading"
      :finished="state.finished"
      @load="handleLoadPage"
    >
      <div v-for="(item, index) in state.recordList" :key="index" class="mt-[8px] w-full border-b-solid border-light bg-white p-[20px]" @click="toPage(`/my/ledgerRecord/detail?order_id=${item.order_number}`)">
        <div class="flex-between-center">
          <div class="mr-[6px]">
            <img :src="icon_record_usdt" class="w-[36px]" alt="" />
          </div>
          <div class="flex-col-center-start flex-auto">
            <span class="mb-[6px]">{{ billStatusType[item.type] }}</span>
            <span class="text-sm text-assist8">{{ item.created_at }}</span>
          </div>
          <div class="mr-[10px] flex-col-center-start">
            <span class="mb-[6px] text-primary">{{ item.balance > 0 ? `+${item.balance}` : item.balance }}</span>
            <span class="text-sm text-assist8">{{ item.order_number }}</span>
          </div>
          <div i-carbon:chevron-right class="text-lg text-assist8"></div>
        </div>
      </div>
    </van-list>
    <NotData v-if="!state.recordList.length && !state.loading && state.finished" />
  </div>
</template>

<style scoped></style>

<route lang="yaml">
meta:
  layout: user
</route>
