<script lang="ts" setup>
const props = defineProps({
  id: {
    type: String,
  },
})

const emit = defineEmits(['changeStatus'])
const apiParams = computed(() => {
  return {
    room_id: props.id,
    pagesize: 10,
    page: 1,
  }
})
// 倒計時
const serverTime = ref(0)

const list = ref([])
const firtRow = ref({})
const leftTime = ref(0)
let timer: any = null
function startInterval() {
  emit('changeStatus', false)
  clearInterval(timer)
  timer = setInterval(() => {
    leftTime.value--
    if (leftTime.value <= 5) {
      emit('changeStatus', true)
      if (leftTime.value <= 0) {
        clearInterval(timer)
        // 更新列表
        fetchData()
      }
    }
  }, 1000)
}
// 獲取issues
async function fetchData() {
  const { code, data } = await getIssues(apiParams.value)
  if (code === 200) {
    firtRow.value = data.data[0]
    list.value = data.data.slice(1).reduce((all, item) => {
      const nums = item.result.split(',')
      const res = nums.reduce((sum, num) => {
        sum += num * 1
        return sum
      }, 0)
      all.push({
        ...item,
        nums: item.result.split(','),
        sum: res,
      })
      return all
    }, [])
    serverTime.value = data.server_time
    leftTime.value = firtRow.value.end_time - serverTime.value
    startInterval()
  }
}
// 收齊和放下
const isExpand = ref(false)
function toggle() {
  isExpand.value = !isExpand.value
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div>
    <div class="box">
      <div class="header flex flex-between-center bg-[#C6EAE1] pb-[10px] pl-[10px] pr-[10px] pt-[10px]">
        <span class="text-[#269E89]">當前輪數：<span class="text-[16px] font-semibold">{{ firtRow.number }}</span>
        </span>
        <div class="">
          <van-icon name="clock-o" />
          <span class="ml-[5px] text-[16px] font-semibold text-[#269E89]">{{ leftTime }}s</span>
        </div>
      </div>
      <div
        class="rows position-relative bg-white" :class="{
          'is-expand': isExpand,
        }"
      >
        <div v-for="item in list" :key="item.id" class="flex flex-between-center pl-[10px] pr-[15px]">
          <div class="">
            <span>輪數：{{ item.number }}</span>
          </div>
          <div class="flex flex-center pl-[10px] pr-[10px]">
            <div class="result flex flex-start-center">
              <div
                v-for="(num, index) in item.nums" :key="index"
                class="flex flex-center pb-[10px] pt-[10px] text-center lh-[20px] text-white"
              >
                <span class="circle display-block bg-[#333]">{{ num }}</span>
                <span v-if="index !== item.nums.length - 1" class="pl-[5px] pr-[5px] text-[#444]">+</span>
              </div>
              <div class="ml-[5px] flex flex-center text-center">
                <span>=</span>
                <span
                  class="circle sum font-seimbold ml-[5px] display-block w-[30px] bg-[orange] text-[14px] lh-[20px] text-white"
                >{{
                  item.sum }}</span>
              </div>
            </div>
            <span class="ml-[10px] text-[orange]">{{ item.play_way.substr(-2) }}</span>
          </div>
        </div>
        <span class="position-absolute right-[5px] top-[12px]" @click="toggle">
          <van-icon name="arrow-down" />
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.rows {
  z-index: 100;
  max-height: 40px;
  overflow: hidden;
  transition: .3s ease;

  .circle {
    border-radius: 50%;
    width: 20px;
    height: 20px;
  }

  &.is-expand {
    max-height: 400px;
  }
}
</style>
