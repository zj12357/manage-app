<script setup lang="ts">
import setting from '~/assets/images/icons/icon_setting.png'
import edit from '~/assets/images/icons/icon_edit.png'

const router = useRouter()
function toPage(path: string) {
  router.push(path)
}
</script>

<template>
  <div class="h-[285px] w-full bg-center-cover p-[20px]" style="background-image: linear-gradient(180deg, #fff 9%, #fae0af 43%, #ffd5b3);">
    <div class="flex-between-center">
      <div class="flex-center">
        <van-image
          round
          class="h-[34px] w-[34px]"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        />
        <span class="mx-[6px] max-w-[120px] text-nowrap-ellipsis text-lg text-assist3">asdasddasdasdasd000</span>
        <img :src="edit" alt="" class="w-[16px]" @click="toPage('/my/userCenter')" />
      </div>
      <img :src="setting" class="w-[24px]" alt="" @click="toPage('/my/setting')" />
    </div>
    <div class="mt-[10px] w-full flex-col-center">
      <van-image
        round
        class="h-[60px] w-[60px]"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      />
      <h2 class="mt-[10px] text-[24px] font-500 text-assist3">
        宁银理财 &nbsp; 您赢未来
      </h2>
      <div class="mt-[25px] w-full flex-between-center">
        <div class="w-[50%] flex-col-center">
          <span class="mb-[4px] text-xs font-500">123123</span>
          <span class="text-assist5">123123</span>
        </div>
        <div class="w-[50%] flex-col-center">
          <span class="mb-[4px] text-xs font-500">12323</span>
          <span class="text-assist5">21323</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
