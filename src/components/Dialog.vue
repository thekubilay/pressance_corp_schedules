<template>
  <div class="fixed flex justify-center items-center h-screen w-full">
    <div ref="element" class="px-5 py-5 w-[500px] bg-white relative shadow-2xl">
      <button class="absolute bg-white -right-5 -top-5 w-[40px] h-[40px] shadow" @click="close">x</button>
      <div v-if="dialog.content">
        <p class="mb-4 text-center">行動予定入力フォーム</p>
        <div class="flex gap-4 items-center mb-4">
          <p class="bg-soft-blue px-4 py-1.5 text-white mr-1">担当者名</p>
          <p>{{dialog.content?.member}}</p>
        </div>
        <div class="flex gap-4 items-center mb-4">
          <p class="bg-soft-blue px-4 py-1.5 text-white mr-1">行先記入</p>
          <p>{{(NEXT(dialog.content.schedules as any) as any).content}}</p>
        </div>
        <div class="flex gap-4 items-center mb-4">
          <p class="bg-soft-blue px-4 py-1.5 text-white mr-1">帰社予定</p>
          <p>{{(NEXT(dialog.content.schedules as any) as any).content}}</p>
        </div>
        <div class="flex gap-4"></div>
      </div>
      <div class="flex gap-6 w-full">
        <button class="bg-dark-blue text-white font-medium text-lg h-[40px] w-1/2" @click="submit">行動予定登録</button>
        <button class="bg-red-500 text-white font-medium text-lg h-[40px] w-1/2" @click="remove">予定削除</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

import useStore from "@/composables/useStore.ts";
import {ref} from "vue";
import {onClickOutside} from "@vueuse/core";
import NEXT from "../utilities/next.ts";

const {dialog} = useStore()
const element = ref()
const close = (): void => {
  dialog.value.visible = false;
  setTimeout(() => {
    dialog.value.content = null;
  }, 300)
}

onClickOutside(element, close)

const remove = (): void => {
  console.log("remove")
  close()
}

const submit = (): void => {
  console.log("submit")
  close()
}

</script>