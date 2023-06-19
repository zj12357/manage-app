<script setup lang="ts">
import { showSuccessToast } from 'vant'

const router = useRouter()
const user = useUserStore()
const state = reactive({
  card_name: user.userInfo.real_name,
  card_number: '',
  start_bank: '',
  province: '',
  city: '',
  branch_name: '',
  trade_password: '',
  passwordStatus: false,
})

function toPage(path: string) {
  router.push(path)
}
async function onSubmit(values: any) {
  console.log('submit', values)
  const res = await addCard({
    card_name: values.card_name,
    card_number: values.card_number,
    start_bank: values.start_bank,
    province: values.province,
    city: values.city,
    branch_name: values.branch_name,
    trade_password: values.trade_password,
  })
  if (res.code === 200) {
    showSuccessToast(res.msg)
    toPage('/my/userCenter/payCard?id=0')
  }
}
</script>

<template>
  <div class="h-full w-full">
    <NavBar title="添加银行卡" />
    <div class="w-full">
      <van-form @submit="onSubmit">
        <van-cell-group>
          <van-field
            v-model="state.card_name"
            name="card_name"
            label="姓名"
            required
            placeholder="请输入持卡人姓名"
            :rules="[{ required: true, message: '请输入持卡人姓名' }]"
          />
          <van-field
            v-model="state.card_number"
            name="card_number"
            label="卡号"
            required
            placeholder="请输入银行卡号"
            :rules="[{ required: true, message: '请输入银行卡号' }]"
          />
          <van-field
            v-model="state.start_bank"
            name="start_bank"
            label="开户行"
            required
            placeholder="请输入开户银行"
            :rules="[{ required: true, message: '请输入开户银行' }]"
          />
          <van-field
            v-model="state.province"
            name="province"
            label="开户省份"
            placeholder="请输入开户省份"
          />
          <van-field
            v-model="state.city"
            name="city"
            label="开户城市"
            placeholder="请输入开户城市"
          />
          <van-field
            v-model="state.branch_name"
            name="branch_name"
            label="支行名称"
            placeholder="如:湖北武汉市工商银行某某支行"
          />
          <van-field
            v-model="state.trade_password"
            :right-icon="!state.passwordStatus ? 'closed-eye' : 'eye-o'"
            :type="!state.passwordStatus ? 'password' : 'text'"
            name="trade_password"
            label="交易密码"
            required
            placeholder="请填写交易密码"
            maxlength="6"
            :rules="[{ required: true, message: '请填写交易密码' }, { pattern: /^\d{6}$/, message: '请填写6位数字交易密码' }]"
            @click-right-icon="state.passwordStatus = !state.passwordStatus"
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

<style scoped lang="scss">
:deep() {
    .van-cell {
        padding: 16px 0px;
    }
    .van-field__label {
        width: auto;
    }
}
</style>

<route lang="yaml">
meta:
  layout: user
</route>
