<template>
  <div class="px-4 py-4">
    <Dialog v-if="dialog.visible" />
    <div class="flex py-4 justify-between">
      <h1 class="text-dark-blue text-2xl font-bold">行動予定表</h1>
      <div class="flex gap-4">
        <div class="relative">
          <button @click="hidden!=hidden" class="font-medium text-2xl text-dark-blue">
            {{ selected_date.toLocaleDateString("ja-JP", {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}) }}
          </button>
          <VDatePicker v-if="!hidden" v-model="setDate" class="absolute left-0 top-[40px]"/>
        </div>
        <button class="px-4 bg-dark-blue text-white" @click="update">更新</button>
      </div>
    </div>

    <div class="flex justify-between gap-10">
      <AppTable v-for="(item, i) in members" :key="i" :members="item" />
    </div>

  </div>
</template>
<script setup lang="ts">

import AppTable from "@/components/AppTable.vue";
import {computed, onMounted, ref} from "vue";
import useStore from "@/composables/useStore.ts";
import useScheduleAPI from "@/composables/useScheduleAPI.ts";
import GET_CURR_ISO_DATE from "@/utilities/get-curr-isodate.ts";
import Dialog from "@/components/Dialog.vue";

onMounted(async () => {
  await SEARCH(new Date().toISOString().substring(0, 10));
});


const {selected_date, dialog, schedules} = useStore()
const {SEARCH} = useScheduleAPI()
const hidden = ref<boolean>(true)
const members = computed(() => {
  const container = [];
  const data = schedules.value.sort((a, b) => Number(a.order_id) - Number(b.order_id));
  const half = Math.ceil(data.length / 2);
  const firstHalf = data.slice(0, half);
  const secondHalf = data.slice(half);
  container.push(firstHalf, secondHalf);
  return container;
});


const setDate = computed({
  set: async (value) => {
    schedules.value = [];
    selected_date.value = value;
    const iso_date = GET_CURR_ISO_DATE(value);
    await SEARCH(iso_date.substring(0, 10));
  },
  get: () => selected_date.value
})

const update = async (): Promise<void> => {
  schedules.value = [];
  const iso_date = GET_CURR_ISO_DATE(selected_date.value);
  await SEARCH(iso_date.substring(0, 10));
}


</script>