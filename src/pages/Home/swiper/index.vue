<script setup lang="ts">
const carouselList = ref<any>([])

const common = useCommonStore()
async function fetchGetCarousels() {
  const res = await getCarousels()
  if (res.code === 200)
    carouselList.value = res.data?.data ?? []
}
onMounted(() => {
  fetchGetCarousels()
})
</script>

<template>
  <div class="w-full flex-center p-[20px]">
    <van-swipe class="h-[120px] w-full rounded-[8px]" :autoplay="3000" indicator-color="#269E89">
      <van-swipe-item v-for="(item, index) in carouselList" :key="index" class="rounded-[8px] bg-primary">
        <van-image
          class="img-cover rounded-[8px]"
          :src="`${common.config.img_url}${item.image}`"
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
