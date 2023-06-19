<script lang="ts" setup>
const props = defineProps({
  room: {
    type: Object,
    default: () => ({}),
  },
})
console.log(props.room, 'asdf')

function randomCount() {
  const num = Math.floor(Math.random() * 19 + 1)
  changeShowValue(num)
}
const showValue = ref(props.room.scope_big)
function changeShowValue(num: number) {
  const total = showValue.value + num
  if (total - props.room.scope_max > 0) {
    showValue.value = props.room.scope_big
    randomCount()
  }
  else {
    showValue.value = total
    startLoop()
  }
}
randomCount()
function startLoop() {
  setTimeout(() => {
    randomCount()
  }, 5000)
}
</script>

<template>
  <span>交易人數：{{ showValue }}</span>
</template>

<style lang="scss" scoped></style>
