<script setup lang="ts">
const route = useRoute()
const fullHeight = ['/customer']

const isFull = ref(false)
watch(route, (newValue, oldValue) => {
  isFull.value = fullHeight.includes(newValue.path)
})
</script>

<template>
  <main class="h-full w-full text-base text-assist1">
    <div :class="isFull ? 'h-full w-full' : 'min-h-full w-full pb-[70px]' ">
      <RouterView />
    </div>
    <NavFooter />
  </main>
</template>
