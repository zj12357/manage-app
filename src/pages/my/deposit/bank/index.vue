<script setup lang="ts">
const amountList = [500, 5000, 10000, 20000, 50000, 100000, 200000, 500000]
</script>

<template>
  <div class="h-full w-full bg-white">
    <NavBar title="银联存入" />
    <div class="w-full p-[20px]">
      <h2 class="mb-[10px] text-md">
        存款金额
      </h2>
      <van-form>
        <van-field
          class="app-money"
          name="amount"
          label="￥"
          placeholder="请填写存款金额"
          :rules="[{ required: true, message: '请填写存款金额' }]"
        />
        <div class="mt-[10px] w-full flex-start-center py-[10px] text-sm">
          <span class="text-assist7">单笔存款限额：</span>
          <span class="text-primary">100 - 1,000,000 ￥</span>
        </div>
        <h2 class="my-[20px] text-md">
          存款金额
        </h2>
        <div class="flex-start-center-warp">
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
        <div class="mt-[10px] w-full border-b-solid border-light">
          <van-field
            name="name"
            label="存款人姓名"
            placeholder="请填写存款人姓名"
            :rules="[{ required: true, message: '请填写存款人姓名' }]"
          />
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
        <p>温馨提醒</p>
        <p class="mt-[8px]">
          <span class="text-primary">为确保您的款项即时到帐，请您留意以下内容</span>
          <span>请您留意以下内容</span>
        </p>
        <p class="mt-[8px]">
          1.公司入款账号不定时更换，每次付款之前请认真核对账号再付款，避免造成不必要的损失；
        </p>
        <p class="mt-[8px]">
          2.完成转账后请联系在线客服提供用户名帮您确认是否到账；
        </p>
        <p class="mt-[8px]">
          3.请如实填写大概存入时间；
        </p>
        <p class="mt-[8px]">
          4.请勿存入非整数金额（如存1000.32），以便财务查收；
        </p>
        <p class="mt-[8px]">
          5.转账完成后请保留单据为核对证明。
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
    .app-money {
        .van-field__label {
            label {
                font-weight: 500;
                font-size: 18px;
                color: #222;
            }
        }
        .van-field__value {
            input {
                font-size: 18px;
                font-weight: 500;
                color: #222;
            }
            input::placeholder {
                font-size: 14px;
            }
        }
    }
}
</style>

<route lang="yaml">
meta:
  layout: user
</route>
