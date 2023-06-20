<script setup lang="ts">
import { showConfirmDialog } from 'vant'

// import bankCard from './bankCard/index.vue'
import numberCard from './numberCard/index.vue'

const active = ref(0)
const router = useRouter()
const state = reactive({
  wallet_id: '',
  isBindNumber: true,
})

function goBack() {
  router.back()
}

function toPage(path: string) {
  router.push(path)
}

async function fetchGetBindCard() {
  const res = await getWallet()
  if (res.code === 200) {
    const length = res.data?.items?.length
    state.isBindNumber = length > 0
    if (length > 0) {
      state.wallet_id = res.data?.items[0]?.id
    }
    else {
      showConfirmDialog({
        title: '溫馨提示',
        message: '您還沒有綁定數字錢包，確定去綁定嗎？',
        className: 'app-dialog',
      }).then((result) => {
        router.push('/my/userCenter/payCard?id=1')
      })
    }
  }
}

onMounted(() => {
  fetchGetBindCard()
})
// watch(active, (newValue, oldValue) => {
//   if (newValue === 0) {
//     getCard().then((res) => {
//       if (res.code === 200 && res.data?.data?.length === 0) {
//         showConfirmDialog({
//           title: '溫馨提示',
//           message: '您还没有绑定银行卡，确定去绑定吗？',
//           className: 'app-dialog',
//           confirmButtonText: '確定',
//         }).then((result) => {
//           router.push('/my/userCenter/payCard?id=0')
//         })
//       }
//     })
//   }
// })
</script>

<template>
  <div class="w-full bg-white">
    <van-nav-bar
      title="贖回"
      left-arrow
      fixed
      @click-left="goBack"
    >
      <template #right>
        <span class="text-primary" @click="toPage('/my/withdrawRecord')">贖回記錄</span>
      </template>
    </van-nav-bar>
    <div class="w-full">
      <van-tabs v-model:active="active">
        <!-- <van-tab title="银行卡">
          <bankCard />
        </van-tab> -->
        <van-tab title="數字錢包">
          <numberCard :wallet_id="state.wallet_id" :is-bind-number="state.isBindNumber" />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<style scoped></style>

<route lang="yaml">
meta:
  layout: user
</route>
