<script setup lang="ts">
import noBankCard from '~/assets/images/user/no_bank_card.png'
import warn from '~/assets/images/icons/icon_user_warn.png'

const router = useRouter()
function toPage(path: string) {
  router.push(path)
}
</script>

<template>
  <div class="w-full bg-white pb-[30px]">
    <div class="w-full flex-col-center">
      <div class="w-full flex-col-center">
        <img :src="noBankCard" class="w-full" alt="" />
        <p class="mt-[20px] text-assist7">
          暂无银行卡
        </p>
      </div>

      <div class="mt-[40px] w-full flex-center">
        <div class="w-[300px]">
          <van-button
            round
            block
            type="primary"
            native-type="submit"
            @click="toPage('/my/userCenter/payCard/bank')"
          >
            <div class="flex-center">
              <div i-carbon-add class="mr-[2px] text-lg"></div>
              <span>添加银行卡</span>
            </div>
          </van-button>
        </div>
      </div>
      <div class="mt-[20px] flex-center p-[10px]">
        <img :src="warn" class="mr-[6px] w-[20px]" alt="" />
        <p class="text-sm lh-[16px]">
          为了您的资金安全，成功赎回的银行卡会自动锁定，无法删除和修改，如果需要修改或者删除，请联系
          <a href="http://" target="_blank" rel="noopener noreferrer" class="text-primary">在线客服</a>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: user
</route>
