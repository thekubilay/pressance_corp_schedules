<template>
  <div class="fixed flex justify-center items-center h-screen w-full">
    <div ref="element" class="px-5 py-5 w-[500px] bg-white relative shadow-2xl">
      <button class="absolute bg-white -right-5 -top-5 w-[40px] h-[40px] shadow" @click="close">
        <i class="fa fa-times"></i>
      </button>
      <component :is="component"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import {defineAsyncComponent, onMounted, ref, shallowRef} from "vue";
import {onClickOutside} from "@vueuse/core";

import useStore from "@/composables/useStore.ts";

onMounted(() => {
  switch (dialog.value?.component) {
    case "schedule":
      component.value = defineAsyncComponent(() => import('@/components/ScheduleDialog.vue'));
      break;
    case "memo":
      component.value = defineAsyncComponent(() => import('@/components/MemoDialog.vue'));
      break;
    default:
      dialog.value.visible = false
      dialog.value.content = null
      dialog.value.component = "schedule"
      break;
  }
})

const {dialog} = useStore()
const component = shallowRef()
const element = ref()
const date = ref<string | null>(null)
const close = (): void => {
  dialog.value.visible = false;
  setTimeout(() => {
    dialog.value.content = null;
  }, 300)
}

onClickOutside(element, close)
</script>