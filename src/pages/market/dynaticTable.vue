<script setup>
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'
import { randomName } from '~/utils/tools'

function generateItem(num = 19) {
  const types = ['高空', '高', '低', '空', '高多', '低空', '低多', '多']
  const data = []
  for (let i = 0; i < num; i++) {
    data.push({
      label: randomName(),
      value: (Math.random() * 100000 + 100).toFixed(2),
      type: types[Math.floor(Math.random() * 8)],
    })
  }
  return data
}
const list = generateItem()
</script>

<template>
  <div class="box w-full overflow-hidden">
    <div
      class="header align-center font-size-[14px] border-radius-[5px] w-full flex justify-between bg-[#C6EAE1] pl-[10px] pr-[10px] line-height-[45px]"
    >
      <span class="flex-1">交易用戶</span>
      <span class="w-[60px] flex-1 text-center">交易品類</span>
      <span class="flex-1 text-right">當前收益</span>
    </div>
    <div class="flex-1 overflow-hidden">
      <Vue3SeamlessScroll :list="list" :hover="true" :single-height="45" direction="down" class="warp">
        <ul>
          <li
            v-for="(item, index) in list" :key="`${item.label}-${index}`" :class="{
              'bg-[#E0F1EC]': index % 2 === 1,
            }"
            class="align-center font-size-[14px] w-full flex justify-between pl-[10px] pr-[10px] line-height-[45px]"
          >
            <span class="flex-1">{{ item.label }}</span>
            <span class="w-[60px] flex-1 text-center">{{ item.type }}</span>
            <span class="flex-1 text-right text-[#269e89]">{{ item.value }}</span>
          </li>
        </ul>
      </Vue3SeamlessScroll>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  height: calc(100vh - 360px);
}
</style>
