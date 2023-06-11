<script setup lang="ts">
import kefu from '~/assets/images/icons/icon_chat_kf.png'

const common = useCommonStore()
const config = computed(() => common.config)
const showChat = ref(true)

function switchChat(show: boolean) {
  showChat.value = show
}
</script>

<template>
  <div class="h-full w-full">
    <NavBar
      title="客服"
    />

    <div class="relative w-full" :style="{ height: `calc(100% - ${pxToVw(110)})` }">
      <div v-if="showChat" class="h-full w-full">
        <div text-3xl class="absolute right-[10px] top-[10px] z-[9px]" @click="switchChat(false)">
          <div i-carbon-close inline-block></div>
        </div>

        <iframe :src="config.kefu_link" frameborder="0" class="h-full w-full"></iframe>
      </div>
      <div v-else class="absolute bottom-[20px] right-[20px]" @click="switchChat(true)">
        <img :src="kefu" class="w-[75px]" alt="" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
