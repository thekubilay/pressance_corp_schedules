<template>
  <div class="px-4 py-4">
    <Dialog v-if="dialog.visible"/>
    <div class="flex py-4 justify-between">
      <h1 class="text-dark-blue text-2xl font-bold">行動予定表</h1>
      <div class="flex gap-4">
        <div ref="calendar" class="relative">
          <button @click="visible=!visible" class="outline-4 py-0.5 font-medium text-2xl text-dark-blue">
            {{
              selected_date.toLocaleDateString("ja-JP", {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
            }}
          </button>
          <VDatePicker v-if="visible" v-model="setDate" class="absolute left-0 top-[40px]"/>
        </div>
        <button class="px-4 bg-dark-blue text-white" @click="update">更新</button>
      </div>
    </div>

    <div class="flex gap-10 sp:gap-4">
      <AppTable v-for="(item, i) in members" :key="i" :members="item"/>
    </div>
    <button class="px-4 bg-dark-blue text-white h-[40px] mt-10 mb-5" @click="open">連絡メモ</button>
    <p>{{memo?.memo}}</p>
  </div>
</template>
<script setup lang="ts">
import Dialog from "@/components/Dialog.vue";
import AppTable from "@/components/AppTable.vue";


import {computed, onMounted, ref} from "vue";
import {onClickOutside, useIntervalFn} from "@vueuse/core";

import useStore from "@/composables/useStore.ts";
import useScheduleAPI from "@/composables/useScheduleAPI.ts";
import GET_CURR_ISO_DATE from "@/utilities/get-curr-isodate.ts";
import useMemoAPI from "@/composables/useMemoAPI.ts";

onMounted(() => {
  useIntervalFn(() => {
    update();
  }, Number(setting.value?.update_time || 3) * 1000 * 60);
})

const {selected_date, dialog, schedules, setting, memo} = useStore()
const {SEARCH: SEARCH_SCHEDULES} = useScheduleAPI()
const {SEARCH: SEARCH_MEMO} = useMemoAPI()
const visible = ref<boolean>(false)
const calendar = ref()
const members = computed(() => {
  const data = schedules.value.sort((a, b) => Number(a.order_id) - Number(b.order_id));
  const f = data.slice(0, Number(setting.value?.row_limit));
  const s = data.slice(Number(setting.value?.row_limit));
  return [f, s];
});

onClickOutside(calendar, () => {
  visible.value = false
})

const setDate = computed({
  set: async (value) => {
    visible.value = false
    schedules.value = [];
    selected_date.value = value;
    const iso_date = GET_CURR_ISO_DATE(value);
    await SEARCH_SCHEDULES(iso_date.substring(0, 10));
    await SEARCH_MEMO(iso_date.substring(0, 10));
  },
  get: () => selected_date.value
})

const update = async (): Promise<void> => {
  schedules.value = [];
  const iso_date = GET_CURR_ISO_DATE(selected_date.value);
  await SEARCH_SCHEDULES(iso_date.substring(0, 10));
  await SEARCH_MEMO(iso_date.substring(0, 10));
}

const open = (): void => {
  dialog.value.component = "memo";
  dialog.value.visible = true;
}


</script>