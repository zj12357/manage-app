<script setup lang="ts">
const props = defineProps({
  title: String,
  rightText: String,
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
      :right-text="rightText"
      @click-left="goBack"
    />
  </div>
</template>

<style scoped>

</style>
