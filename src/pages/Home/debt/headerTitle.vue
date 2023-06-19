<script setup lang="ts">
import headerTitle from '~/assets/images/home/header_title.png'

const user = useUserStore()
</script>

<template>
  <div class="flex-between-center px-[10px] py-[8px]">
    <img :src="headerTitle" class="w-[114px]" alt="" />
    <div>
      <div v-if="userToken.getToken()" class="flex-center">
        <span class="mr-[4px] text-md text-white">{{ user.userInfo.username }}</span>
        <UserAvatar
          round
          class="h-[30px] w-[30px] flex-1"
          :src="user.userInfo.url_img"
        />
      </div>
      <div v-else class="flex-center rounded-[16px] bg-white p-[8px] text-primary">
        <router-link to="/auth/login" class="mx-[4px] text-base text-primary no-underline">
          登錄
        </router-link>
        <span>/</span>
        <router-link to="/auth/register" class="mx-[4px] text-base text-primary no-underline">
          註冊
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
