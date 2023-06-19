<script setup lang="ts">
import { showSuccessToast } from 'vant'

const router = useRouter()
const { fetchGlobalUserInfo } = useGlobalData()
const state = reactive({
  password: '',
  new_password: '',
  confirm_password: '',
  passwordStatus: false,
  newPasswordStatus: false,
  confirmPasswordStatus: false,
})

function toPage(path: string) {
  router.push(path)
}

async function onSubmit(values: any) {
  const res = await updatePassword({
    password: values.password,
    new_password: values.new_password,
  })
  if (res.code === 200) {
    showSuccessToast(res.msg)
    fetchGlobalUserInfo()
    toPage('/my/userCenter')
  }
}
</script>

<template>
  <div class="h-full w-full">
    <NavBar title="登錄密碼管理" />
    <div class="w-full">
      <van-form @submit="onSubmit">
        <van-cell-group>
          <van-field
            v-model="state.password"
            :right-icon="!state.passwordStatus ? 'closed-eye' : 'eye-o'"
            :type="!state.passwordStatus ? 'password' : 'text'"
            name="password"
            label="舊登錄密碼"
            required
            placeholder="請填寫舊登錄密碼"
            :rules="[{ required: true, message: '請填寫舊登錄密碼' }]"
            @click-right-icon="state.passwordStatus = !state.passwordStatus"
          />
          <van-field
            v-model="state.new_password"
            :right-icon="!state.newPasswordStatus ? 'closed-eye' : 'eye-o'"
            :type="!state.newPasswordStatus ? 'password' : 'text'"
            name="new_password"
            label="新登錄密碼"
            required
            placeholder="請填寫新登錄密碼"
            :rules="[{ required: true, message: '請填寫新登錄密碼' }]"
            @click-right-icon="state.newPasswordStatus = !state.newPasswordStatus"
          />
          <van-field
            v-model="state.confirm_password"
            :right-icon="!state.confirmPasswordStatus ? 'closed-eye' : 'eye-o'"
            :type="!state.confirmPasswordStatus ? 'password' : 'text'"
            name="confirm_password"
            label="確認密碼"
            required
            placeholder="請填寫確認密碼"
            :rules="[
              { required: true, message: '請填寫確認密碼' },
              {
                validator: (val) => {
                  return val === state.new_password;
                },
                message: '兩次密碼輸入不一致',
              },
            ]"
            @click-right-icon="state.confirmPasswordStatus = !state.confirmPasswordStatus"
          />
        </van-cell-group>
        <div class="mt-[40px] w-full flex-center">
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

<style scoped lang="scss">
:deep() {
    .van-field__right-icon {
        i {
            font-size: 20px;
        }
    }
}
</style>

<route lang="yaml">
meta:
  layout: user
</route>
