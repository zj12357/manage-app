<script setup lang="ts">
import headerTitle from '~/assets/images/home/header_title.png'
</script>

<template>
  <div class="flex-between-center px-[10px] py-[8px]">
    <img :src="headerTitle" class="w-[114px]" alt="" />
    <div>
      <div class="flex-center rounded-[16px] bg-white p-[8px] text-assist2">
        <router-link to="/login" class="mx-[4px] text-base text-assist2 no-underline">
          登录
        </router-link>
        <span>/</span>
        <router-link to="/register" class="mx-[4px] text-base text-assist2 no-underline">
          注册
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
