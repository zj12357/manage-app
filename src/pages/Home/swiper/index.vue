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
    <van-swipe class="h-[120px] w-full" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in carouselList" :key="index" class="bg-primary">
        <van-image
          class="img-cover"
          :src="`${IMAGE_API_URL}/${item.image}`"
        />
        <span>{{ item.image }}</span>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<style scoped>

</style>
