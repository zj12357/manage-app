<script setup lang="ts">
const newsDetail = ref<any>()
const route = useRoute()

async function fetchGetNews() {
  const res = await getNewsDetail({
    info_id: route.query.id! as string,
  })
  if (res.code === 200)
    newsDetail.value = { ...res.data, content: res.data.content?.replace(/<p>|<\/p>|&lt;p&gt;|&lt;\/p&gt;|\r\n|/g, '') }
}
onMounted(() => {
  fetchGetNews()
})
</script>

<template>
  <div class="w-full bg-white">
    <NavBar title="活动资讯详情" />
    <div class="w-full p-[20px]">
      <div class="mb-[20px] text-center text-md font-500">
        {{ newsDetail?.title }}
      </div>
      <div class="news-content" v-html="newsDetail?.content"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep() {
    .news-content {
        p {
            line-height: 20px;
        }
        font {
          display: block;
          margin: 15px 0;
        }
    }
}
</style>

<route lang="yaml">
meta:
  layout: user
</route>
