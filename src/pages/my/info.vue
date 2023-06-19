<script setup lang="ts">
import { showSuccessToast } from 'vant'
import setting from '~/assets/images/icons/icon_setting.png'
import edit from '~/assets/images/icons/icon_edit.png'

const { fetchGlobalUserInfo } = useGlobalData()
const user = useUserStore()
const router = useRouter()
function toPage(path: string) {
  router.push(path)
}

async function afterRead(file: any) {
  const formData = new FormData()
  formData.append('avatar', file.file)
  const res = await uploadAvatar(formData)
  if (res.data.code === 200) {
    showSuccessToast(res.data.msg)
    fetchGlobalUserInfo()
  }
}
</script>

<template>
  <div class="h-[285px] w-full bg-center-cover p-[20px]" style="background-image: linear-gradient(0, #b5e0d6 0%, #ffffff 100%);">
    <div class="flex-between-center">
      <div class="flex-center">
        <UserAvatar
          round
          class="h-[34px] w-[34px]"
          :src="user.userInfo.url_img"
        />

        <span class="mx-[6px] max-w-[120px] text-nowrap-ellipsis text-lg text-assist3">{{ user.userInfo.username }}</span>
        <img :src="edit" alt="" class="w-[16px]" @click="toPage('/my/userCenter')" />
      </div>
      <img :src="setting" class="w-[24px]" alt="" @click="toPage('/my/setting')" />
    </div>
    <div class="mt-[10px] w-full flex-col-center">
      <van-uploader :after-read="afterRead">
        <UserAvatar
          round
          class="h-[60px] w-[60px]"
          :src="user.userInfo.url_img"
        />
      </van-uploader>
      <h2 class="mt-[10px] text-[24px] font-500 text-assist3">
        眾安基金 &nbsp; 您贏未來
      </h2>
      <div class="mt-[25px] w-full flex-between-center">
        <div class="w-[50%] flex-col-center">
          <span class="mb-[4px] text-xl font-500">{{ user.balance.toFixed(2) }}</span>
          <span class="text-assist5">持倉賬戶</span>
        </div>
        <div class="w-[50%] flex-col-center">
          <span class="mb-[4px] text-xl font-500">{{ user.userInfo.profit.toFixed(2) }}</span>
          <span class="text-assist5">今日盈虧</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
