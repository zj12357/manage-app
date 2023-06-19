<script setup lang="ts">
import trade_success from '~/assets/images/user/trade_success.png'

const route = useRoute()
const state = reactive({
  detail: {} as any,
})

async function fetchGetUserRechargeRecord() {
  const res = await getUserBillRecord({
    id: route.query.id,
  })
  if (res.code === 200)

    state.detail = res.data
}

onMounted(() => {
  fetchGetUserRechargeRecord()
})
</script>

<template>
  <div class="w-full">
    <NavBar title="賬變記錄詳情" />
    <div class="w-full">
      <div class="w-full bg-white p-[20px]">
        <div class="w-full flex-col-center">
          <img :src="trade_success" class="w-full" alt="" />
          <span class="my-[14px] text-xxl font-500 text-assist3">{{ handleMoneySymbol(state.detail?.balance) }}</span>
        </div>
      </div>

      <div class="mt-[8px] w-full bg-white">
        <van-cell-group>
          <van-cell title="操作類型" :value="billStatusType[state.detail?.type]" />
          <van-cell title="訂單號" :value="state.detail?.order_number" />
          <van-cell title="操作前金額" :value="state.detail?.before_balance" />
          <van-cell title="操作金額" :value="handleMoneySymbol(state.detail?.balance)" />
          <van-cell title="操作後金額" :value="state.detail?.after_balance" />
          <van-cell title="存入時間" :value="state.detail?.created_at" />
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
