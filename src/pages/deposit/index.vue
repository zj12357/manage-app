<script setup lang="ts">
import { showFailToast, showSuccessToast } from 'vant'
import userBalance from '~/assets/images/user/user_balance.png'
import depositBg from '~/assets/images/trade/deposit_bg.png'

const investInfo = ref<any>(null)
async function fetchData() {
  const { code, data } = await getInvestMents()
  if (code === 200)
    investInfo.value = data
}

const totalBalance = ref('0.00')
async function fetchTotalBalance() {
  const { code, data } = await getUserBalance()
  if (code === 200)
    totalBalance.value = data.balance
}
const commonStore = useCommonStore()
const rateMap = {
  oneDay: {
    rate: commonStore.config.one_day_rate,
    limit: commonStore.config.one_day_limit,
  },
  fifteen: {
    rate: commonStore.config.fifteen_day_rate,
    limit: commonStore.config.fifteen_day_limit,
  },
}

// 定期存入
const isValidate = ref(true)
const oneday = ref(null)
const fifteen = ref(null)
const onedayIncome = computed(() => oneday.value ? (oneday.value * rateMap.oneDay.rate / 100).toFixed(2) : '0.00')
const fifteenIncome = computed(() => fifteen.value ? (fifteen.value * rateMap.fifteen.rate / 100).toFixed(2) : '0.00')
function validate(type: string) {
  const rate = type === 'oneday' ? rateMap.oneDay : rateMap.fifteen
  const value = (type === 'oneday' ? oneday.value : fifteen.value) || 0
  isValidate.value = value - rate.limit >= 0
  if (!isValidate.value)
    showFailToast(`該套餐最低存入${rate.limit}`)
}
// 转出
const router = useRouter()
function toDepositRecord() {
  router.push({
    path: '/my/terminalRecord',
  })
}
// 当前是哪一种
const depositType = ref(1)
// 转入
async function moveIn() {
  const money = depositType.value === 1 ? oneday.value : fifteen.value
  if (!money) {
    showFailToast('请输入金额')
    return
  }
  validate(depositType.value === 1 ? 'oneday' : 'fifteen')
  if (!isValidate.value)
    return
  const { code, msg } = await depositIn({
    money,
    duration: depositType.value === 1 ? investInfo.value.one_day : investInfo.value.fifteen_day,
  })
  if (code === 200) {
    showSuccessToast(msg)
    router.push({
      path: '/my/terminalRecord',
    })
  }
}

onMounted(() => {
  fetchTotalBalance()
  fetchData()
})
</script>

<template>
  <div class="body h-full">
    <div class="content w-full">
      <span class="display-block w-full text-center text-[24px] line-height-[54px] text-white">定期</span>
      <div class="total mt-[30px]">
        <div
          class="m-auto h-[233px] bg-contain bg-no-repeat pt-[20px]"
          :style="{ backgroundImage: `url(${depositBg})`, backgroundPosition: 'center' }"
        >
          <div
            class="m-auto h-[98px] w-[258px] bg-cover"
            :style="{ backgroundImage: `url(${userBalance})`, backgroundPosition: 'center' }"
          >
            <div class="flex flex-col pl-[20px] pt-[25px]">
              <span class="text-[18px] font-medium line-height-[15px]">資產總額</span>
              <span class="mt-[20px] text-[22px]">{{ totalBalance }}</span>
            </div>
          </div>
          <div class="m-auto w-[300px] flex flex-center pt-[25px]">
            <div class="flex flex-1 flex-col text-center">
              <span class="text-[18px] font-medium text-[#5292D2]">{{ investInfo ? investInfo.total_income.toFixed(2)
                : '0.00'
              }}</span>
              <span class="mt-[10px]">總收益</span>
            </div>
            <div class="flex flex-1 flex-col text-center">
              <span class="text-[18px] font-medium text-[#269E89]">{{ investInfo ? investInfo.yesterday_income.toFixed(2)
                : '0.00'
              }}</span>
              <span class="mt-[10px]">昨日收益</span>
            </div>
          </div>
        </div>
      </div>
      <div class="invest-section m-auto h-[387px] w-[340px] bg-white pb-[20px] pl-[12px] pr-[12px] pt-[20px]">
        <span class="m-auto display-block w-full text-center text-[16px]">貨幣轉入</span>
        <div class="form mt-[60px]">
          <div
            class="row" :class="{
              'opacity-[0.5]': depositType !== 1,
            }" @click="depositType = 1"
          >
            <div class="title">
              <span class="text-[16px] font-medium">定{{ investInfo && investInfo.one_day }}天</span>
              <span class="ml-[20px] text-[14px] text-[#269E89]">+{{ rateMap.oneDay.rate }}%</span>
            </div>
            <div class="mt-[20px] h-[40px] flex flex-between-center">
              <div class="w-[220px] bg-[#F5F5F5]">
                <van-field
                  v-model="oneday" placeholder="请输入金額" class="bg-transparent" label-width="40" type="number"
                  label="金額:"
                />
              </div>
              <div class="flex flex-col text-center">
                <span class="text-[14px]">收益</span>
                <span class="mt-[10px] text-[18px] font-semibold text-[#269E89]">{{ onedayIncome }}</span>
              </div>
            </div>
          </div>
          <div class="mb-[20px] mt-[20px] h-[1px] w-full bg-[#F1F1F1]"></div>
          <div
            class="row" :class="{
              'opacity-[0.5]': depositType !== 2,
            }" @click="depositType = 2"
          >
            <div class="title">
              <span class="text-[16px] font-medium">定{{ investInfo && investInfo.fifteen_day }}天</span>
              <span class="ml-[20px] text-[14px] text-[#269E89]">+{{ rateMap.fifteen.rate }}%</span>
            </div>

            <div class="mt-[20px] h-[40px] flex flex-between-center">
              <div class="w-[225px] bg-[#F5F5F5]">
                <van-field v-model="fifteen" placeholder="请输入金額" label-width="40" type="number" label="金額:" />
              </div>
              <div class="flex flex-col text-center">
                <span class="text-[14px]">收益</span>
                <span class="mt-[10px] text-[18px] font-semibold text-[#269E89]">{{ fifteenIncome }}</span>
              </div>
            </div>
          </div>
          <div class="mb-[20px] mt-[20px] h-[1px] w-full bg-[#F1F1F1]"></div>
          <div class="btns flex flex-center text-center">
            <div class="box h-[44px] w-[148px]" @click="toDepositRecord">
              <span class="lh-[40px]">轉出</span>
            </div>
            <div class="box ml-[20px] h-[44px] w-[148px]">
              <span class="is-active lh-[40px]" @click="moveIn">轉入</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.body {

  min-height: calc(100vh - 55px);
  background: linear-gradient(180deg, #00B880 0%, #CAF8ED 100%);

  .content {
    background: linear-gradient(180deg, #00B880 0%, #CAF8ED 100%);
  }

  .invest-section {
    border-radius: 10px;
    box-shadow: 0px 4px 6px 0px #7BCAB23F;

  }

  .btns {
    span {
      border-radius: 23px;
      font-size: 18px;
      width: 144px;
      height: 40px;
      display: inline-block;
      position: relative;
      background-color: #fff;
      margin-top: 1px;

      &.is-active {
        color: #fff;
        font-size: 16px;
        background: linear-gradient(90deg, #01B881 0%, #86E3C8 100%);
      }

    }

    .box {
      border: 1px solid transparent;
      border-radius: 23px;
      background-clip: padding-box, border-box;
      background-origin: padding-box, border-box;
      background-image: linear-gradient(90deg, #03B982 0%, #86E3C8 100%);
    }
  }
}

:deep() {
  .van-cell {
    background-color: transparent;
  }
}
</style>
