<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const navList = [
  {
    name: '登录',
    path: '/auth/login',

  },
  {
    name: '注册',
    path: '/auth/register',

  },

]
function toPage(path: string) {
  router.push(path)
}
</script>

<template>
  <div class="mt-[30px] w-full rounded-tl-[60px] bg-white p-[30px]">
    <div class="h-[30px] w-full flex-start-center">
      <div v-for="(item, index) in navList" :key="index" class="relative mr-[25px] mt-[20px] h-full text-lg font-500" :class="route.path === item.path && 'nav-active' " @click="toPage(item.path)">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.nav-active::before{
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 9;
  width: 80%;
  height: 2px;
  background-image: linear-gradient(270deg,#ffc724 3%,#f80);
}

.nav-active::after{
  content: "";
  position: absolute;
  top:  22px;
  right: 0;
  z-index: 9;
  width: 14px;
  height: 14px;
  opacity: 0.2;
  background: $primary-color;
  border-radius: 50%;
}
</style>

<route lang="yaml">
meta:
  layout: auth
</route>
