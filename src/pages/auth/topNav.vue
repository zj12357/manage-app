<script setup lang="ts">
import authKf from '~/assets/images/icons/icon_auth_kf.png'

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="fixed left-0 right-0 top-0 z-[9] h-[50px] w-full flex-between-center pl-[6px] pr-[10px] text-white">
    <div class="flex-center" @click="goHome">
      <div i-carbon:chevron-left class="text-xl font-500"></div>
      <div class="text-md">
        返回首页
      </div>
    </div>
    <div class="flex-center">
      <img :src="authKf" class="mr-[4px] w-[28px]" alt="" />
      <a href="http://" target="_blank" rel="noopener noreferrer" class="text-sm text-white">联系客服</a>
    </div>
  </div>
</template>

<style scoped>

</style>
