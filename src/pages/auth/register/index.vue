<script setup lang="ts">
import authLock from '~/assets/images/icons/icon_auth_lock.png'
import authSafe from '~/assets/images/icons/icon_auth_safe.png'
import authUser from '~/assets/images/icons/icon_auth_user.png'

const route = useRoute()
const router = useRouter()
const navList = [
  {
    name: '登录',
    path: '/auth/login',

  },
  {
    name: '注册',
    path: '/auth/register',

  },

]

const state = reactive({
  username: '',
  password: '',

})
function toPage(path: string) {
  router.push(path)
}
function onSubmit(values: any) {
  console.log('submit', values)
}
</script>

<template>
  <div class="mt-[30px] w-full rounded-tl-[60px] bg-white p-[30px]">
    <div class="h-[30px] w-full flex-start-center">
      <div v-for="(item, index) in navList" :key="index" class="relative mr-[25px] mt-[20px] h-full text-lg font-500" :class="route.path === item.path && 'nav-active' " @click="toPage(item.path)">
        {{ item.name }}
      </div>
    </div>
    <div class="mt-[30px] h-[362px] w-full">
      <van-form @submit="onSubmit">
        <van-cell-group>
          <van-field
            v-model="state.username"
            name="用户名"
            placeholder="请填写用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          >
            <template #label>
              <img :src="authUser" class="relative top-[-4px] w-[28px]" alt="" />
            </template>
          </van-field>
          <van-field
            v-model="state.password"
            type="password"
            name="密码"
            placeholder="请填写密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          >
            <template #label>
              <img :src="authLock" class="relative top-[-4px] w-[28px]" alt="" />
            </template>
          </van-field>
          <van-field
            v-model="state.password"
            type="password"
            name="密码"
            placeholder="请填写验证码"
            :rules="[{ required: true, message: '请填写验证码' }]"
          >
            <template #label>
              <img :src="authSafe" class="relative top-[-4px] w-[28px]" alt="" />
            </template>
          </van-field>
          <div class="relative w-full">
            <div class="absolute right-0">
              <van-field name="checkbox">
                <template #input>
                  <van-checkbox>记住账号</van-checkbox>
                </template>
              </van-field>
            </div>
          </div>
        </van-cell-group>

        <div class="mt-[80px]">
          <van-button round block type="primary" native-type="submit">
            立即注册
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.nav-active::before{
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 9;
  width: 80%;
  height: 2px;
  background-image: linear-gradient(270deg,#ffc724 3%,#f80);
}

.nav-active::after{
  content: "";
  position: absolute;
  top:  22px;
  right: 0;
  z-index: 9;
  width: 14px;
  height: 14px;
  opacity: 0.2;
  background: $primary-color;
  border-radius: 50%;
}
:deep() {
    .van-cell {
        padding: 12px 0px;
    }
    .van-field__label {
        width: auto;
    }
    .van-hairline--top-bottom::after{
      border: none;
    }

}
</style>

<route lang="yaml">
meta:
  layout: auth
</route>
