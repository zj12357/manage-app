<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <main class="h-full w-full flex-col-center">
    <RouterView />
    <van-button type="primary" size="small" class="!mt-[20px]" @click="router.push('/')">
      返回首页
    </van-button>
  </main>
</template>
