<script setup lang="ts">
import tradeSuccess from '~/assets/images/user/trade_success.png'
</script>

<template>
  <div class="w-full">
    <NavBar title="交易记录详情" />
    <div class="w-full">
      <div class="w-full flex-col-center bg-white p-[20px]">
        <img :src="tradeSuccess" class="w-full" alt="" />
        <span class="my-[14px] text-xxl font-500 text-assist3">+ 386.00</span>
      </div>

      <div class="mt-[8px] w-full bg-white">
        <van-cell-group>
          <van-cell title="交易大厅" value="内容" />
          <van-cell title="盈亏" value="内容" />
          <van-cell title="轮数" value="内容" />
          <van-cell title="内容" value="内容" />
          <van-cell title="货币" value="内容" />
          <van-cell title="状态" value="内容" />
          <van-cell title="日期" value="内容" />
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
