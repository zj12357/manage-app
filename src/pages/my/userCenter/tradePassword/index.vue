<script setup lang="ts">
const passwordInfo = reactive({
  trade_password: '',
  new_trade_password: '',
  confirm_trade_password: '',
})

function onSubmit(values: any) {
  console.log('submit', values)
}
</script>

<template>
  <div class="h-full w-full">
    <NavBar title="交易密码管理" />
    <div class="w-full">
      <van-form @submit="onSubmit">
        <van-cell-group>
          <van-field
            v-model="passwordInfo.trade_password"
            type="password"
            name="password"
            label="旧交易密码"
            required
            placeholder="请填写旧交易密码"
            :rules="[{ required: true, message: '请填写旧交易密码' }]"
          />
          <van-field
            v-model="passwordInfo.new_trade_password"
            type="password"
            name="new_trade_password"
            label="新交易密码"
            required
            placeholder="请填写新交易密码"
            :rules="[{ required: true, message: '请填写新交易密码' }]"
          />
          <van-field
            v-model="passwordInfo.confirm_trade_password"
            type="password"
            name="confirm_trade_password"
            label="确认密码"
            required
            placeholder="请填写确认密码"
            :rules="[{ required: true, message: '请填写确认密码' }]"
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
