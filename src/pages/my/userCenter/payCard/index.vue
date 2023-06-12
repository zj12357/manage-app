<script setup lang="ts">
import bankCard from './bankCard.vue'
import numberCard from './numberCard.vue'
</script>

<template>
  <div class="h-full w-full">
    <NavBar title="卡片管理" />
    <div class="w-full">
      <van-tabs>
        <van-tab title="银行卡">
          <bankCard />
        </van-tab>
        <van-tab title="数字钱包">
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
