<script setup lang="ts">
import icon_bin_zs from '~/assets/images/icons/icon_bin_zs.png'
import icon_bin_vip from '~/assets/images/icons/icon_bin_vip.png'
import icon_bin_gb from '~/assets/images/icons/icon_bin_gb.png'
import icon_bin_pt from '~/assets/images/icons/icon_bin_pt.png'

const roomType: Record<number, string> = {
  5: icon_bin_pt,
  4: icon_bin_gb,
  3: icon_bin_vip,
  2: icon_bin_zs,
}

const state = reactive({
  recordValue: 1,
  binValue: 0,
  timeValue: 1,
  loading: false,
  finished: false,
  page: 1,
  limit: 10,
  recordList: [] as any,
  room_id: undefined as any,
  date_id: undefined as any,
  binTypeList: [{
    label: '全部',
    value: 0,
  }],
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

const timeTypeList = [
  {
    label: '昨天',
    value: 2,
  },
  {
    label: '今天',
    value: 1,
  },
  {
    label: '近7天',
    value: 3,
  },
]

function changeRecordType(type: number) {
  initState()
  state.recordValue = type
}

function changeBinType(type: number) {
  initState()
  state.binValue = type
  state.room_id = type === 0 ? undefined : type
}

function changeTimeType(type: number) {
  initState()
  state.timeValue = type
  state.date_id = type
}

function toPage(path: string) {
  router.push(path)
}

function initState() {
  state.page = 1
  state.recordList = []
  state.loading = false
  state.finished = false
  state.date_id = undefined
  state.room_id = undefined
}
async function fetchGetRooms() {
  const res = await getRooms()
  if (res.code === 200) {
    const list = res.data.data?.map((item: any) => {
      return {
        label: item.title,
        value: item.id,
      }
    })
    state.binTypeList = [...state.binTypeList, ...list]
  }
}

async function fetchGetUserOrderRecord() {
  state.loading = true
  const res = await getUserOrderRecord({
    room_id: state.room_id,
    date_id: state.date_id,
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
  fetchGetUserOrderRecord()
}

onMounted(() => {
  fetchGetUserOrderRecord()
  fetchGetRooms()
})
watch(() => [state.binValue, state.timeValue], (newValue, oldValue) => {
  if (newValue !== oldValue)
    fetchGetUserOrderRecord()
})
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
          v-for="(item, index) in state.binTypeList"
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
    <van-list
      v-model:loading=" state.loading"
      :finished="state.finished"
      finished-text="没有更多了"
      @load="handleLoadPage"
    >
      <div v-for="(item, index) in state.recordList" :key="index" class="mt-[8px] w-full border-b-solid border-light bg-white p-[20px]" @click="toPage(`/my/tradeRecord/detail?order_id=${item.order_number}`)">
        <div class="flex-between-center">
          <div class="mr-[6px]">
            <img :src="roomType[item.room_id]" class="w-[36px]" alt="" />
          </div>
          <div class="flex-col-center-start flex-auto">
            <span class="mb-[6px]">{{ state.binTypeList.find(v => v.value === item.room_id)?.label }}</span>
            <span class="text-sm text-assist8">{{ item.created_at }}</span>
          </div>
          <div class="mr-[10px] flex-col-center-start">
            <span class="mb-[6px] text-primary">{{ item.status === 3 ? '匹配中' : item.change_money }}</span>
            <span class="text-sm text-assist8">{{ item.issue }}</span>
          </div>
          <div i-carbon:chevron-right class="text-lg text-assist8"></div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<style scoped></style>

<route lang="yaml">
meta:
  layout: user
</route>
