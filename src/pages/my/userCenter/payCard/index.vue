<script setup lang="ts">
// import bankCard from './bankCard.vue'
import numberCard from './numberCard.vue'

const route = useRoute()
const { id } = route.query as any
</script>

<template>
  <div class="h-full w-full">
    <NavBar title="錢包管理" />
    <div class="w-full">
      <van-tabs v-model:active="id">
        <!-- <van-tab title="银行卡">
          <bankCard />
        </van-tab> -->
        <van-tab title="數字錢包">
          <numberCard />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: user
</route>
