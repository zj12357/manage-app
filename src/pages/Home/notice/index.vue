<script setup lang="ts">
import noticeTitle from '~/assets/images/home/notice_title.png'

const notice = ref('')

async function fetchGetNotice() {
  const res = await getNotice()
  if (res.code === 200)
    notice.value = res.data?.data?.map((item: any, index: number) => `${index + 1}.${item.content}  `)?.join('')
}
onMounted(() => {
  fetchGetNotice()
})
console.log(notice)
</script>

<template>
  <div>
    <van-notice-bar
      :text="notice"
      :left-icon="noticeTitle"
      class="bg-[#fff9ed] text-assist1"
    />
  </div>
</template>

<style scoped lang="scss">
:deep(.van-icon__image) {
    width: 38px;
    height: 18px;
    margin-right: 6px;
}
</style>
