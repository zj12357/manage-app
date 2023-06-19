<script setup lang="ts">
import icon_record_dq from '~/assets/images/icons/icon_record_dq.png'

const router = useRouter()
const state = reactive({
  recordList: [] as any[],
  loading: false,
  finished: false,
  page: 1,
  limit: 10,
})

function toPage(path: string) {
  router.push(path)
}

async function fetchGetUserTerminalRecord() {
  state.loading = true
  const res = await getUserTerminalRecord({
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
  fetchGetUserTerminalRecord()
}
onMounted(() => {
  fetchGetUserTerminalRecord()
})
</script>

<template>
  <div class="w-full">
    <NavBar title="定期記錄" />
    <div>
      <van-list
        v-model:loading=" state.loading"
        :finished="state.finished"

        @load="handleLoadPage"
      >
        <div v-for="(item, index) in state.recordList" :key="index" class="mt-[8px] w-full border-b-solid border-light bg-white p-[20px]" @click="toPage(`/my/terminalRecord/detail?order_id=${item.id}`)">
          <div class="flex-between-center">
            <div class="mr-[6px]">
              <img :src="icon_record_dq" class="w-[36px]" alt="" />
            </div>
            <div class="flex-col-center-start flex-auto">
              <span class="mb-[6px]">转入</span>
              <span class="text-sm text-assist8">{{ item.created_at }}</span>
            </div>
            <div class="mr-[10px] flex-col-center-end">
              <span class="mb-[6px] text-primary">{{ item.balance }}</span>
              <span class="text-sm text-assist8">{{ terminalStatusType[item.type] }}</span>
            </div>
            <div i-carbon:chevron-right class="text-lg text-assist8"></div>
          </div>
        </div>
      </van-list>
      <NotData v-if="!state.recordList.length && !state.loading && state.finished" />
    </div>
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: user
</route>
