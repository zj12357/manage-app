<script setup lang="ts">
import { showNotify } from 'vant'
import avatar from '~/assets/images/user/avatar.png'

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
async function onSubmit(values: any) {
  const res = await updateUserInfo({
    real_name: values.real_name,
    mobile: values.mobile,
    nickname: values.nickname,
  })
  if (res.code === 200) {
    showNotify({
      type: 'success',
      message: res.msg,
    })
    fetchGlobalUserInfo()
    toPage('/my/userCenter')
  }
}
</script>

<template>
  <div class="h-full w-full">
    <NavBar title="基本资料" />
    <div class="w-full bg-white pb-[40px]">
      <div class="w-full flex-col-center pt-[20px]">
        <van-image
          round
          class="h-[64px] w-[64px]"
          :src="user.userInfo.url_img || avatar"
        />
        <span class="mb-[16px] mt-[8px] font-500">完善基本资料</span>
      </div>

      <van-form class="mt-[20px]" @submit="onSubmit">
        <van-cell-group>
          <van-field
            v-model="userInfo.real_name"
            label="真实姓名"
            placeholder="请填写真实姓名"
            required
            name="real_name"
            :rules="[{ required: true, message: '请填写真实姓名' }]"
            :disabled="user.userInfo.real_name"
          />
          <van-field
            v-model="userInfo.nickname"
            name="nickname"
            label="用户昵称"
            placeholder="请填写用户昵称"
            :rules="[{ required: true, message: '请填写用户昵称' }]"
          />
          <van-field
            v-model="userInfo.mobile"
            name="mobile"
            label="手机号码"
            placeholder="请填写手机号码"
            :rules="[{ pattern: /^\d*$/, message: '请填写数字' }, { required: true, message: '请填写手机号码' }]"
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
