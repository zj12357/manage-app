<script setup lang="ts">
import { showConfirmDialog, showSuccessToast } from 'vant'

const user = useUserStore()
const { fetchGlobalUserInfo } = useGlobalData()
const router = useRouter()
const userInfo = reactive({
  real_name: user.userInfo.real_name,
  mobile: user.userInfo.mobile,
  nickname: user.userInfo.nickname,
})

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

async function onSubmit(values: any) {
  const res = await updateUserInfo({
    real_name: values.real_name,
    mobile: values.mobile,
    nickname: values.nickname,
  })
  if (res.code === 200) {
    showSuccessToast(res.msg)

    fetchGlobalUserInfo()
    if (!user.userInfo.trade_password) {
      showConfirmDialog({
        title: '溫馨提示',
        message: '您還未設置交易密碼',
        className: 'app-dialog',
        confirmButtonText: '確定',
      }).then((result) => {
        router.push('/my/userCenter/tradePassword')
      })
    }
    else {
      toPage('/my/userCenter/payCard')
    }
  }
}
</script>

<template>
  <div class="h-full w-full">
    <NavBar title="基本資料" />
    <div class="w-full bg-white pb-[40px]">
      <div class="w-full flex-col-center pt-[20px]">
        <van-uploader :after-read="afterRead">
          <UserAvatar
            round
            class="h-[64px] w-[64px]"
            :src="user.userInfo.url_img"
          />
        </van-uploader>

        <span class="mb-[16px] mt-[8px] font-500">完善基本資料</span>
      </div>

      <van-form class="mt-[20px]" @submit="onSubmit">
        <van-cell-group>
          <van-field
            v-model="userInfo.real_name"
            label="真實姓名"
            placeholder="請填寫真實姓名"
            required
            name="real_name"
            :rules="[{ required: true, message: '請填寫真實姓名' }]"
            :disabled="user.userInfo.real_name"
          />
          <van-field
            v-model="userInfo.nickname"
            name="nickname"
            label="用戶暱稱"
            placeholder="請填寫用戶暱稱"
            :rules="[{ required: true, message: '請填寫用戶暱稱' }]"
          />
          <van-field
            v-model="userInfo.mobile"
            name="mobile"
            label="手機號碼"
            placeholder="請填寫手機號碼"
            :rules="[{ pattern: /^\d*$/, message: '請填寫數字' }, { required: true, message: '請填寫手機號碼' }]"
          />
        </van-cell-group>
        <div class="mt-[20px] w-full flex-center">
          <div class="w-[300px]">
            <van-button round block type="primary" native-type="submit">
              提交
            </van-button>
          </div>
        </div>
      </van-form>
    </div>
  </div>
</template>

<style scoped></style>

<route lang="yaml">
meta:
  layout: user
</route>
