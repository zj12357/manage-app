<script>
import { computed, ref } from 'vue'

export default {
  name: '',
  setup() {
    const state = ref({})

    const computedValue = computed(() => {
      return state.value
    })

    function updateState() {
      // implementation
    }

    return {
      state,
      computedValue,
      updateState,
    }
  },
}
</script>

<template>
  <div>222</div>
</template>

<style scoped>

</style>
