<script setup lang="ts">
import { showFailToast, showSuccessToast } from 'vant'
import QrcodeVue from 'qrcode.vue'
import copy from 'copy-to-clipboard'
import icon_number_card from '~/assets/images/icons/icon_number_card.png'
import card_active from '~/assets/images/user/card_active.png'

const amountList = [
  '500',
  '5000',
  '10000',
  '20000',
  '50000',
  '100000',
  '200000',
  '500000',
]
const usdtList = ['TRC20', 'ERC20']
const user = useUserStore()
const common = useCommonStore()
const router = useRouter()
const state = reactive({
  currentAmount: '',
  currentUsdt: 'TRC20',
  money: '',
  isNext: false,
  ustd_link: common.config.usdt_trc20,
})
function handleUstd(val: string) {
  state.currentUsdt = val
  state.ustd_link = val === 'TRC20' ? common.config.usdt_trc20 : common.config.usdt_erc
}
function handleAmount(val: string) {
  state.currentAmount = val
  state.money = val
}
function toPage(path: string) {
  router.push(path)
}
async function onSubmit() {
  const res = await userRecharge({
    name: user.userInfo.real_name,
    money: state.money,
    style: 2,
  })
  if (res.code === 200) {
    showSuccessToast(res.msg)
    toPage('/my/rechargeRecord')
  }
}

function toNext() {
  if (!state.money) {
    showFailToast('請填寫充值金額')
    return
  }

  if (!isPositiveInteger.test(state.money)) {
    showFailToast('請填寫正整數')
  }
  else if (
    !(
      +common.config.depost_min <= +state.money
            && +state.money <= +common.config.depost_max
            && +state.money > 0
    )
  ) {
    showFailToast(
            `單筆存入範圍：${common.config.depost_min} - ${common.config.depost_max}`,
    )
  }
  else {
    state.isNext = true
  }
}
function handleCopy(val: string) {
  copy(val)
  showSuccessToast('複製成功')
}
</script>

<template>
  <div class="h-full w-full bg-white">
    <NavBar title="數字貨幣存入" />
    <van-form @submit="onSubmit">
      <div v-if="!state.isNext" class="w-full p-[20px]">
        <h2 class="mb-[15px] text-md">
          存入類型
        </h2>

        <div class="flex-between-center border-b-solid border-light pb-[20px]">
          <div
            v-for="(item, index) in usdtList"
            :key="index"
            class="relative h-[78px] w-[162px] flex-center border-[1px] border-[#8f8f8f] rounded-[8px] border-solid"
            :class="state.currentUsdt === item && 'border-primary'"
            @click="handleUstd(item)"
          >
            <img :src="icon_number_card" class="w-[56px]" alt="" />
            <div class="ml-[6px]">
              <p class="mb-[4px]">
                USDT
              </p>
              <p>{{ item }}</p>
            </div>
            <img
              v-if="state.currentUsdt === item"
              :src="card_active"
              class="absolute bottom-0 right-0 w-[24px]"
              alt=""
            />
          </div>
        </div>
        <div class="flex-start-center-warp py-[20px]">
          <div
            v-for="(item, index) in amountList"
            :key="index"
            class="mb-[14px] w-[25%] flex-center"
            @click="handleAmount(item)"
          >
            <div
              class="h-[30px] w-[72px] flex-center rounded-[8px] shadow-base"
              :class="
                state.currentAmount === item && 'bg-primary text-white'
              "
            >
              {{ item }}
            </div>
          </div>
        </div>
        <van-field
          v-model="state.money"
          name="money"
          label="存入金額"
          placeholder="請填寫存入金額"
          :rules="[
            { required: true, message: '請填寫存入金額' },
            { pattern: isPositiveInteger, message: '請填寫正整數' },
            {
              validator: (val) => {
                return (
                  +common.config.depost_min <= +val
                  && +val <= +common.config.depost_max
                  && +val > 0
                );
              },
              message: `單筆存入範圍：${common.config.depost_min} - ${common.config.depost_max}`,
            },
          ]"
          @update:model-value="(value:any) => {
            state.money = value.replace(/\D/g, '')
          }"
        />
        <div v-if="state.money" class="my-[14px] w-full text-assist5">
          <p class="mb-[4px]">
            存入金额：
            <span>{{ state.money }}USDT ≈ </span>
            <span class="text-primary">{{
              `${(
                Number(state.money) * Number(common.config.usdt_rate)
              ).toFixed(4)}`
            }}CNY</span>
          </p>
          <p>参考汇率为1USDT ≈ {{ `${common.config.usdt_rate}` }}CNY</p>
        </div>
        <div class="mt-[30px] w-full flex-center">
          <div class="w-[300px]">
            <van-button round block type="primary" @click="toNext">
              下一步
            </van-button>
          </div>
        </div>

        <div class="mt-[30px] flex-center text-sm">
          <span>點擊下一步獲取地址錢包，存入遇到問題，請聯繫</span>
          <a :href="common.config.kefu_link" class="text-primary">在線客服</a>。
        </div>
      </div>
      <div v-else class="w-full p-[20px]">
        <p class="mb-[4px] text-md">
          USDT錢包地址
        </p>
        <p>下方產生錢包地址掃描QR碼或者<span class="text-primary">複製</span></p>
        <div class="mt-[40px] flex-between-center">
          <QrcodeVue
            :value="state.ustd_link"
            level="H"
            class="!h-[130px] !w-[130px]"
          />
          <div class="w-[180px] flex-col-center">
            <div class="break-all bg-assist9 p-[10px]">
              {{ state.ustd_link }}
            </div>
            <div
              class="mt-[20px] rounded-[4px] bg-primary px-[12px] py-[6px] text-white"
              @click="handleCopy(state.ustd_link)"
            >
              複製
            </div>
          </div>
        </div>
        <div class="mb-[20px] mt-[60px] w-full flex-center">
          <div class="w-[300px]">
            <van-button round block type="primary" native-type="submit">
              請完成支付後，提交訂單
            </van-button>
          </div>
        </div>
        <div class="w-full p-[20px]">
          <div class="w-full rounded-[8px] bg-white p-[20px] shadow-base">
            <div class="mb-[14px] flex-start-center">
              <p>存入金額：</p>
              <span>{{ state.money }}USDT</span>
              <span class="mx-[4px]">≈</span>
              <span class="text-primary">{{
                `${(
                  Number(state.money) * Number(common.config.usdt_rate)
                ).toFixed(2)}`
              }}</span>
            </div>
            <div class="mb-[14px] flex-start-center">
              <p>實際金額：</p>
              <span class="text-primary">{{
                `${(
                  Number(state.money) * Number(common.config.usdt_rate)
                ).toFixed(2)}`
              }}</span>
            </div>
            <p class="text-primary">
              交易所可能會收取手續費，交易所可能會收取手續費，交易所可能會收取手續費
            </p>
          </div>
        </div>
        <div class="mt-[20px] flex-center text-sm">
          存入遇到問題？請聯繫
          <a
            :href="common.config.kefu_link"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary"
          >在線客服</a>
        </div>
      </div>
    </van-form>
  </div>
</template>

<style scoped lang="scss">
:deep() {
    .van-cell {
        padding: 16px 0px;
        border-bottom: 1px solid #ebedf0;
    }
    .van-cell:after {
        border: none;
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
