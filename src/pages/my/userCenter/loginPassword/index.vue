<script setup lang="ts">
const passwordInfo = reactive({
  password: '',
  new_password: '',
  confirm_password: '',
})

function onSubmit(values: any) {
  console.log('submit', values)
}
</script>

<template>
  <div class="h-full w-full">
    <NavBar title="登录密码管理" />
    <div class="w-full">
      <van-form @submit="onSubmit">
        <van-cell-group>
          <van-field
            v-model="passwordInfo.password"
            type="password"
            name="password"
            label="旧登录密码"
            required
            placeholder="请填写旧登录密码"
            :rules="[{ required: true, message: '请填写旧登录密码' }]"
          />
          <van-field
            v-model="passwordInfo.new_password"
            type="password"
            name="new_password"
            label="新登录密码"
            required
            placeholder="请填写新登录密码"
            :rules="[{ required: true, message: '请填写新登录密码' }]"
          />
          <van-field
            v-model="passwordInfo.confirm_password"
            type="password"
            name="confirm_password"
            label="确定密码"
            required
            placeholder="请填写确定密码"
            :rules="[{ required: true, message: '请填写确定密码' }]"
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

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: user
</route>
