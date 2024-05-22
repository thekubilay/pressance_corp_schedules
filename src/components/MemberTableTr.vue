<template>
  <tr class="even:bg-[#f2f2f2] odd:bg-white">
    <td class="text-center py-1 border-b w-[75px] text-base border-r">{{ index + 1 }}</td>
    <td class="pl-3 py-1 border-b w-[300px] border-r">
      <p v-if="!isEdit && item.member"
         class="h-[36px] w-[100px] flex items-center justify-center bg-dark-blue text-white text-base">
        {{ item.member }}
      </p>
      <input v-else-if="isEdit && item.member" v-model="name" type="text" :maxlength="setting?.name_char_limit"
             class="px-3 border py-1">
    </td>
    <td class="text-center p-1 border-b w-[75px] border-r">
      <button v-if="!isEdit"
              class="bg-[#3742fa] mx-auto flex items-center justify-center text-white w-[40px] h-[36px]" @click="edit">
        <i class="fa fa-pencil"></i>
      </button>
      <button v-else
              class="bg-emerald-500 mx-auto flex items-center justify-center text-white w-[40px] h-[36px]"
              @click="submit">
        <i class="fa fa-paper-plane"></i>
      </button>
    </td>
    <td class="text-center py-1 border-b w-[75px]">
      <button class="bg-red-600 mx-auto flex items-center justify-center text-white w-[40px] h-[36px]" @click="remove">
        <i class="fa fa-trash"></i>
      </button>
    </td>
  </tr>
</template>
<script setup lang="ts">

import {Schedule} from "@/types/Schedule.ts";
import {PropType, ref} from "vue";
import useStore from "@/composables/useStore.ts";
import useMemberAPI from "@/composables/useMemberAPI.ts";

const props = defineProps({
  index: {
    type: Number as PropType<number>, default: 0,
  },
  item: {
    type: Object as PropType<Schedule>, default: {} as Schedule,
  }
})

const {DELETE, UPDATE} = useMemberAPI()
const {setting} = useStore()
const isEdit = ref<boolean>(false)
const name = ref<string>("")

const edit = (): void => {
  name.value = props.item.member
  isEdit.value = true
}

const remove = (): void => {
  const payload = {"id": props.item.id, "table": "schedule_member"}
  DELETE(payload as any)
}

const submit = (): void => {
  isEdit.value = false
  const payload = {"member": name.value, "id": props.item.id, "table": "schedule_member"}
  UPDATE(payload as any)
}

</script>
