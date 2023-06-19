<script setup lang="ts">
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import TotalBalance from './TotalBalance.vue'
import randomTradeCount from './randomTradeCount.vue'
import { setStorage } from '~/utils/storage'
import tradeBg from '~/assets/images/trade/trade_bg.png'
import vip2 from '~/assets/images/trade/vip2.png'
import vip3 from '~/assets/images/trade/vip3.png'
import vip4 from '~/assets/images/trade/vip4.png'
import vip5 from '~/assets/images/trade/vip5.png'

// 各種艙
interface IKeyObject {
  [key: string]: {
    'bg': string
    text: string
    icon: any
    label: string
  }
}

const rooms = ref<any[]>([])
async function getTotalRooms() {
  const colorMap: IKeyObject = {
    5: {
      bg: '#CDDDFF',
      text: '#323232',
      icon: vip5,
      label: '普通艙',
    },
    4: {
      bg: '#EEDBBB',
      text: '#927950',
      icon: vip4,
      label: '貴賓艙',
    },
    3: {
      bg: '#BABAEC',
      text: '#373580',
      icon: vip3,
      label: 'VIP艙',
    },
    2: {
      bg: '#DCBAED',
      text: '#63367B',
      icon: vip2,
      label: '鑽石艙',
    },
  }
  const { code, data } = await getRooms()
  if (code === 200) {
    rooms.value = data?.data.reduce((all: any[], item: any) => {
      all.push({
        ...item,
        bg: colorMap[item!.id].bg,
        text: colorMap[item!.id].text,
        icon: colorMap[item!.id].icon,
      })
      return all
    }, [])
    console.log(rooms.value, 'res')
  }
}
// 进入详情页
const router = useRouter()
function toPage(room: any) {
  setStorage('room', room)
  const userStore = useUserStore()
  console.log(userStore.balance, 'asdf')
  if (room.min_enter - userStore.balance > 0) {
    showToast(`進入房間最小點數${room.min_enter}`)
    return
  }

  router.push({
    path: '/trade/roomDetail',
    query: {
      id: room.id,
      label: room.title,
    },
  })
}
onMounted(() => {
  getTotalRooms()
})
</script>

<template>
  <div class="body h-full">
    <div class="w-full">
      <span class="display-block w-full text-center text-[24px] line-height-[54px] text-white">交易</span>
      <div
        class="w-full" :style="{
          backgroundImage: `url(${tradeBg})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '90% 100%',
          backgroundPosition: 'center 60px',
        }"
      >
        <TotalBalance />
        <div class="mt-[50px] w-full">
          <div class="title w-full p-[10px] text-center">
            <span class="text-[16px] color-[#269E89]">交易倉選擇</span>
          </div>
          <div class="list flex-col-center">
            <div
              v-for="room in rooms" :key="room.id"
              class="row flex-between position-relative mb-[10px] h-[105px] w-[260px] flex overflow-hidden bg-white pl-[7px] pt-[10px]"
              @click="toPage(room)"
            >
              <div class="level flex-col-center">
                <span
                  class="icon display-block h-[60px] w-[60px] bg-cover"
                  :style="{ backgroundImage: `url(${room.icon})`, backgroundPosition: 'center' }"
                ></span>
                <span class="text-[14px] font-medium">{{ room.title }}</span>
              </div>
              <div class="right ml-[12px] flex-1 text-[14px]">
                <div class="">
                  <span class="">入倉貨幣</span>
                  <span class="ml-[10px] font-semibold">{{ room.min_enter.toFixed(2) }}</span>
                </div>
                <div class="mt-[20px]">
                  <span>單筆認購</span>
                  <span class="ml-[10px] font-semibold">{{ room.min_bet.toFixed(2) }}</span>
                </div>
              </div>
              <div
                class="trade-count position-absolute bottom-0 right-0 pb-[5px] pl-[10px] pr-[10px] pt-[5px]" :style="{
                  backgroundColor: room.bg,
                  color: room.text,
                }"
              >
                <!-- <span>交易人數：2323</span> -->
                <randomTradeCount :room="room" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.body {
  min-height: calc(100vh - 55px);
  background: linear-gradient(180deg, #00B880 0%, #CAF8ED 100%);

  .row {
    box-shadow: 0px 2px 10px 0px #B1B1B13F;
    border-radius: 10px;

    .trade-count {
      border-radius: 5px 0 5px 0;
    }
  }
}
</style>
