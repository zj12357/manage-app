<script setup lang="ts">
import { showConfirmDialog } from 'vant'
import noBankCard from '~/assets/images/user/no_bank_card.png'
import warn from '~/assets/images/icons/icon_user_warn.png'
import bank_card_bg from '~/assets/images/user/bank_card_bg.png'
import icon_bank_card from '~/assets/images/icons/icon_bank_card.png'

const loading = ref(true)
const user = useUserStore()
const cardList = ref<any[]>([])
const router = useRouter()

function toPage(path: string) {
  if (!user.userInfo.real_name) {
    showConfirmDialog({
      title: '温馨提示',
      message: '您还未完善个人资料',
      className: 'app-dialog',
    }).then((result) => {
      router.push('/my/userCenter/baseInfo')
    })
  }
  else {
    router.push(path)
  }
}
async function fetchGetCard() {
  loading.value = true
  const res = await getCard()
  if (res.code === 200)
    cardList.value = res.data.data
  loading.value = false
}
onMounted(() => {
  fetchGetCard()
})
</script>

<template>
  <div class="w-full bg-white pb-[30px]">
    <van-skeleton v-if="loading" title :row="3" />
    <div v-if="cardList.length === 0 && !loading" class="w-full flex-col-center">
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
              <div i-carbon:add class="mr-[2px] text-lg"></div>
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
    <div v-else class="w-full pt-[20px]">
      <div v-for="(item, index) in cardList" :key="index" class="h-[147px] w-full flex-start-center bg-center-cover p-[20px]" :style="{ backgroundImage: `url(${bank_card_bg})` }">
        <div class="h-[42px] w-[42px] flex-center rounded-[50%] bg-white">
          <img :src="icon_bank_card" class="w-[32px]" alt="" />
        </div>
        <div class="ml-[20px] break-all text-md text-white">
          <p class="mb-[14px] break-all">
            {{ item.start_bank }}
          </p>
          <p class="mb-[14px] break-all">
            {{ item.card_number }}
          </p>
          <p>
            持卡人： {{ item.card_name }}
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
