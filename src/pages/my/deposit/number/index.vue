<script setup lang="ts">
import numberCard from '~/assets/images/icons/icon_number_card.png'

const amountList = [500, 5000, 10000, 20000, 50000, 100000, 200000, 500000]
</script>

<template>
  <div class="h-full w-full bg-white">
    <NavBar title="数字货币存入" />
    <div class="w-full p-[20px]">
      <h2 class="mb-[15px] text-md">
        存款金额
      </h2>
      <van-form>
        <div class="flex-between-center border-b-solid border-light pb-[20px]">
          <div
            class="h-[78px] w-[162px] flex-center border-[1px] border-[#8f8f8f] rounded-[8px] border-solid"
          >
            <img :src="numberCard" class="w-[56px]" alt="" />
            <div class="ml-[6px]">
              <p class="mb-[4px]">
                USDT
              </p>
              <p>TRC20</p>
            </div>
          </div>
          <div
            class="h-[78px] w-[162px] flex-center border-[1px] border-[#8f8f8f] rounded-[8px] border-solid"
          >
            <img :src="numberCard" class="w-[56px]" alt="" />
            <div class="ml-[6px]">
              <p class="mb-[4px]">
                USDT
              </p>
              <p>ERC20</p>
            </div>
          </div>
        </div>
        <div class="flex-start-center-warp py-[20px]">
          <div
            v-for="(item, index) in amountList"
            :key="index"
            class="mb-[14px] w-[25%] flex-center"
          >
            <div
              class="h-[30px] w-[72px] flex-center rounded-[8px] shadow-base"
            >
              {{ item }}
            </div>
          </div>
        </div>
        <van-field
          name="name"
          label="存入金额"
          placeholder="请填写存入金额"
          :rules="[{ required: true, message: '请填写存入金额' }]"
        />
        <div class="mt-[30px] w-full flex-center">
          <div class="w-[300px]">
            <van-button round block type="primary" native-type="submit">
              提交
            </van-button>
          </div>
        </div>
      </van-form>
      <div class="mt-[30px] flex-center text-sm">
        <span>点击下一步获取地址钱包，存入遇到问题，请联系</span>
        <a href="" class="text-primary">在线客服</a>。
      </div>
    </div>
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
