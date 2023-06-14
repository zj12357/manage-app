<script setup lang="ts">
const props = defineProps({
  title: String,
})
const router = useRouter()
function goBack() {
  router.back()
}
</script>

<template>
  <div class="w-full">
    <van-nav-bar
      :title="props.title"
      left-arrow
      fixed
      @click-left="goBack"
    />
  </div>
</template>

<style scoped>

</style>
