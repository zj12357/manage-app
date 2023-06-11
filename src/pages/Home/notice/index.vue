<script setup lang="ts">
import notice from '~/assets/images/home/notice_title.png'
</script>

<template>
  <div>
    <van-notice-bar
      text="无论我们能活多久，我们能够享受的只有无法分割的此刻，此外别无其他。"
      :left-icon="notice"
      class="bg-[#fff9ed] text-assist1"
    />
  </div>
</template>

<style scoped lang="scss">
:deep(.van-icon__image) {
    width: 38px;
    height: 18px;
    margin-right: 6px;
}
</style>
