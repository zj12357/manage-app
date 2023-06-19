<script setup lang="ts">
import trade_success from '~/assets/images/user/trade_success.png'

const route = useRoute()
const state = reactive({
  detail: {} as any,
})

async function fetchGetUserTerminalRecord() {
  const res = await getUserTerminalRecord({
    id: Number(route.query.order_id),
    limit: 10,
    page: 1,
  })
  if (res.code === 200)
    state.detail = res.data
}

onMounted(() => {
  fetchGetUserTerminalRecord()
})
</script>

<template>
  <div class="w-full">
    <NavBar title="定期記錄詳情" />
    <div class="w-full">
      <div class="w-full bg-white p-[20px]">
        <div class="w-full flex-col-center">
          <img :src="trade_success" class="w-full" alt="" />
          <span class="my-[14px] text-xxl font-500 text-assist3">+ {{ state.detail?.balance }}</span>
        </div>
      </div>

      <div class="mt-[8px] w-full bg-white">
        <van-cell-group>
          <van-cell title="類型" value="存入" />
          <van-cell title="轉入狀態" :value="terminalStatusType[state.detail?.type]" />
          <van-cell title="轉入金額" :value="state.detail?.balance" />
          <van-cell title="預計收益" :value="state.detail?.estimate" />
          <van-cell title="轉入時間" :value="state.detail?.created_at" />
          <van-cell title="截止日期" :value="state.detail?.end_date" />
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: user
</route>
