<script setup lang="ts">

</script>

<template>
  <div
    class="w-full"
  >
    <NavBar
      title="个人中心"
    />
    <div class="“w-full">
      <van-cell-group>
        <van-cell title="账号" value="内容" />
        <van-cell title="真实姓名" value="内容" />
        <van-cell title="基本资料" is-link to="/my/userCenter/baseInfo" />
        <van-cell title="登录密码管理" is-link to="/my/userCenter/loginPassword" />
        <van-cell title="卡片管理" is-link to="/my/userCenter/payCard" />
        <van-cell title="交易密码管理" is-link to="/my/userCenter/tradePassword" />
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
