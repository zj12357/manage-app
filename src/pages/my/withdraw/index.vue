<script setup lang="ts">
import { showConfirmDialog } from 'vant'

// import bankCard from './bankCard/index.vue'
import numberCard from './numberCard/index.vue'

const active = ref(0)
const router = useRouter()
const state = reactive({
  wallet_id: '',
})

watch(active, (newValue, oldValue) => {
  // if (newValue === 0) {
  //   getCard().then((res) => {
  //     if (res.code === 200 && res.data?.data?.length === 0) {
  //       showConfirmDialog({
  //         title: '温馨提示',
  //         message: '您还没有绑定银行卡，确定去绑定吗？',
  //         className: 'app-dialog',
  //       }).then((result) => {
  //         router.push('/my/userCenter/payCard?id=0')
  //       })
  //     }
  //   })
  // }
  if (newValue === 0) {
    getWallet().then((res) => {
      if (res.code === 200 && res.data?.items?.length === 0) {
        showConfirmDialog({
          title: '温馨提示',
          message: '您还没有绑定数字钱包，确定去绑定吗？',
          className: 'app-dialog',
        }).then((result) => {
          router.push('/my/userCenter/payCard?id=1')
        })
      }
      else {
        state.wallet_id = res.data?.items[0]?.id
      }
    })
  }
}, { immediate: true })
</script>

<template>
  <div class="w-full bg-white">
    <NavBar title="赎回" />
    <div class="w-full">
      <van-tabs v-model:active="active">
        <!-- <van-tab title="银行卡">
          <bankCard />
        </van-tab> -->
        <van-tab title="数字钱包">
          <numberCard :wallet_id="state.wallet_id" />
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
