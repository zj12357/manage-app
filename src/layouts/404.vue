<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <main class="h-full w-full flex-col-center text-base text-assist1">
    <RouterView />
    <van-button type="primary" size="small" class="!mt-[20px]" @click="router.push('/')">
      返回首頁
    </van-button>
  </main>
</template>
