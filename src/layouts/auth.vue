<script setup lang="ts">
import logoAuth from '~/assets/images/auth/logo_auth.png'
import authKf from '~/assets/images/icons/icon_auth_kf.png'

const common = useCommonStore()
const router = useRouter()

function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="h-full w-full text-base text-assist1">
    <div class="min-h-full w-full overflow-auto bg-primary">
      <div class="w-full pl-[15px] pt-[50px]">
        <div
          class="fixed left-0 right-0 top-0 z-[9] h-[50px] w-full flex-between-center pl-[6px] pr-[10px] text-white"
        >
          <div class="flex-center" @click="goHome">
            <div i-carbon:chevron-left class="text-xl font-500"></div>
            <div class="text-md">
              返回首页
            </div>
          </div>
          <div class="flex-center">
            <img :src="authKf" class="mr-[4px] w-[28px]" alt="" />
            <a
              :href="common.config.kefu_link"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm text-white"
            >联系客服</a>
          </div>
        </div>
        <div class="mt-[25px] w-full">
          <img :src="logoAuth" class="w-[144px]" alt="" />
          <p class="mt-[20px] text-lg text-white">
            宁银理财，您赢未来
          </p>
        </div>
        <div class="pl-[10px]">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
