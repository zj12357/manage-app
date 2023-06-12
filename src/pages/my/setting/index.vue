<script setup lang="ts">
import { showConfirmDialog } from 'vant'

function clearCache() {
  showConfirmDialog({
    title: '温馨提示',
    message:
    '您确定要消除缓存吗？',
    className: 'app-dialog',
  })
    .then((result) => {
      console.log(result)
    })
}
</script>

<template>
  <div class="h-full w-full">
    <NavBar title="设置" />
    <div class="“w-full">
      <van-cell-group>
        <van-cell title="语言设置" value="简体中文" />
        <van-cell title="清除缓存" is-link value="清除缓存" @click="clearCache()" />
        <van-cell title="当前版本" value="v12.06" />
      </van-cell-group>
    </div>
    <div class="mt-[60px] w-full flex-center">
      <div class="w-[300px]">
        <van-button round block type="primary" native-type="submit">
          退出登录
        </van-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
 :deep(.van-dialog) {
    width: 260px;
 }
 .van-dialog{
    width: 260px;
 }
</style>
