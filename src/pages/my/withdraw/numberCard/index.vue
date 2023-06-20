<script setup lang="ts">
import { showConfirmDialog, showFailToast, showSuccessToast } from 'vant'
import balance from '../balance.vue'

const props = defineProps({
  wallet_id: String,
  isBindNumber: Boolean,
})

const { fetchGetUserBalance } = useGlobalData()
const time = ref()
const router = useRouter()
const common = useCommonStore()
const user = useUserStore()
const state = reactive({
  money: '',
  trade_password: '',
  passwordStatus: false,
})

async function getBalance() {
  time.value = setInterval(() => {
    fetchGetUserBalance()
  }, 3000)
}

async function onSubmit(values: any) {
  if (!props.isBindNumber) {
    showConfirmDialog({
      title: '溫馨提示',
      message: '您還沒有綁定數字錢包，確定去綁定嗎？',
      className: 'app-dialog',
    }).then((result) => {
      router.push('/my/userCenter/payCard?id=1')
    })
    return
  }
  if (!user.userInfo.balance) {
    showFailToast('餘額不足')
    return
  }

  const res = await userWithdraw({
    style: 2,
    money: values.money,
    trade_password: values.trade_password,
    wallet_id: props.wallet_id,
  })
  if (res.code === 200)
    showSuccessToast(res.msg)
}

onMounted(() => {
  getBalance()
})
onUnmounted(() => {
  clearInterval(time.value)
})
</script>

<template>
  <div class="w-full">
    <balance />
    <div class="w-full p-[20px]">
      <h2 class="mb-[10px] text-md">
        贖回金額
      </h2>
      <van-form @submit="onSubmit">
        <van-field
          v-model="state.money"
          class="app-money"
          name="money"
          label="￥"
          placeholder="請填寫贖回金額"
          :rules="[
            { required: true, message: '請填寫贖回金額' },
            { pattern: isPositiveInteger, message: '請填寫正整數' },
            {
              validator: (val) => {
                return (
                  +common.config.withdraw_min <= +val
                  && +val <= +common.config.withdraw_max
                );
              },
              message: `單筆贖回範圍：${common.config.withdraw_min} - ${common.config.withdraw_max}`,
            },
          ]"
          @update:model-value="(value:any) => {
            state.money = value.replace(/\D/g, '')
          }"
        />
        <div class="mt-[10px] w-full flex-start-center py-[10px] text-sm">
          <span class="text-assist7">單筆贖回範圍</span>
          <span class="text-primary">{{ common.config.withdraw_min }} -
            {{ common.config.withdraw_max }}</span>
        </div>
        <div class="mt-[10px] w-full border-b-solid border-light">
          <van-field
            v-model="state.trade_password"
            name="trade_password"
            :right-icon="!state.passwordStatus ? 'closed-eye' : 'eye-o'"
            :type="!state.passwordStatus ? 'password' : 'text'"
            label="交易密碼"
            placeholder="請填寫交易密碼"
            maxlength="6"
            :rules="[
              { required: true, message: '請填寫交易密碼' },
              { pattern: /^\d{6}$/, message: '請填寫6位數字交易密碼' },
            ]"
            @click-right-icon="state.passwordStatus = !state.passwordStatus"
          />
        </div>
        <div v-if="state.money" class="my-[14px] w-full text-assist5">
          <p class="mb-[4px]">
            预计到账：
            <span class="text-primary">{{
              (Number(state.money) / Number(common.config.usdt_rate)) .toFixed(4)
            }}</span>
            USDT
          </p>
          <p>参考汇率为1USDT ≈ {{ `${common.config.usdt_rate}` }}CNY</p>
        </div>

        <div class="mt-[30px] w-full flex-center">
          <div class="w-[300px]">
            <van-button round block type="primary" native-type="submit">
              提交
            </van-button>
          </div>
        </div>
      </van-form>
      <div class="light-[16px] mt-[40px] w-full lh-[18px] text-assist8">
        <p>溫馨提醒</p>
        <p class="mt-[8px]">
          1.每日贖回不受時間，額度，次數的限制
        </p>
        <p class="mt-[8px]">
          2.贖回過程中如果出現什麼問題，請及時聯繫
          <a
            :href="common.config.kefu_link"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary"
          >在線客服</a>
        </p>
      </div>
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
    .van-field__right-icon {
        i {
            font-size: 20px;
        }
    }
}
</style>
