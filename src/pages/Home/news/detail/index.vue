<script setup lang="ts">
const router = useRouter()
function goBack() {
  router.back()
}
</script>

<template>
  <div class="w-full">
    <van-nav-bar
      title="活动资讯详情"
      left-arrow
      @click-left="goBack"
    />
    <div>
      <div>www</div>
      <div>wwww</div>
    </div>
  </div>
</template>

<style scoped>

</style>
