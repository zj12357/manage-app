<script setup lang="ts">
import headerTitle from './headerTitle.vue'
import tradeNav from './tradeNav.vue'
import detailBtnVue from './detailBtn.vue'
import walletNav from './walletNav.vue'
import dabtBg from '~/assets/images/home/debt_bg.png'
</script>

<template>
  <div class="relative h-[240px] w-full bg-white bg-base" :style="{ backgroundImage: `url(${dabtBg})`, backgroundPosition: '0 -20px' }">
    <headerTitle />
    <tradeNav />
    <detailBtnVue />
    <walletNav />
  </div>
</template>

<style scoped>

</style>
