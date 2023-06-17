<script setup lang="ts">
import { showNotify } from 'vant'

const user = useUserStore()
const router = useRouter()
const { fetchGlobalUserInfo } = useGlobalData()
const state = reactive({
  trade_password: '',
  new_trade_password: '',
  confirm_trade_password: '',
})

function toPage(path: string) {
  router.push(path)
}

async function onSubmit(values: any) {
  if (!user.userInfo.trade_password) {
    const res = await addTradePassword({
      trade_password: values.new_trade_password,
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
  else {
    const res = await updateTradePassword({
      new_trade_password: values.new_trade_password,
      trade_password: values.trade_password,
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
}
</script>

<template>
  <div class="h-full w-full">
    <NavBar title="交易密码管理" />
    <div class="w-full">
      <van-form @submit="onSubmit">
        <van-cell-group>
          <van-field
            v-if="user.userInfo.trade_password"
            v-model="state.trade_password"
            type="password"
            name="trade_password"
            label="旧交易密码"
            required
            placeholder="请填写旧交易密码"
            maxlength="6"
            :rules="[{ required: true, message: '请填写旧交易密码' }, { pattern: /^\d{6}$/, message: '请填写6位数字交易密码' }]"
          />
          <van-field
            v-model="state.new_trade_password"
            type="password"
            name="new_trade_password"
            label="新交易密码"
            required
            placeholder="请填写新交易密码"
            maxlength="6"
            :rules="[{ required: true, message: '请填写新交易密码' }, { pattern: /^\d{6}$/, message: '请填写6位数字交易密码' }]"
          />
          <van-field
            v-model="state.confirm_trade_password"
            type="password"
            name="confirm_trade_password"
            label="确认密码"
            required
            placeholder="请填写确认密码"
            :rules="[
              { required: true, message: '请填写确认密码' },
              {
                validator: (val) => {
                  return val === state.new_trade_password;
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
