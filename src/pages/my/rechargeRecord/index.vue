<script setup lang="ts">
import dayjs from 'dayjs'
import icon_record_cr from '~/assets/images/icons/icon_record_cr.png'

const state = reactive({
  depositValue: 1,
  statusValue: 0,
  recordList: [] as any[],
  order_id: undefined,
  start_date: undefined as any,
  picker_date: undefined,
  status: undefined as any,
  showPicker: false,
  choose_date: `${dayjs().format('YYYY-MM-DD')} - ${dayjs().format('YYYY-MM-DD')}`,
  loading: false,
  finished: false,
  page: 1,
  limit: 10,
})
const router = useRouter()
const depositTypeList = [
  {
    label: '訂單狀態',
    value: 1,
  },
  {
    label: '訂單日期',
    value: 2,
  },
  {
    label: '訂單號',
    value: 3,
  },
]

const statusList = [
  {
    label: '全部',
    value: 0,
  },
  {
    label: '存入成功',
    value: 1,
  },
  {
    label: '存入失敗',
    value: 2,
  },
  {
    label: '等待付款',
    value: 0,
  },
]

function toPage(path: string) {
  router.push(path)
}
function initState() {
  state.page = 1
  state.recordList = []
  state.loading = false
  state.finished = false
  state.status = undefined
  state.start_date = undefined
}

function changeDepositType(type: number) {
  if (type !== state.depositValue) {
    initState()
    state.order_id = undefined
    state.depositValue = type
    if (type === 2)
      state.start_date = dayjs().format('YYYY-MM-DD')
  }
}
function changeStatusType(type: number) {
  if (type !== state.statusValue) {
    initState()
    state.statusValue = type
    state.status = type === 0 ? undefined : type
  }
}
async function fetchGetUserRechargeRecord() {
  state.loading = true
  const res = await getUserRechargeRecord({
    status: state.status,
    order_id: state.order_id,
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

function handleDateConfirm(value: any) {
  initState()
  state.choose_date = `${value.selectedValues.join('-')} - ${dayjs().format('YYYY-MM-DD')}`
  state.start_date = value.selectedValues.join('-')
  state.showPicker = false
}
function handleLoadPage() {
  state.page = state.page + 1
  fetchGetUserRechargeRecord()
}
function handleSearch() {
  initState()
  fetchGetUserRechargeRecord()
}

onMounted(() => {
  fetchGetUserRechargeRecord()
})
watch(() => [state.start_date, state.statusValue, state.depositValue], (newValue, oldValue) => {
  if (newValue !== oldValue)
    fetchGetUserRechargeRecord()
})
</script>

<template>
  <div class="w-full">
    <NavBar title="存入記錄" />
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
        當前系統支持查詢最近7天的交易記錄
      </p>

      <div v-if="state.depositValue === 1" class="w-full flex-start-center-warp">
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
      <div v-else-if="state.depositValue === 2" class="w-full">
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
      <div v-else-if="state.depositValue === 3" class="border-b-solid border-light">
        <van-cell-group inset>
          <van-field
            v-model="state.order_id"
            center
            clearable
            placeholder="请输入订单号"
          >
            <template #button>
              <van-button size="small" type="primary" @click="handleSearch">
                搜索
              </van-button>
            </template>
          </van-field>
        </van-cell-group>
      </div>
    </div>

    <van-list
      v-model:loading=" state.loading"
      :finished="state.finished"

      @load="handleLoadPage"
    >
      <div v-for="(item, index) in state.recordList" :key="index" class="mt-[8px] w-full border-b-solid border-light bg-white p-[20px]" @click="toPage(`/my/rechargeRecord/detail?order_id=${item.order_number}`)">
        <div class="flex-between-center">
          <div class="mr-[6px]">
            <img :src="icon_record_cr" class="w-[36px]" alt="" />
          </div>
          <div class="flex-col-center-start flex-auto">
            <span class="mb-[6px]">存入</span>
            <span class="text-sm text-assist8">{{ item.created_at }}</span>
          </div>
          <div class="mr-[10px] flex-col-center-end">
            <span class="mb-[6px] text-primary">{{ handleMoneySymbol(item.money) }}</span>
            <span class="text-sm text-assist8">{{ rechargeStatusType[item.status] }}</span>
          </div>
          <div i-carbon:chevron-right class="text-lg text-assist8"></div>
        </div>
      </div>
    </van-list>
    <NotData v-if="!state.recordList.length && !state.loading && state.finished" />
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: user
</route>
