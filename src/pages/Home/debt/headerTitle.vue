<script setup lang="ts">
import headerTitle from '~/assets/images/home/header_title.png'
import avatar from '~/assets/images/user/avatar.png'

const user = useUserStore()
</script>

<template>
  <div class="flex-between-center px-[10px] py-[8px]">
    <img :src="headerTitle" class="w-[114px]" alt="" />
    <div>
      <div v-if="userToken.getToken()" class="flex-center">
        <span class="mr-[4px] text-md text-white">{{ user.userInfo.username }}</span>
        <van-image
          round
          class="w-[30px]"
          :src="user.userInfo.url_img || avatar"
        />
      </div>
      <div v-else class="flex-center rounded-[16px] bg-white p-[8px] text-assist2">
        <router-link to="/auth/login" class="mx-[4px] text-base text-assist2 no-underline">
          登录
        </router-link>
        <span>/</span>
        <router-link to="/auth/register" class="mx-[4px] text-base text-assist2 no-underline">
          注册
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
