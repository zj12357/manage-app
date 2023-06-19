<script setup lang="ts">
const router = useRouter()
function toPage(path: string) {
  router.push(path)
}
</script>

<template>
  <div class="mt-[50px] w-full flex-center">
    <div class="detail-btn" @click="toPage('/trade')">
      查看詳情
    </div>
  </div>
</template>

<style scoped>
 .detail-btn{
    background-image: linear-gradient(0, #b5e0d6 0%, #ffffff 100%);
    border: 2px solid #fff;
    box-shadow:4px 4px 0 #b5e0d6, inset 0 0 0.16rem 0.08rem hsla(0,0%,100%,.5);
    border-radius: 18px;
    width: 140px;
    height: 36px;
    text-align: center;
    line-height: 36px;
    font-size: 14px;
    font-weight: 600;
    color: #269E89;
  }
</style>
