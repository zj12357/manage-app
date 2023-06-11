<script setup lang="ts">
import headerTitle from './headerTitle.vue'
import tradeNav from './tradeNav.vue'
import detailBtnVue from './detailBtn.vue'
import walletNav from './walletNav.vue'
import dabtBg from '~/assets/images/home/debt_bg.png'
</script>

<template>
  <div class="w-full bg-white">
    <div
      class="h-[230px] w-full bg-top-cover"
      :style="{ backgroundImage: `url(${dabtBg})`, backgroundPosition: '0 -20px' }"
    >
      <headerTitle />
      <tradeNav />
      <detailBtnVue />
    </div>
    <walletNav />
  </div>
</template>

<style scoped></style>
