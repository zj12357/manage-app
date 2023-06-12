<script setup lang="ts">
const userInfo = reactive({
  userName: '1111',
  password: '',
  nickName: '',
})

function onSubmit(values: any) {
  console.log('submit', values)
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
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        />
        <span class="mb-[16px] mt-[8px] font-500">完善基本资料</span>
      </div>

      <van-form class="mt-[20px]" @submit="onSubmit">
        <van-cell-group>
          <van-field v-model="userInfo.userName" label="真实姓名" disabled />
          <van-field
            v-model="userInfo.nickName"
            name="nickName"
            label="用户昵称"
            placeholder="请填写用户昵称"
            :rules="[{ required: true, message: '请填写用户昵称' }]"
          />
          <van-field
            v-model="userInfo.password"
            type="password"
            name="password"
            label="密码"
            placeholder="请填写密码"
            :rules="[{ required: true, message: '请填写密码' }]"
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
