<template>
  <tr>
    <td class="px-1 py-1 border-b-2 border-r-2 border-dark-blue h-[40px]">
      <button v-if="item.member" class="bg-dark-blue text-white font-bold text-lg text-center h-full w-full" @click="open">{{ item.member }}</button>
    </td>
    <td class="px-3 py-1 border-b-2 border-r-2 border-dark-blue font-bold text-md" :class="classes">{{ NEXT(item.schedules)?.content }}</td>
    <td class="px-1 py-1 border-b-2 border-r-2 border-dark-blue text-center font-bold" :class="classes">{{ dateTime }}</td>
    <td class="px-1 py-1 border-b-2 border-dark-blue" :class="classes"></td>
  </tr>
</template>
<script setup lang="ts">

import {computed, PropType} from "vue";
import {Schedule} from "@/types/Schedule.ts";

import NEXT from "@/utilities/next.ts";
import useStore from "@/composables/useStore.ts";
import GET_CURR_ISO_DATE from "@/utilities/get-curr-isodate.ts";


const props = defineProps({
  item: {
    type: Object as PropType<Schedule>,
    required: true
  },
})

const {selected_date, dialog} = useStore()

const classes = computed(() => {
  const content = NEXT(props.item.schedules)
  const is_direct_return = content?.direct_return !== "0"
  const is_display_return = content?.display_return !== "0"
  const return_time = String(content?.return_time)
  const return_date = content?.return_date || ""

  const future = selected_date.value.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
  console.log(selected_date.value)

  if (future) return "";

  const passed = new Date() > new Date(`${GET_CURR_ISO_DATE(selected_date.value).substring(0, 10)}T${return_time.slice(0, 2)}:${return_time.slice(2)}:00`)
  console.log(new Date(`${GET_CURR_ISO_DATE(selected_date.value).substring(0, 10)}T${return_time.slice(0, 2)}:${return_time.slice(2)}:00`))

  if (passed) {
    return "text-red-500"
  }


  return ""
})


const dateTime = computed(() => {
  const content = NEXT(props.item.schedules)

  if (!content) return ""

  const is_direct_return = content?.direct_return !== "0"
  const is_display_return = content?.display_return !== "0"

  let return_time = String(content?.return_time)
  let return_date = content?.return_date ? String(content?.return_date).substring(5).replace("-", "/") : null

  if (!is_display_return) return ""

  if (is_direct_return) {
    if (props.item?.member) return "NR"
    return ""
  }

  if (!return_time) {
    if (return_date) {
      return return_date
    }
    return ""
  }


  if (return_date) {
    if (return_time.length === 2) {
      return_time = return_time + "00"
    }
    return `${return_date} - ${return_time.slice(0, 2)}:${return_time.slice(2)}`
  }

  if (return_time.length === 2) {
    return_time = return_time + "00"
  }

  return `${return_time.slice(0, 2)}:${return_time.slice(2)}`
})

const open = (): void => {
  dialog.value = {
    visible: true,
    content: props.item
  }
}
</script>