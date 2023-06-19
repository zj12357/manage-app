<script setup lang="ts">
import copy from 'copy-to-clipboard'
import { showSuccessToast } from 'vant'
import trade_success from '~/assets/images/user/trade_success.png'
import trade_error from '~/assets/images/user/trade_error.png'
import loading_gif from '~/assets/images/user/loading.gif'

const route = useRoute()
const state = reactive({
  detail: {} as any,
})

async function fetchGetUserRechargeRecord() {
  const res = await getUserRechargeRecord({
    order_id: route.query.order_id,
    limit: 10,
    page: 1,
  })
  if (res.code === 200)

    state.detail = res.data.data?.[0]
}
function handleCopy(val: string) {
  copy(val)
  showSuccessToast('複製成功')
}

onMounted(() => {
  fetchGetUserRechargeRecord()
})
</script>

<template>
  <div class="w-full">
    <NavBar title="存入記錄詳情" />
    <div class="w-full">
      <div class="w-full bg-white p-[20px]">
        <div v-if="state.detail?.status === 1" class="w-full flex-col-center">
          <img :src="trade_success" class="w-full" alt="" />
          <span class="my-[14px] text-xxl font-500 text-assist3"> {{ handleMoneySymbol(state.detail?.money) }}</span>
        </div>
        <div v-if="state.detail?.status === 2" class="w-full flex-col-center">
          <img :src="trade_error" class="w-full" alt="" />
          <span class="my-[14px] text-xxl font-500 text-assist3"> {{ handleMoneySymbol(state.detail?.money) }}</span>
        </div>
        <div v-if="state.detail?.status === 3" class="w-full flex-col-center">
          <img class="w-[75px]" :src="loading_gif" alt="" />
          <span class="my-[14px] font-500 text-assist3">等待付款</span>
        </div>
      </div>

      <div class="mt-[8px] w-full bg-white">
        <van-cell-group>
          <van-cell title="類型" value="存入" />
          <van-cell title="存入金額" :value=" handleMoneySymbol(state.detail?.money)" />
          <van-cell title="存入方式" :value="rechargeType[state.detail?.type]" />
          <van-cell title="訂單號" :value="state.detail?.order_number">
            <template #right-icon>
              <div
                class="ml-[6px] rounded-[4px] bg-primary px-[8px] text-white"
                @click="handleCopy(state.detail?.order_number)"
              >
                複製
              </div>
            </template>
          </van-cell>
          <van-cell title="狀態" :value="rechargeStatusType[state.detail?.status]" />
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
