<script setup lang="ts">
const cardInfo = reactive({
  username: '',
  trade_password: '',
  checked: 1,
})

function onSubmit(values: any) {
  console.log('submit', values)
}
</script>

<template>
  <div class="h-full w-full">
    <NavBar title="添加数字钱包" />
    <div class="w-full">
      <van-form @submit="onSubmit">
        <van-cell-group>
          <van-field
            v-model="cardInfo.username"
            name="username"
            label="别名名称"
            required
            placeholder="请输入别名名称"
            :rules="[{ required: true, message: '请输入别名名称' }]"
          />
          <van-field
            v-model="cardInfo.username"
            name="username"
            label="虚拟币种类"
            required
            placeholder="请输入虚拟币种类"
            :rules="[{ required: true, message: '请输入虚拟币种类' }]"
          />
          <van-field label="虚拟币协议" required name="username" :rules="[{ required: true, message: '请选择虚拟币协议' }]">
            <template #input>
              <van-radio-group v-model="cardInfo.checked" direction="horizontal">
                <van-radio name="1">
                  TRC20
                </van-radio>
                <van-radio name="2">
                  ERC20
                </van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field
            v-model="cardInfo.username"
            name="username"
            label="虚拟币地址"
            required
            placeholder="请输入虚拟币地址"
            :rules="[{ required: true, message: '请输入虚拟币地址' }]"
          />

          <van-field
            v-model="cardInfo.trade_password"
            type="password"
            name="password"
            label="交易密码"
            required
            placeholder="请填写交易密码"
            :rules="[{ required: true, message: '请填写交易密码' }]"
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
