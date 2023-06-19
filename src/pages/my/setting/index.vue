<script setup lang="ts">
import { showConfirmDialog, showSuccessToast } from 'vant'

const common = useCommonStore()
const router = useRouter()

function toPage(path: string) {
  router.push(path)
}
function clearCache() {
  showConfirmDialog({
    title: '溫馨提示',
    message: '您確定要清除緩存嗎？',
    className: 'app-dialog',
    confirmButtonText: '確定',
  }).then((result) => {
    common.setInitLoad(true)
  })
}

async function fetchUserLoginOut() {
  const res = await userLoginOut()
  if (res.code === 200) {
    showSuccessToast(res.msg)
    userToken.clearToken()
    toPage('/')
  }
}
</script>

<template>
  <div class="w-full">
    <NavBar title="設置" />
    <div class="“w-full">
      <van-cell-group>
        <van-cell title="語言設置" value="繁體中文" />
        <van-cell
          title="清除緩存"
          is-link
          value="清除緩存"
          @click="clearCache()"
        />
        <van-cell title="當前版本" value="v12.06" />
      </van-cell-group>
    </div>
    <div class="mt-[60px] w-full flex-center">
      <div class="w-[300px]">
        <van-button round block type="primary" native-type="submit" @click="fetchUserLoginOut">
          退出登錄
        </van-button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<route lang="yaml">
meta:
  layout: user
</route>
