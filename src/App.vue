<script setup lang="ts">
import initPage from '~/assets/images/app/init_page_bg.png'
import { getConfigs } from '~/api/common'

const common = useCommonStore()
const initLoad = computed(() => common.initLoad)
const state = reactive({
  progress: '0%',
})

useHead({
  title: ADMIN_NAME,
  meta: [
    {
      name: 'description',
      content:
                '是一个提供全面、专业理财服务的在线平台。我们的目标是帮助用户做出明智的投资决策，实现财务目标。提供股票、基金、债券、保险、退休金等各类投资产品的最新资讯、市场分析、投资策略。',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    },
  ],
})

async function fetchConfigs() {
  const res = await getConfigs()
  if (res.code === 200)
    common.setConfig(res.data)
}

function setInitTime() {
  let countTime = 0
  const time = setInterval(() => {
    countTime += 1
    state.progress = `${((Math.random() * 10) + (countTime * 20)).toFixed(2)}%`
    if (countTime > 4) {
      state.progress = '100%'
      common.setInitLoad(true)
      clearInterval(time)
    }
  }, 1000)
}

onMounted(() => {
  fetchConfigs()
  setInitTime()
})
</script>

<template>
  <div v-if="!initLoad" class="relative h-full w-full overflow-hidden">
    <img :src="initPage" class="w-full" alt="" />
    <span class="bottom-[20px] text-primary absolute-row-center">{{ state.progress }}</span>
  </div>
  <RouterView v-else />
</template>
