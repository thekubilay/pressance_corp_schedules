<template>
  <div class="mb-10">
    <p class="mb-4 text-center">行動予定入力フォーム</p>
    <div class="flex gap-4 items-center mb-4">
      <p class="bg-soft-blue px-4 h-[36px] flex items-center  text-white mr-1">担当者名</p>
      <p>{{ dialog.content?.member }}</p>
    </div>
    <div class="flex gap-4 items-center mb-4">
      <p class="bg-soft-blue px-4 h-[36px] flex items-center text-white mr-1">行先記入</p>
      <input v-model="form.content" type="text" class="px-3 border-2 border-zinc-900 h-[36px] w-[calc(100%-118px)]"/>
    </div>
    <div class="flex gap-4 items-center mb-4">
      <p class="bg-soft-blue px-4 py-1.5 text-white mr-1">帰社予定</p>
      <div class="flex gap-2">
        <div ref="date_wrap" class="relative w-[144px]">
          <VDatePicker v-if="visible" v-model="setDate" class="absolute left-0 top-[40px]"/>
          <p v-text="form.return_date" type="text"
             class="flex items-center px-3 border-2 border-zinc-900 h-[36px] w-full cursor-pointer"
             @click="visible=!visible"/>
          <button v-if="form.return_date.length" @click="clear"
                  class="absolute right-2 top-2 rounded-full border w-[20px] h-[20px]">
            <i class="fa fa-times text-sm relative -top-1"></i>
          </button>
        </div>
        <select v-model="form.return_hour" class="px-3 border-2 border-zinc-900 h-[36px] w-[90px]">
          <option value="00">00時</option>
          <option value="01">01時</option>
          <option value="02">02時</option>
          <option value="03">03時</option>
          <option value="04">04時</option>
          <option value="05">05時</option>
          <option value="06">06時</option>
          <option value="07">07時</option>
          <option value="08">08時</option>
          <option value="09">09時</option>
          <option value="10">10時</option>
          <option value="11">11時</option>
          <option value="12">12時</option>
          <option value="13">13時</option>
          <option value="14">14時</option>
          <option value="15">15時</option>
          <option value="16">16時</option>
          <option value="17">17時</option>
          <option value="18">18時</option>
          <option value="19">19時</option>
          <option value="20">20時</option>
          <option value="21">21時</option>
          <option value="22">22時</option>
          <option value="23">23時</option>
        </select>
        <select v-model="form.return_minute" class="px-3 border-2 border-zinc-900 h-[36px] w-[92px]">
          <option value="00">00分</option>
          <option value="15">15分</option>
          <option value="30">30分</option>
          <option value="45">45分</option>
        </select>
      </div>
    </div>
    <div class="flex gap-4 items-center mb-4">
      <p class="bg-soft-blue px-4 h-[36px] flex items-center text-white mr-1 opacity-0">行先記入</p>
      <div class="flex items-center gap-6">
        <label for="display_return" class="flex items-center gap-3">
          <input v-model="setDisplayReturn" id="display_return" type="checkbox" class="w-[20px] h-[20px]">
          <span>帰社日時を表示する</span>
        </label>
        <label for="direct_return" class="flex items-center gap-3">
          <input v-model="setDirectReturn" id="direct_return" type="checkbox" class="w-[20px] h-[20px]">
          <span>直帰</span>
        </label>
      </div>
    </div>
    <div class="flex gap-4 items-center mb-4">
      <p class="bg-soft-blue px-4 h-[36px] flex items-center text-white mr-1">行先記入</p>
      <input v-model="form.remark" type="text" class="px-3 border-2 border-zinc-900 h-[36px] w-[calc(100%-118px)]"/>
    </div>
  </div>
  <div class="flex gap-6 w-full">
    <button class="bg-dark-blue text-white font-medium text-lg h-[40px] w-1/2" @click="submit">行動予定登録</button>
    <button class="bg-red-500 text-white font-medium text-lg h-[40px] w-1/2" @click="remove">予定削除</button>
  </div>
</template>
<script setup lang="ts">
import NEXT from "@/utilities/next.ts";
import useStore from "@/composables/useStore.ts";
import {computed, onBeforeUnmount, onMounted, reactive, ref} from "vue";
import GET_CURR_ISO_DATE from "@/utilities/get-curr-isodate.ts";
import {MemberSchedule} from "@/types/Schedule.ts";
import useScheduleAPI from "@/composables/useScheduleAPI.ts";
import {onClickOutside} from "@vueuse/core";

const {dialog, selected_date} = useStore()
const {INSERT} = useScheduleAPI()
const visible = ref(false)
const date_wrap = ref()
const member_id = ref("")

onMounted(() => {
  const data: MemberSchedule = (NEXT(dialog.value.content?.schedules as any) as any)

  member_id.value = data.member_id;

  form.content = data.content
  form.return_date = !data.return_date ? "" : data.return_date
  form.direct_return = String(data.direct_return)
  form.display_return = String(data.display_return)

  if (form.direct_return === "0") {
    form.return_hour = data.return_time.substring(0, 2)
    form.return_minute = data.return_time.substring(2, 6)
  }

  form.remark = data.remark
})

onBeforeUnmount(() => {
  form.content = null
  form.return_date = null
  form.return_hour = ""
  form.return_minute = ""
  form.direct_return = "0"
  form.display_return = "0"
  form.remark = null

})

const form = reactive<{ [key: string]: any }>({
  content: "",
  return_date: "",
  return_hour: "",
  return_minute: "",
  direct_return: "0",
  display_return: "0",
  remark: ""
})

onClickOutside(date_wrap, () => {
  visible.value = false
})

const setDate = computed({
  set: async (value: Date) => {
    visible.value = false
    if (value) {
      form.return_date = GET_CURR_ISO_DATE(value).substring(0, 10)
    }
  },
  get: () => form.return_date as any
})

const setDirectReturn = computed({
  set: (value: boolean) => {
    form.direct_return = value ? "1" : "0"
  },
  get: () => form.direct_return === "1"
})

const setDisplayReturn = computed({
  set: (value: boolean) => {
    form.display_return = value ? "1" : "0"
  },
  get: () => form.display_return === "1"
})

const clear = (): void => {
  form.return_date = null
}

const remove = (): void => {
  const payload = {
    "member_id": member_id.value,
    "content": "",
    "holiday_work_start": null,
    "holiday_work_finish": null,
    "return_date": null,
    "return_time": "",
    "display_return": 1,
    "direct_return": 0,
    "remark": "",
    "created_at": GET_CURR_ISO_DATE(selected_date.value).substring(0, 10),
    "table": "schedule_schedule"
  }
  INSERT(GET_CURR_ISO_DATE(selected_date.value).substring(0, 10), payload)
  dialog.value.visible = false
  dialog.value.content = null
}

const submit = (): void => {
  let return_time = null

  if (form.direct_return === "0") {
    return_time = form.return_hour + (form.return_minute ? form.return_minute : "00")
  }

  const payload = {
    "member_id": member_id.value,
    "content": form.content,
    "holiday_work_start": null,
    "holiday_work_finish": null,
    "return_date": form.return_date,
    "return_time": return_time,
    "display_return": Number(form.display_return),
    "direct_return": Number(form.direct_return),
    "remark": form.remark,
    "created_at": GET_CURR_ISO_DATE(selected_date.value).substring(0, 10),
    "table": "schedule_schedule"
  }
  INSERT(GET_CURR_ISO_DATE(selected_date.value).substring(0, 10), payload)
  dialog.value.visible = false
  dialog.value.content = null

}

</script>