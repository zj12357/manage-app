<script setup lang="ts">
import { showNotify } from 'vant'

const router = useRouter()
const { fetchGlobalUserInfo } = useGlobalData()

const state = reactive({
  remark: '',
  style: 'TRC20',
  wallet: '',
  trade_password: '',
})

function toPage(path: string) {
  router.push(path)
}

async function onSubmit(values: any) {
  const res = await addWallet({
    remark: values.remark,
    style: values.style,
    wallet: values.wallet,
    trade_password: values.trade_password,
  })
  if (res.code === 200) {
    showNotify({
      type: 'success',
      message: res.msg,
    })
    fetchGlobalUserInfo()
    toPage('/my/userCenter/payCard?id=0')
  }
}
</script>

<template>
  <div class="h-full w-full">
    <NavBar title="添加数字钱包" />
    <div class="w-full">
      <van-form @submit="onSubmit">
        <van-cell-group>
          <van-field
            v-model="state.remark"
            name="remark"
            label="别名名称"
            required
            placeholder="请输入别名名称"
            :rules="[{ required: true, message: '请输入别名名称' }]"
          />

          <van-field label="虚拟币协议" required name="style" :rules="[{ required: true, message: '请选择虚拟币协议' }]">
            <template #input>
              <van-radio-group v-model="state.style" direction="horizontal">
                <van-radio name="TRC20">
                  TRC20
                </van-radio>
                <van-radio name="ERC20">
                  ERC20
                </van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field
            v-model="state.wallet"
            name="wallet"
            label="虚拟币地址"
            required
            placeholder="请输入虚拟币地址"
            :rules="[{ required: true, message: '请输入虚拟币地址' }]"
          />

          <van-field
            v-model="state.trade_password"
            type="password"
            name="trade_password"
            label="交易密码"
            required
            placeholder="请填写交易密码"
            maxlength="6"
            :rules="[{ required: true, message: '请填写交易密码' }, { pattern: /^\d{6}$/, message: '请填写6位数字交易密码' }]"
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

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: user
</route>
