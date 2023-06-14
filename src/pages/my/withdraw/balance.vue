<script setup lang="ts">
import tradeBalanceDown from '~/assets/images/user/trade_balance_down.png'
import tradeBalance from '~/assets/images/user/trade_balance_bg.png'
</script>

<template>
  <div class="relative mt-[20px] h-[120px] w-full bg-white">
    <div :style="{ backgroundImage: `url(${tradeBalance})` }" class="bottom-[18px] z-[10] h-[100px] w-[280px] bg-white bg-center-cover p-[20px] shadow-base absolute-row-center">
      <p class="text-md">
        资产总额&nbsp;¥
      </p>
      <p class="mt-[12px] w-full text-nowrap-ellipsis text-xl font-500 text-assist3">
        123123123123123112312312312312311231231231231231
      </p>
    </div>
    <img :src="tradeBalanceDown" class="bottom-[5px] z-[9] w-[340px] absolute-row-center" alt="" />
  </div>
</template>

<style scoped>

</style>
