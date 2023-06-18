<script setup lang="ts">
import newsTitle from '~/assets/images/home/news_title.png'
import newspaper from '~/assets/images/home/newspaper.png'
import news_banner_01 from '~/assets/images/home/news_banner_01.png'
import news_banner_02 from '~/assets/images/home/news_banner_02.png'
import news_banner_03 from '~/assets/images/home/news_banner_03.png'

const bannerList: Record<number, string> = {
  0: news_banner_01,
  1: news_banner_02,
  2: news_banner_03,
}

const newsList = ref<any[]>([])

const router = useRouter()
function toPage(path: string) {
  router.push(path)
}

async function fetchGetNews() {
  const res = await getNews()
  if (res.code === 200) {
    newsList.value = res.data?.data?.map((item: any) => {
      item.content = item.content.replace(/<p>|<\/p>|&lt;p&gt;|&lt;\/p&gt;|\r\n|/g, '')
      return item
    })
  }
}
onMounted(() => {
  fetchGetNews()
})
</script>

<template>
  <div class="w-full flex-col-top-center px-[20px]">
    <div class="h-[44px] w-full flex-center bg-top-cover" :style="{ backgroundImage: `url(${newsTitle})` }">
      <img :src="newspaper" alt="" class="mr-[6px] w-[50px]" />
      <span class="text-lg">
        最新资讯
      </span>
    </div>
    <div class="w-full flex-col-top-center bg-white">
      <div v-for="(item, index) in newsList" :key="index" class="mb-[14px] w-full px-[8px]" @click="toPage(`/home/news/detail?id=${item.id}`)">
        <div class="w-full flex-between-center border-b border-[#f0f0f0] border-dashed py-[10px]">
          <div class="h-[80px] w-[120px]">
            <img :src="bannerList[index]" alt="" class="img-cover rounded-[8px]" />
          </div>
          <div class="w-[188px]">
            <p class="news-content line-clamp-2 mb-[10px] text-wrap-ellipsis" v-html="item.content">
            </p>
            <span class="text-sm text-assist4">{{ item.created_at }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep() {
    .news-content {
        p {
            line-height: 18px;
        }
    }
}
</style>
