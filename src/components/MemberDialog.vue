<template>
  <div class="mb-4 relative">
    <Loading :loading="loading"/>
    <p class="mb-4 text-center">メンバー入力フォーム</p>
    <div class="flex gap-4 items-center mb-4">
      <input v-model="form" type="text" placeholder="名前" class="w-full border border-zinc-900 px-3 py-3"/>
    </div>
    <div class="flex gap-4"></div>
  </div>
  <div class="flex gap-6 w-full justify-center">
    <button class="bg-dark-blue text-white font-medium text-lg h-[40px] w-[150px]" @click="submit">メンバー登録</button>
  </div>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";

import useStore from "@/composables/useStore.ts";
import useMemoAPI from "@/composables/useMemoAPI.ts";
import GET_CURR_ISO_DATE from "@/utilities/get-curr-isodate.ts";
import useMemberAPI from "@/composables/useMemberAPI.ts";
import useScheduleAPI from "@/composables/useScheduleAPI.ts";
import Loading from "@/components/Loading.vue";


const {dialog, schedules, selected_date} = useStore()
const loading = ref<boolean>(false)
const form = ref<string>("")
const {INSERT} = useMemberAPI()
const {SEARCH: SEARCH_SCHEDULES} = useScheduleAPI()

const submit = async (): Promise<void> => {
  loading.value = true
  await INSERT({member: form.value, table: "schedule_member", order_id: schedules.value.length + 1})
  await SEARCH_SCHEDULES(GET_CURR_ISO_DATE(selected_date.value).substring(0, 10))
  dialog.value.visible = false
  loading.value = false
}

</script>