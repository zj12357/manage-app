<script setup lang="ts">
import { getCarousels } from '~/api/home'

const carouselList = ref<any>([])

async function fetchCarousels() {
  const res = await getCarousels()
  if (res.code === 200)
    carouselList.value = res.data?.data ?? []
}
onMounted(() => {
  fetchCarousels()
})
</script>

<template>
  <div class="w-full flex-center p-[20px]">
    <van-swipe class="h-[120px] w-full rounded-[8px]" :autoplay="3000" indicator-color="#ffa900">
      <van-swipe-item v-for="(item, index) in carouselList" :key="index" class="rounded-[8px] bg-primary">
        <van-image
          class="img-cover rounded-[8px]"
          :src="`${IMAGE_API_URL}/${item.image}`"
        />
        <span>{{ item.image }}</span>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<style scoped lang="scss">
:deep(.van-image__img){
   border-radius: 8px;
}
</style>
