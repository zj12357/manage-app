<script setup lang="ts">
import tradeSuccess from '~/assets/images/user/trade_success.png'

const route = useRoute()
const state = reactive({
  detail: {} as any,
})

async function fetchGetUserOrderRecord() {
  const res = await getUserOrderRecord({
    order_id: Number(route.query.order_id),
    limit: 10,
    page: 1,
  })
  if (res.code === 200)
    state.detail = res.data
}

onMounted(() => {
  fetchGetUserOrderRecord()
})
</script>

<template>
  <div class="w-full">
    <NavBar title="交易記錄詳情" />
    <div class="w-full">
      <div class="w-full flex-col-center bg-white p-[20px]">
        <img :src="tradeSuccess" class="w-full" alt="" />
        <span class="my-[14px] text-xxl font-500 text-assist3">{{ handleMoneySymbol(state.detail.money) }}</span>
      </div>

      <div class="mt-[8px] w-full bg-white">
        <van-cell-group>
          <van-cell title="交易大廳" :value="roomType[state.detail.room_id]" />
          <van-cell title="盈虧" :value="state.detail.change_money" />
          <van-cell title="輪數" :value="state.detail.issue" />
          <van-cell title="內容" :value="state.detail.bet" />
          <van-cell title="貨幣" :value="state.detail.money" />
          <van-cell title="狀態" :value="tradeStatusType[state.detail.status]" />
          <van-cell title="日期" :value="state.detail.created_at" />
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
