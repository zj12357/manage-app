<script lang="ts" setup>
import userBalance from '~/assets/images/user/user_balance.png'

const totalBalance = ref('')
async function fetchData() {
  const { code, data } = await getUserBalance()
  if (code === 200)
    totalBalance.value = data.balance
}
onMounted(() => {
  fetchData()
})
</script>

<template>
  <div>
    <div
      class="m-auto h-[98px] w-[258px] bg-cover"
      :style="{ backgroundImage: `url(${userBalance})`, backgroundPosition: 'center' }"
    >
      <div class="flex flex-col pl-[20px] pt-[25px]">
        <span class="text-[18px] font-medium line-height-[15px]">資產總額</span>
        <span class="mt-[20px] text-[22px]">{{ totalBalance }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
