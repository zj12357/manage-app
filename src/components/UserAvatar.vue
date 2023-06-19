<script setup lang="ts">
import default_avatar from '~/assets/images/user/default_avatar.png'

const props = defineProps({
  src: String,
  round: Boolean,
  class: String,
})
const common = useCommonStore()
</script>

<template>
  <van-image
    :round="props.round"
    :class="props.class"
    :src="props.src ? `${common.config.img_url}${props.src}` : default_avatar "
  />
</template>

<style scoped>

</style>
