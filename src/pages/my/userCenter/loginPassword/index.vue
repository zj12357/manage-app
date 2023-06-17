<script setup lang="ts">
import { showNotify } from 'vant'

const router = useRouter()
const { fetchGlobalUserInfo } = useGlobalData()
const state = reactive({
  password: '',
  new_password: '',
  confirm_password: '',
})

function toPage(path: string) {
  router.push(path)
}

async function onSubmit(values: any) {
  const res = await updatePassword({
    password: values.password,
    new_password: values.new_password,
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
    <NavBar title="登录密码管理" />
    <div class="w-full">
      <van-form @submit="onSubmit">
        <van-cell-group>
          <van-field
            v-model="state.password"
            type="password"
            name="password"
            label="旧登录密码"
            required
            placeholder="请填写旧登录密码"
            :rules="[{ required: true, message: '请填写旧登录密码' }]"
          />
          <van-field
            v-model="state.new_password"
            type="password"
            name="new_password"
            label="新登录密码"
            required
            placeholder="请填写新登录密码"
            :rules="[{ required: true, message: '请填写新登录密码' }]"
          />
          <van-field
            v-model="state.confirm_password"
            type="password"
            name="confirm_password"
            label="确认密码"
            required
            placeholder="请填写确认密码"
            :rules="[
              { required: true, message: '请填写确认密码' },
              {
                validator: (val) => {
                  return val === state.new_password;
                },
                message: '两次密码输入不一致',
              },
            ]"
          />
        </van-cell-group>
        <div class="mt-[40px] w-full flex-center">
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
