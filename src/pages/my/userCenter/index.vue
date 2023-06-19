<script setup lang="ts">
const user = useUserStore()
</script>

<template>
  <div
    class="w-full"
  >
    <NavBar
      title="個人中心"
    />
    <div class="“w-full">
      <van-cell-group>
        <van-cell title="賬號" :value="user.userInfo.username" />
        <van-cell title="真實姓名" :value="user.userInfo.real_name" />
        <van-cell title="基本資料" is-link to="/my/userCenter/baseInfo" />
        <van-cell title="登錄密碼管理" is-link to="/my/userCenter/loginPassword" />
        <van-cell title="錢包管理" is-link to="/my/userCenter/payCard" />
        <van-cell title="交易密碼管理" is-link to="/my/userCenter/tradePassword" />
      </van-cell-group>
    </div>
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: user
</route>
