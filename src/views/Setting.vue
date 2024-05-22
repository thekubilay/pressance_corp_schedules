<template>
  <div>
    <table class="w-full max-w-[600px] mx-auto">
      <caption class="w-full">
        <h1 class="text-2xl w-full text-center text-[22px] font-bold py-10">設定ファイルの編集/更新</h1>
      </caption>
      <thead>
      <tr>
        <th class="w-[74px] border-b px-2 text-base pb-2 text-left">#num</th>
        <th class="w-[198px] border-b px-2 text-base pb-2 text-left">項目</th>
        <th class="w-[90px] border-b px-2 text-base pb-2 text-left">設定値</th>
        <th class="w-[200px] border-b px-2 text-base pb-2 text-left">備考</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td class="pl-3 text-base py-4">1</td>
        <td class="pl-3 text-base py-4">自動更新時間 :</td>
        <td class="pl-3 py-4">
          <input v-model="form.update_time" type="text"
                 class="text-white px-3 w-[140px] bg-dark-blue text-base h-[30px]">
        </td>
        <td class="pl-3 py-4 text-base">1～25（分）で設定</td>
      </tr>
      <tr>
        <td class="pl-3 text-base py-4">2</td>
        <td class="pl-3 text-base py-4">線色 :</td>
        <td class="pl-3 py-4">
          <input v-model="form.line_color" type="text"
                 class="text-white px-3 w-[140px] bg-dark-blue text-base h-[30px]">
        </td>
        <td class="pl-3 py-4 text-base">16進数カラーコード</td>
      </tr>
      <tr>
        <td class="pl-3 text-base py-4">3</td>
        <td class="pl-3 text-base py-4">"行先" 文字制限 :</td>
        <td class="pl-3 py-4">
          <input v-model="form.content_char_limit" type="text"
                 class="text-white px-3 w-[140px] bg-dark-blue text-base h-[30px]">
        </td>
        <td class="px-3 py-4 text-base">10～40（文字）で設定</td>
      </tr>
      <tr>
        <td class="pl-3 text-base py-4">4</td>
        <td class="pl-3 text-base py-4">"備考" 文字制限 :</td>
        <td class="pl-3 py-4">
          <input v-model="form.remark_char_limit" type="text"
                 class="text-white px-3 w-[140px] bg-dark-blue text-base h-[30px]">
        </td>
        <td class="px-3 py-4 text-base">10～40（文字）で設定</td>
      </tr>
      <tr>
        <td class="pl-3 text-base py-4">5</td>
        <td class="pl-3 text-base py-4">"備考" "名前" 文字制限 :</td>
        <td class="pl-3 py-4">
          <input v-model="form.name_char_limit" type="text"
                 class="text-white px-3 w-[140px] bg-dark-blue text-base h-[30px]">
        </td>
        <td class="pl-3 py-4 text-base">10～40（文字）で設定</td>
      </tr>
      <tr>
        <td class="pl-3 text-base py-4">6</td>
        <td class="pl-3 text-base py-4">行動予定表メモ連絡 :</td>
        <td class="pl-3 py-4 text-center">
          <input v-model="setMemoVisible" type="checkbox" class="w-[30px] h-[30px]">
        </td>
        <td class="px-3 py-4 text-base">10～40（文字）で設定</td>
      </tr>
      <tr>
        <td class="pl-3 text-base py-4">6</td>
        <td class="pl-3 text-base py-4">行動予定表表枠 :</td>
        <td class="pl-3 py-4 text-center">
          <input v-model="form.row_limit" type="text" class="text-white px-3 w-[140px] bg-dark-blue text-base h-[30px]">
        </td>
        <td class="pl-3 py-4 text-base">1テーブルで適切行数1〜30</td>
      </tr>
      </tbody>
    </table>
    <div class="flex justify-center gap-20 py-12">
      <RouterLink :to="{name:'Home'}" class="bg-dark-blue text-white h-[38px] w-[150px] flex items-center justify-center">
        戻る
      </RouterLink>
      <button @click="submit" class="bg-dark-blue text-white h-[38px] w-[150px] flex items-center justify-center">
        決定
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">


import {computed, onMounted, reactive, watch} from "vue";
import useSettingAPI from "@/composables/useSettingAPI.ts";
import useStore from "@/composables/useStore.ts";
import {set} from "@vueuse/core";

onMounted(() => {
  if (setting.value) {
    form.update_time = setting.value.update_time
    form.row_limit = setting.value.row_limit
    form.content_char_limit = setting.value.content_char_limit
    form.remark_char_limit = setting.value.remark_char_limit
    form.name_char_limit = setting.value.name_char_limit
    form.line_color = setting.value.line_color
    form.memo_visible = setting.value.memo_visible
  }
})

const {INSERT} = useSettingAPI()
const {setting} = useStore()
const form = reactive({
  "row_limit": "30",
  "update_time": "3",
  "title": null,
  "content_char_limit": "30",
  "remark_char_limit": "20",
  "name_char_limit": "10",
  "font_size": "12",
  "line_color": "00008b",
  "memo_visible": "1"
})

const setMemoVisible = computed({
  set: (value: boolean) => {
    form.memo_visible = value ? "1" : "0"
  },
  get: () => form.memo_visible === "1"
})

const submit = (): void => {
  const payload = {
    "id": "1",
    "update_time": form.update_time,
    "row_limit": form.row_limit,
    "content_char_limit": form.content_char_limit,
    "remark_char_limit": form.remark_char_limit,
    "name_char_limit": form.name_char_limit,
    "line_color": form.line_color,
    "memo_visible": Number(form.memo_visible),
    "table": "schedule_setting"
  }

  setting.value = {
    "id": "1",
    "title": null,
    "update_time": form.update_time,
    "row_limit": form.row_limit,
    "content_char_limit": form.content_char_limit,
    "remark_char_limit": form.remark_char_limit,
    "name_char_limit": form.name_char_limit,
    "line_color": form.line_color,
    "font_size": "12",
    "memo_visible": String(form.memo_visible),
  }

  INSERT(payload)
}

watch(setting, val => {
  if (val) {
    form.update_time = val.update_time
    form.row_limit = val.row_limit
    form.content_char_limit = val.content_char_limit
    form.remark_char_limit = val.remark_char_limit
    form.name_char_limit = val.name_char_limit
    form.line_color = val.line_color
    form.memo_visible = val.memo_visible
  }
})
</script>