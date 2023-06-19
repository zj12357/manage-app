<script setup lang="ts">
import { useRoute } from 'vue-router'
import { showFailToast, showSuccessToast } from 'vant'
import lineChart from '../../market/lineChart.vue'
import TotalBalance from '../TotalBalance.vue'
import Issues from './Issues.vue'
import tradeBg from '~/assets/images/trade/trade_bg.png'
import { getStorage } from '~/utils/storage'

const route = useRoute()
const title = computed(() => route.query.label)
const id = computed(() => route.query.id)
const ways = ref([])
async function getWays() {
  const { code, data } = await getPlayWays({ room_id: id.value })
  if (code === 200) {
    ways.value = data.data.reduce((all, item) => {
      const play_ways = item.play_ways.reduce((ways, way) => {
        ways.push({
          ...way,
          value: null,
        })
        return ways
      }, [])
      all.push({
        ...item,
        play_ways,
      })
      return all
    }, [])
    changeTab({
      id: 1,
      tab: '動態',
    })
  }
}
// room信息
interface IRoomInfo {
  id: number
  min_bet: number
  max_bet: number
  title: string
}
const roomInfo = getStorage('room') as IRoomInfo
// tabs
const activeTab = ref(1)

const dynaicWays = computed(() => ways.value[0])
const edgeWays = computed(() => ways.value[1])
const showList = ref<any[]>([])
const tabs = [
  {
    id: 1,
    tab: '動態',
  },
  {
    id: 2,
    tab: '極值',
  },
]
function changeTab(tab) {
  activeTab.value = tab.id
  showList.value = activeTab.value === 1 ? dynaicWays.value.play_ways : edgeWays.value.play_ways
}

function reset() {
  console.log('rest')
  showList.value.forEach(x => x.value = null)
}

// 確認彈框
const show = ref(false)
const buyList = ref<any[]>([])
const total = ref(0)
function toBuy() {
  buyList.value = showList.value.filter(x => x.value - roomInfo.min_bet >= 0 && x.value - roomInfo.max_bet <= 0)
  total.value = buyList.value.reduce((sum: number, item: any) => {
    sum += item.value * 1
    return sum
  }, 0)
  show.value = !!buyList.value.length
  if (!show.value)
    showFailToast('請輸入金額')
}

// 取消
function cancel() {
  show.value = false
}
const apiParams = computed(() => {
  return {
    room_id: id.value,
    pagesize: 10,
    page: 1,
  }
})
async function submit() {
  const { code, data: issueData } = await getIssues(apiParams.value)
  if (code === 200) {
    const firtRow = issueData.data[0]
    console.log(firtRow)
    const bet = buyList.value.reduce((all: any, item: any) => {
      all[item.name] = item.value
      return all
    }, {})
    const { code, msg } = await submitBet({
      bet: JSON.stringify(bet),
      issue_id: firtRow.id,
    })
    if (code === 200) {
      cancel()
      showSuccessToast(msg)
    }
    else {
      showFailToast(msg)
    }
  }
}
// 封單中
const isClosing = ref(false)
function changeStatus(value: boolean) {
  if (!isClosing.value && value)
    showFailToast('封單中')

  isClosing.value = value
}

// 过滤输入框
function formatter(value) {
  const _value = Number(value.replace(/\D/g, '')).toString()
  return _value === '0' ? '' : _value
}
onBeforeMount(() => {
  getWays()
})
</script>

<template>
  <div>
    <NavBar :title="title" />
    <div
      class="w-full pt-[60px]" :style="{
        backgroundImage: `url(${tradeBg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '90% 100%',
        backgroundPosition: 'center 95px',
      }"
    >
      <div class="nums ml-[15px] mr-[15px]">
        <TotalBalance />
      </div>
      <div class="h-[80px] bg-white">
        <Issues :id="id" @change-status="changeStatus" />
      </div>
      <div class="bg-white pl-[15px] pr-[15px]">
        <div
          class="w-full" :class="{
            'not-allowed': isClosing,
          }"
        >
          <div class="text-center">
            <div class="text-center">
              <ul class="tabs flex flex-center bg-[#C6EAE1]">
                <li
                  v-for="tab in tabs" :key="tab.id" :class="{
                    'is-active': tab.id === activeTab,

                  }" class="flex-1 text-center lh-[40px] tab" @click="changeTab(tab)"
                >
                  {{ tab.tab }}
                </li>
              </ul>
              <ul v-if="showList" class="tables flex flex-wrap pb-[15px] pl-[10px] pr-[10px]">
                <li
                  v-for="(item, index) in showList" :key="item.id" class="mt-[10px] w-[155px]" :class="{
                    'mr-[10px]': index % 2 === 0,
                  }"
                >
                  <div class="flex flex-center">
                    <div
                      class="label h-[40px] w-[80px] flex-between-center flex-shrink-0 bg-[#E0F1EC] pl-[5px] pr-[5px] lh-[44px]"
                    >
                      <span>{{ item.name }}</span>
                      <span>1:{{ item.rate }}</span>
                    </div>
                    <div
                      class="input" :class="{
                        'is-active': item.value - roomInfo.min_bet >= 0 && item.value - roomInfo.max_bet <= 0,
                      }"
                    >
                      <van-field v-model="item.value" :formatter="formatter" class="transparent" type="number" />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="btns mt-[20px] flex flex-between-center">
            <span class="flex-1 text-center lh-[40px]" @click="reset">撤銷</span>
            <span class="ml-[30px] flex-1 text-center lh-[40px]" @click="toBuy">認購</span>
          </div>
        </div>
      </div>
      <div>
        <span class="dot ml-[10px] display-block pl-[15px] line-height-[40px]">市場動態</span>
        <lineChart />
      </div>
    </div>
    <van-dialog
      v-model:show="show" :width="320" :show-cancel-button="false" :show-confirm-button="false"
      title="訂購明細(請確認認購單)"
    >
      <div class="w-full table pl-[15px] pr-[15px] text-center text-[14px] lh-[40px]">
        <div class="header row flex flex-center">
          <span class="flex-1">選項</span>
          <span class="flex-1">槓桿倍率</span>
          <span class="flex-1">金額</span>
        </div>
        <div class="body w-full">
          <div v-for="item in buyList" :key="item.id" class="row flex flex-center">
            <span class="flex-1">{{ item.name }}</span>
            <span class="flex-1 text-[#f93]">1:{{ item.rate }}</span>
            <span class="flex-1">{{ (item.value * 1).toFixed(2) }}</span>
          </div>
          <div class="text-right text-[12px]">
            <span>總金額：</span>
            <span class="text-[#f93]">{{ total.toFixed(2) }}</span>
          </div>
        </div>
        <div class="btns mb-[15px] mt-[15px] w-full flex flex-center lh-[40px]">
          <span class="flex-1" @click="cancel">取消</span>
          <span class="ml-[10px] flex-1 bg-[#269e89] text-white" @click="submit">確定</span>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<style lang="scss" scoped>
.tab.is-active {
  position: relative;

  &:after {
    content: '';
    position: absolute;
    width: 20px;
    border-radius: 3px;
    height: 4px;
    left: 50%;
    bottom: 2px;
    background-color: #000;
    transform: translateX(-50%);
  }
}

.tables {
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .1);

  .input {
    background-color: #f5f5f5;

    &.is-active {
      background-color: rgba(224, 241, 236, 0.8);

    }
  }

  .label {
    border-radius: 5px;

  }
}

.btns {
  span {
    border-radius: 20px;
    box-shadow: inset 0 0 4px 2.5px #269e89;

    &:hover {
      background: #269e89;
      color: #fff;
    }
  }
}

.header {
  border-bottom: 1px solid #eee;
}

.not-allowed {
  pointer-events: none;
  cursor: not-allowed;
  opacity: 0.6;
}

.body {
  .row {
    border-bottom: 1px solid #eee;
  }
}

.tabs {
  border-radius: 10px 10px 0 0;
}
</style>
