<template>
  <div class="py-10">
    <h1 class="text-2xl text-center py-10">利用メンバー設定</h1>
    <div class="w-[525px] mx-auto">
      <p class="text-xl mb-6">利用者名の登録・削除・並び替え</p>
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
            <tr class="even:bg-[#f2f2f2] odd:bg-white">
              <td class="text-center py-1 border-b w-[75px] text-base">{{ index+1 }}</td>
              <td class="pl-3 py-1 border-b w-[300px]">
                <p v-if="element.member"
                   class="h-[36px] w-[100px] flex items-center justify-center bg-dark-blue text-white text-base">
                  {{ element.member }}
                </p>
              </td>
              <td class="text-center p-1 border-b w-[75px]">
                <button class="bg-[#3742fa] mx-auto flex items-center justify-center text-white w-[40px] h-[36px]">
                  <i class="fa fa-pencil"></i>
                </button>
              </td>
              <td class="text-center py-1 border-b w-[75px]">
                <button class="bg-red-600 mx-auto flex items-center justify-center text-white w-[40px] h-[36px]">
                  <i class="fa fa-trash"></i>
                </button>
              </td>
            </tr>
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

const {schedules} = useStore()
const members = ref<Schedule[]>([])
watch(schedules, val => {
  if (!val) return;
  members.value = schedules.value.sort((a, b) => Number(a.order_id) - Number(b.order_id))
})
</script>
