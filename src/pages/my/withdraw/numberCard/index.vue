<script setup lang="ts">
import balance from '../balance.vue'
</script>

<template>
  <div class="w-full">
    <balance />
    <div class="w-full p-[20px]">
      <h2 class="mb-[10px] text-md">
        赎回金额
      </h2>
      <van-form>
        <van-field
          class="app-money"
          name="amount"
          label="￥"
          placeholder="请填写赎回金额"
          :rules="[{ required: true, message: '请填写赎回金额' }]"
        />
        <div class="mt-[10px] w-full flex-start-center py-[10px] text-sm">
          <span class="text-assist7">单笔赎回范围：</span>
          <span class="text-primary">100 - 10,000,000￥</span>
        </div>
        <div class="mt-[10px] w-full border-b-solid border-light">
          <van-field
            name="name"
            label="交易密码"
            placeholder="请填写交易密码"
            :rules="[{ required: true, message: '请填写交易密码' }]"
          />
        </div>
        <div class="my-[14px] w-full text-assist5">
          <p class="mb-[4px]">
            预计到账： <span class="text-primary">1.269394</span>  USDT
          </p>
          <p>参考汇率为1USDT ≈ 7.09CNY</p>
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
          1.每日赎回不受时间，额度，次数的限制
        </p>
        <p class="mt-[8px]">
          2.赎回过程中如果出现什么问题，请及时联系
          <a
            href="http://"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary"
          >在线客服</a>
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
}
</style>