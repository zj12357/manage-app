<script setup lang="ts">
import { showNotify } from 'vant'
import QrcodeVue from 'qrcode.vue'
import copy from 'copy-to-clipboard'
import numberCard from '~/assets/images/icons/icon_number_card.png'

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
    showNotify({
      type: 'success',
      message: res.msg,
    })
    toPage('/my/rechargeRecord')
  }
}

function toNext() {
  if (!state.money) {
    showNotify({
      type: 'danger',
      message: '请填写充值金额',
    })
  }
  else {
    state.isNext = true
  }
}
function handleCopy(val: string) {
  copy(val)
  showNotify({
    type: 'success',
    message: '复制成功',
  })
}
</script>

<template>
  <div class="h-full w-full bg-white">
    <NavBar title="数字货币存入" />
    <van-form @submit="onSubmit">
      <div v-if="!state.isNext" class="w-full p-[20px]">
        <h2 class="mb-[15px] text-md">
          存款金额
        </h2>

        <div class="flex-between-center border-b-solid border-light pb-[20px]">
          <div
            v-for="(item, index) in usdtList"
            :key="index"
            class="relative h-[78px] w-[162px] flex-center border-[1px] border-[#8f8f8f] rounded-[8px] border-solid"
            :class="state.currentUsdt === item && 'border-primary'"
            @click="handleUstd(item)"
          >
            <img :src="numberCard" class="w-[56px]" alt="" />
            <div class="ml-[6px]">
              <p class="mb-[4px]">
                USDT
              </p>
              <p>{{ item }}</p>
            </div>
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
          label="存入金额"
          placeholder="请填写存入金额"
          :rules="[
            { required: true, message: '请填写存入金额' },
            {
              validator: (val) => {
                return (
                  common.config.depost_min <= val
                  && val <= common.config.depost_max
                );
              },
              message: `单笔存入范围：${common.config.depost_min} - ${common.config.depost_max}`,
            },
          ]"
        />
        <div class="mt-[30px] w-full flex-center">
          <div class="w-[300px]">
            <van-button round block type="primary" @click="toNext">
              下一步
            </van-button>
          </div>
        </div>

        <div class="mt-[30px] flex-center text-sm">
          <span>点击下一步获取地址钱包，存入遇到问题，请联系</span>
          <a :href="common.config.kefu_link" class="text-primary">在线客服</a>。
        </div>
      </div>
      <div v-else class="w-full p-[20px]">
        <p class="mb-[4px] text-md">
          USDT钱包地址
        </p>
        <p>下方产生钱包地址扫描QR码或者<span class="text-primary">复制</span></p>
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
              复制
            </div>
          </div>
        </div>
        <div class="mb-[20px] mt-[60px] w-full flex-center">
          <div class="w-[300px]">
            <van-button round block type="primary" native-type="submit">
              请完成支付后，提交订单
            </van-button>
          </div>
        </div>
        <div class="w-full p-[20px]">
          <div class="w-full rounded-[8px] bg-white p-[20px] shadow-base">
            <div class="mb-[14px] flex-start-center">
              <p>存入金额：</p>
              <span>{{ state.money }}USDT</span>
              <span class="mx-[4px]">≈</span>
              <span class="text-primary">{{
                `${(
                  Number(state.money) * Number(common.config.usdt_rate)
                ).toFixed(2)}`
              }}</span>
            </div>
            <div class="mb-[14px] flex-start-center">
              <p>实际金额：</p>
              <span class="text-primary">{{
                `${(
                  Number(state.money) * Number(common.config.usdt_rate)
                ).toFixed(2)}`
              }}</span>
            </div>
            <p class="text-primary">
              交易所可能会收取手续费，交易所可能会收取手续费，交易所可能会收取手续费
            </p>
          </div>
        </div>
        <div class="mt-[20px] flex-center text-sm">
          存入遇到问题？请联系
          <a
            :href="common.config.kefu_link"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary"
          >在线客服</a>
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
