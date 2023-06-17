<script setup lang="ts">
const passwordInfo = reactive({
  username: '',
  trade_password: '',

})

function onSubmit(values: any) {
  console.log('submit', values)
}
</script>

<template>
  <div class="h-full w-full">
    <NavBar title="添加银行卡" />
    <div class="w-full">
      <van-form @submit="onSubmit">
        <van-cell-group>
          <van-field
            v-model="passwordInfo.username"
            name="username"
            label="姓名"
            required
            placeholder="请输入持卡人姓名"
            :rules="[{ required: true, message: '请输入持卡人姓名' }]"
          />
          <van-field
            v-model="passwordInfo.username"
            name="username"
            label="卡号"
            required
            placeholder="请输入银行卡号"
            :rules="[{ required: true, message: '请输入银行卡号' }]"
          />
          <van-field
            v-model="passwordInfo.username"
            name="username"
            label="开户行"
            required
            placeholder="请输入开户银行"
            :rules="[{ required: true, message: '请输入开户银行' }]"
          />
          <van-field
            v-model="passwordInfo.username"
            name="username"
            label="开户省份"
            placeholder="请输入开户省份"
            :rules="[{ required: true, message: '请输入开户省份' }]"
          />
          <van-field
            v-model="passwordInfo.username"
            name="username"
            label="开户城市"
            placeholder="请输入开户城市"
            :rules="[{ required: true, message: '请输入开户城市' }]"
          />
          <van-field
            v-model="passwordInfo.username"
            name="username"
            label="支行名称"
            placeholder="如:湖北武汉市工商银行某某支行"
            :rules="[{ required: true, message: '请输入支行名称' }]"
          />
          <van-field
            v-model="passwordInfo.trade_password"
            type="password"
            name="password"
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
