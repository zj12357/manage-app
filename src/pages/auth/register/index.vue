<script setup lang="ts">
import { showNotify } from 'vant'
import { getStorage } from '~/utils/storage'
import authLock from '~/assets/images/icons/icon_auth_lock.png'
import authSafe from '~/assets/images/icons/icon_auth_safe.png'
import authUser from '~/assets/images/icons/icon_auth_user.png'
import authMobile from '~/assets/images/icons/icon_auth_mobile.png'

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
  params: {
    username: (getStorage('userName') as string) ?? '',
    password: '',
    mobile: '',
    confirm_password: '',
    captcha: '',
  },
  showPopover: false,
  currentCountryCode: '86',
  currentCountryName: 'CN',
  captchaLink: `${API_URL}/api/captcha?${Date.now()}`,
})

function toPage(path: string) {
  router.push(path)
}
function handleCountryCode(values: any) {
  state.showPopover = false
  state.currentCountryCode = values.tel
  state.currentCountryName = values.short
}
async function onSubmit(values: any) {
  const res = await userRegister({
    username: values.username,
    password: values.password,
    mobile: values.mobile,
    captcha: values.captcha,
  })
  if (res.code === 200) {
    showNotify({
      type: 'success',
      message: res.msg,
    })

    userToken.setToken(res.data.token)
    toPage('/')
    fetchGlobalUserInfo()
  }
  else {
    handleCaptchaLink()
  }
}
function handleCaptchaLink() {
  state.captchaLink = `${API_URL}/api/captcha?${Date.now()}`
}
</script>

<template>
  <div class="mt-[30px] w-full rounded-tl-[60px] bg-white p-[30px]">
    <div class="h-[30px] w-full flex-start-center">
      <div
        v-for="(item, index) in navList"
        :key="index"
        class="relative mr-[25px] mt-[20px] h-full text-lg font-500"
        :class="route.path === item.path && 'nav-active'"
        @click="toPage(item.path)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="mt-[30px] min-h-[362px] w-full">
      <van-form @submit="onSubmit">
        <van-cell-group>
          <van-field
            v-model="state.params.username"
            name="username"
            placeholder="请填写用户名"
            :rules="[{ pattern: /^[A-Za-z0-9]{6,12}$/, message: '请填写6到12位字母或者数字' }, { required: true, message: '请填写用户名' }]"
          >
            <template #label>
              <img
                :src="authUser"
                class="relative top-[-4px] w-[28px]"
                alt=""
              />
            </template>
          </van-field>
          <van-field
            v-model="state.params.mobile"
            name="mobile"
            placeholder="请填写手机号"
            :rules="[{ pattern: /^\d*$/, message: '请填写数字' }, { required: true, message: '请填写手机号' }]"
          >
            <template #label>
              <img
                :src="authMobile"
                class="relative top-[-4px] w-[28px]"
                alt=""
              />
            </template>
            <template #right-icon>
              <van-popover
                v-model:show="state.showPopover"
                placement="bottom-end"
              >
                <div
                  class="h-[200px] w-[250px] overflow-y-auto rounded-[8px] bg-white p-[20px] shadow-base"
                >
                  <div
                    v-for="(item, index) in countryCode"
                    :key="index"
                    class="mb-[14px] flex-start-center text-sm"
                    :class="
                      item.tel === state.currentCountryCode
                        && 'text-primary'
                    "
                    @click="handleCountryCode(item)"
                  >
                    <img
                      :src="`/src/assets/images/country/${item.short}.png`"
                      alt=""
                      class="w-[24px]"
                    />
                    <span class="mx-[6px]">{{ item.name }}</span>
                    <span>+{{ item.tel }}</span>
                  </div>
                </div>
                <template #reference>
                  <div class="flex-center">
                    <span>{{ state.currentCountryName }}</span>
                    <span class="mx-[2px]">{{
                      `(+${state.currentCountryCode})`
                    }}</span>
                    <div i-carbon:chevron-down></div>
                  </div>
                </template>
              </van-popover>
            </template>
          </van-field>
          <van-field
            v-model="state.params.password"
            type="password"
            name="password"
            placeholder="请填写密码"
            maxlength="12"
            :rules="[{ pattern: /^[A-Za-z0-9]{6,12}$/, message: '请填写6到12位字母或者数字' }, { required: true, message: '请填写密码' }]"
          >
            <template #label>
              <img
                :src="authLock"
                class="relative top-[-4px] w-[28px]"
                alt=""
              />
            </template>
          </van-field>
          <van-field
            v-model="state.params.confirm_password"
            type="password"
            name="confirm_password"
            placeholder="请填写确认密码"
            maxlength="12"
            :rules="[
              { pattern: /^[A-Za-z0-9]{6,12}$/, message: '请填写6到12位字母或者数字' },
              { required: true, message: '请填写确认密码' },
              {
                validator: (val) => {
                  return val === state.params.password;
                },
                message: '两次密码输入的不一致',
              },
            ]"
          >
            <template #label>
              <img
                :src="authLock"
                class="relative top-[-4px] w-[28px]"
                alt=""
              />
            </template>
          </van-field>
          <van-field
            v-model="state.params.captcha"
            name="captcha"
            placeholder="请填写验证码"
            maxlength="4"
            :rules="[{ pattern: /^\d{4}$/, message: '请填写4位数字验证码' }, { required: true, message: '请填写验证码' }]"
          >
            <template #label>
              <img :src="authSafe" class="relative top-0 w-[28px]" alt="" />
            </template>
            <template #right-icon>
              <img
                :src="state.captchaLink"
                class="h-[28px] w-[120px]"
                alt=""
                @click="handleCaptchaLink"
              />
            </template>
          </van-field>
        </van-cell-group>

        <div class="mb-[20px] mt-[80px]">
          <van-button round block type="primary" native-type="submit">
            立即注册
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.nav-active::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 9;
    width: 80%;
    height: 2px;
    background-image: linear-gradient(270deg, #ffc724 3%, #f80);
}

.nav-active::after {
    content: "";
    position: absolute;
    top: 22px;
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
    .van-hairline--top-bottom::after {
        border: none;
    }
}
</style>

<route lang="yaml">
meta:
  layout: auth
</route>
