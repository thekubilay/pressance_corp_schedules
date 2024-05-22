<template>
  <div class="mb-4">
    <p class="mb-4 text-center">メモ入力フォーム</p>
    <div class="flex gap-4 items-center mb-4">
      <textarea v-model="form" rows="3" class="w-full border border-zinc-900 px-3 py-3"></textarea>
    </div>
    <div class="flex gap-4"></div>
  </div>
  <div class="flex gap-6 w-full justify-center">
    <button class="bg-dark-blue text-white font-medium text-lg h-[40px] w-1/2" @click="submit">メモ登録</button>
  </div>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";

import useStore from "@/composables/useStore.ts";
import useMemoAPI from "@/composables/useMemoAPI.ts";
import GET_CURR_ISO_DATE from "@/utilities/get-curr-isodate.ts";

onMounted(() => {
  form.value = memo.value?.memo as string
})

const {dialog, memo, selected_date} = useStore()
const form = ref<string>("")
const {INSERT} = useMemoAPI()

const submit = (): void => {
  INSERT(GET_CURR_ISO_DATE(selected_date.value).substring(0, 10), form.value)
  dialog.value.visible = false
}

</script>