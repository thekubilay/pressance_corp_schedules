<template>
  <div class="py-10">
    <h1 class="text-2xl text-center py-10">利用メンバー設定</h1>
    <div class="w-[525px] mx-auto">
      <div class="flex items-center justify-between mb-6">
        <p class="font-medium">利用者名の登録・削除・並び替え</p>
        <button class="px-3 bg-dark-blue h-[36px] text-white text-base" @click="add">メンバー登録</button>
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
        <draggable v-model="members" tag="tbody" item-key="name">
          <template #item="{ element, index }">
            <MemberTableTr :item="element" :index="index"/>
          </template>
        </draggable>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
import draggable from "vuedraggable";

import useStore from "@/composables/useStore.ts";
import {ref, watch} from "vue";
import {Schedule} from "@/types/Schedule.ts";
import MemberTableTr from "@/components/MemberTableTr.vue";

const {schedules} = useStore()
const members = ref<Schedule[]>([])
const member = ref<Schedule>({} as Schedule)
const isEdit = ref<boolean>(false)
const edit = (item: Schedule): void => {
  isEdit.value = true
  member.value = item
}
const add = (): void => {
  isEdit.value = false
}
watch(schedules, val => {
  if (!val) return;
  members.value = schedules.value.sort((a, b) => Number(a.order_id) - Number(b.order_id))
})
</script>
