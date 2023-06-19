<script setup lang="ts">
import { showConfirmDialog } from 'vant'
import noBankCard from '~/assets/images/user/no_bank_card.png'
import warn from '~/assets/images/icons/icon_user_warn.png'
import number_card_bg from '~/assets/images/user/number_card_bg.png'
import icon_number_card from '~/assets/images/icons/icon_number_card.png'

const router = useRouter()
const user = useUserStore()
const loading = ref(true)
const cardList = ref<any[]>([])
function toPage(path: string) {
  if (!user.userInfo.real_name) {
    showConfirmDialog({
      title: '溫馨提示',
      message: '您還未完善個人資料',
      className: 'app-dialog',
      confirmButtonText: '確定',
    }).then((result) => {
      router.push('/my/userCenter/baseInfo')
    })
  }
  else if (!user.userInfo.trade_password) {
    showConfirmDialog({
      title: '溫馨提示',
      message: '您還未設置交易密碼',
      className: 'app-dialog',
      confirmButtonText: '確定',
    }).then((result) => {
      router.push('/my/userCenter/tradePassword')
    })
  }
  else {
    router.push(path)
  }
}

async function fetchGetWallet() {
  loading.value = true
  const res = await getWallet()
  if (res.code === 200)
    cardList.value = res.data.items
  loading.value = false
}
onMounted(() => {
  fetchGetWallet()
})
</script>

<template>
  <div class="w-full bg-white pb-[30px]">
    <van-skeleton v-if="loading" title :row="3" />

    <div v-if="cardList.length === 0 && !loading" class="w-full flex-col-center">
      <div class="w-full flex-col-center">
        <img :src="noBankCard" class="w-full" alt="" />
        <p class="mt-[20px] text-assist7">
          暫無虛擬卡
        </p>
      </div>

      <div class="mt-[40px] w-full flex-center">
        <div class="w-[300px]">
          <van-button
            round
            block
            type="primary"
            native-type="submit"
            @click="toPage('/my/userCenter/payCard/number')"
          >
            <div class="flex-center">
              <div i-carbon:add class="mr-[2px] text-lg"></div>
              <span>暫無虛擬卡</span>
            </div>
          </van-button>
        </div>
      </div>
      <div class="mt-[20px] flex-center p-[10px]">
        <img :src="warn" class="mr-[6px] w-[20px]" alt="" />
        <p class="text-sm lh-[16px]">
          為了您的資金安全，成功贖回會自動鎖定，無法刪除和修改，如果需要修改或者刪除，請聯繫
          <a href="http://" target="_blank" rel="noopener noreferrer" class="text-primary">在線客服</a>
        </p>
      </div>
    </div>
    <div v-else class="w-full p-[20px]">
      <div v-for="(item, index) in cardList" :key="index" class="min-h-[147px] w-full flex-start-center rounded-[8px] bg-center-cover p-[20px]" :style="{ backgroundImage: `url(${number_card_bg})` }">
        <div class="h-[42px] w-[42px] flex-center rounded-[50%] bg-white">
          <img :src="icon_number_card" class="w-[32px]" alt="" />
        </div>
        <div class="ml-[20px] break-all text-md text-white">
          <p class="mb-[14px] break-all">
            別名：{{ item.alias }}
          </p>
          <p class="mb-[14px] break-all">
            {{ item.style }}
          </p>
          <p>
            {{ item.wallet }}
          </p>
        </div>
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
