<template>
  <div class="py-10">
    <Loading :loading="loading" position="fixed" />
    <Dialog v-if="dialog.visible"/>
    <h1 class="text-2xl text-center py-10">利用メンバー設定</h1>
    <div class="w-[525px] mx-auto">
      <div class="flex items-center justify-between mb-6">
        <p class="font-medium">利用者名の登録・削除・並び替え</p>
        <button class="bg-dark-blue h-[36px] w-[100px] text-white text-sm" @click="add">メンバー登録</button>
      </div>
      <table>
        <thead>
        <tr>
          <th class="text-base py-3 text-center border-b-4 border-zinc-300 w-[75px]">#</th>
          <th class="text-base py-3 text-left pl-3 border-b-4 border-zinc-300 w-[300px]">名前</th>
          <th class="text-base py-3 text-center border-b-4 border-zinc-300 w-[75px]">修正</th>
          <th class="text-base py-3 text-center border-b-4 border-zinc-300 w-[75px]">削除</th>
        </tr>
        </thead>
        <draggable v-model="members" tag="tbody" item-key="name" @change="order">
          <template #item="{ element, index }">
            <MemberTableTr :item="element" :index="index" class="cursor-grab"/>
          </template>
        </draggable>
      </table>
      <div class="flex justify-between py-6">
        <RouterLink :to="{name:'Home'}" class="px-3 bg-dark-blue h-[36px] text-white text-base flex justify-center items-center w-[100px]">戻る</RouterLink>
        <button class="px-3 bg-dark-blue h-[36px] text-white text-base flex justify-center items-center w-[100px]" @click="empty">白空行追加</button>
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">
import draggable from "vuedraggable";

import useStore from "@/composables/useStore.ts";
import {onMounted, ref, watch} from "vue";
import {Schedule} from "@/types/Schedule.ts";
import MemberTableTr from "@/components/MemberTableTr.vue";
import useMemberAPI from "@/composables/useMemberAPI.ts";
import useScheduleAPI from "@/composables/useScheduleAPI.ts";
import GET_CURR_ISO_DATE from "@/utilities/get-curr-isodate.ts";
import Dialog from "@/components/Dialog.vue";
import Loading from "@/components/Loading.vue";

const {schedules, selected_date, dialog} = useStore()
const {SEARCH: SEARCH_SCHEDULES} = useScheduleAPI()
const {INSERT: INSERT_EMPTY, ORDER} = useMemberAPI()
const members = ref<Schedule[]>([])
const loading = ref<boolean>(false)
onMounted(() => {
  members.value = schedules.value.sort((a, b) => Number(a.order_id) - Number(b.order_id))
})


const add = (): void => {
  dialog.value.component = "member"
  dialog.value.visible = true
}

const order = async (): Promise<void> => {
  loading.value = true
  const payload = {orders: [] as any, table: "schedule_member"}
  members.value.forEach((item, index) => {
    payload.orders.push({id: item.id, order_id: index + 1})
  })
  await ORDER(payload as any)
  await SEARCH_SCHEDULES(GET_CURR_ISO_DATE(selected_date.value).substring(0, 10))
  loading.value = false
}

const empty = async (): Promise<void> => {
  loading.value = true
  const payload = {"member": null, "order_id": 1, "table": "schedule_member"}
  await INSERT_EMPTY(payload as any)
  await SEARCH_SCHEDULES(GET_CURR_ISO_DATE(selected_date.value).substring(0, 10))
  loading.value = false
}

watch(schedules, val => {
  if (!val) return;
  members.value = schedules.value.sort((a, b) => Number(a.order_id) - Number(b.order_id))
})
</script>
