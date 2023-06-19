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
    label: '訂單狀態',
    value: 1,
  },
  {
    label: '訂單日期',
    value: 2,
  },
]

const statusList = [
  {
    label: '全部',
    value: 0,
  },
  {
    label: '認購',
    value: 1,
  },
  {
    label: '存入',
    value: 2,
  },
  {
    label: '匹配成功',
    value: 3,
  },
  {
    label: '贖回',
    value: 4,
  },
  {
    label: '贖回退回',
    value: 5,
  },
  {
    label: '調整添加餘額',
    value: 6,
  },
  {
    label: '禮金贈送',
    value: 7,
  },

  {
    label: '調整減少餘額',
    value: 8,
  },
  {
    label: '定期轉入15天',
    value: 9,
  },
  {
    label: '定期轉出',
    value: 10,
  },
  {
    label: '定期轉入30天',
    value: 11,
  },
  {
    label: '數字錢包',
    value: 12,
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
    if (state.recordList.length >= res.data.total)
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
    <NavBar title="賬變記錄" />

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
        當前系統支持查詢最近7天的交易記錄
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
          label="時間選擇"
          placeholder="點擊選擇時間"
          @click="state.showPicker = true"
        />
        <van-popup v-model:show="state.showPicker" position="bottom">
          <van-date-picker
            v-model="state.picker_date"
            title="選擇日期"
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
      <div v-for="(item, index) in state.recordList" :key="index" class="mt-[8px] w-full border-b-solid border-light bg-white p-[20px]" @click="toPage(`/my/ledgerRecord/detail?id=${item.id}`)">
        <div class="flex-between-center">
          <div class="mr-[6px]">
            <img :src="icon_record_usdt" class="w-[36px]" alt="" />
          </div>
          <div class="flex-col-center-start flex-auto">
            <span class="mb-[6px]">{{ billStatusType[item.type] }}</span>
            <span class="text-sm text-assist8">{{ item.created_at }}</span>
          </div>
          <div class="mr-[10px] flex-col-center-end">
            <span class="mb-[6px] text-primary">{{ handleMoneySymbol(item.balance) }}</span>
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
