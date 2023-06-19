<script setup lang="ts">
import lineChart from './lineChart.vue'
import dynaticTable from './dynaticTable.vue'
</script>

<template>
  <div class="w-full pt-[55px]">
    <NavBar title="行情" />
    <div class="w-full">
      <div class="mb-[15px] bg-white pl-[10px] pr-[10px]">
        <span class="dot pl-[15px] line-height-[40px]">市場趨勢</span>
        <lineChart />
      </div>
      <div class="w-full bg-white pl-[10px] pr-[10px]">
        <span class="dot pl-[15px] line-height-[40px]">市場動態</span>
        <dynaticTable />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
