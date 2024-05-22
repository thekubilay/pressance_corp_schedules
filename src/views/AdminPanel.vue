<template>
  <div class="flex flex-col justify-center items-center h-[calc(100%-106px)]">
    <h1 class="text-2xl mb-6">管理メニュー</h1>
    <RouterLink :to="{name:'Members'}"
                class="h-[40px] w-[136px] mb-4 flex justify-center items-center text-sm bg-dark-blue text-white">
      使用メンバー設定
    </RouterLink>
    <RouterLink :to="{name:'Setting'}"
                class="h-[40px] w-[136px] mb-6 flex justify-center items-center text-sm bg-dark-blue text-white">
      ページ設定
    </RouterLink>
    <RouterLink :to="{name:'Home'}" class="w-[75px] h-[32px] flex items-center justify-center text-sm bg-[#ced6e0]">
      戻る
    </RouterLink>
  </div>
</template>

<style scoped>

</style>