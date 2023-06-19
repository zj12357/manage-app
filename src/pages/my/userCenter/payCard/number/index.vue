<script setup lang="ts">
import { showSuccessToast } from 'vant'

const router = useRouter()
const { fetchGlobalUserInfo } = useGlobalData()

const state = reactive({
  remark: '',
  style: 'TRC20',
  wallet: '',
  trade_password: '',
  passwordStatus: false,
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
    showSuccessToast(res.msg)
    fetchGlobalUserInfo()
    toPage('/my/userCenter/payCard?id=0')
  }
}
</script>

<template>
  <div class="h-full w-full">
    <NavBar title="添加數字錢包" />
    <div class="w-full">
      <van-form @submit="onSubmit">
        <van-cell-group>
          <van-field
            v-model="state.remark"
            name="remark"
            label="別名名稱"
            required
            placeholder="請輸入別名名稱"
            :rules="[{ required: true, message: '請輸入別名名稱' }]"
          />

          <van-field label="虛擬幣協議" required name="style" :rules="[{ required: true, message: '請選擇虛擬幣協議' }]">
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
            label="虛擬幣地址"
            required
            placeholder="請輸入虛擬幣地址"
            :rules="[{ required: true, message: '請輸入虛擬幣地址' }]"
          />

          <van-field
            v-model="state.trade_password"
            :right-icon="!state.passwordStatus ? 'closed-eye' : 'eye-o'"
            :type="!state.passwordStatus ? 'password' : 'text'"
            name="trade_password"
            label="交易密碼"
            required
            placeholder="請填寫交易密碼"
            maxlength="6"
            :rules="[{ required: true, message: '請填寫交易密碼' }, { pattern: /^\d{6}$/, message: '請填寫6位數字交易密碼' }]"
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
    .van-field__right-icon {
        i {
            font-size: 20px;
        }
    }
}
</style>

<route lang="yaml">
meta:
  layout: user
</route>
