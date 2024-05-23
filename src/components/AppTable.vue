<template>
  <table class="border-2 border-dark-blue w-full border-collapse">
    <thead>
    <tr>
      <th class="sp:font-normal sp:text-sm font-bold py-2 w-[105px] border-b-2 border-r-2 border-blue-800 text-dark-blue">
        名<span class="sp:hidden inline-block mx-2"></span>前
      </th>
      <th class="sp:font-normal sp:text-sm font-bold py-2 border-r-2 border-b-2 border-blue-800 text-dark-blue">
        行<span class="sp:hidden inline-block mx-4"></span>先
      </th>
      <th class="sp:font-normal sp:text-sm font-bold py-2 w-[90px] max-w-[90px] border-r-2 border-b-2 border-blue-800 text-dark-blue">帰社日時</th>
      <th class="sp:font-normal sp:text-sm font-bold py-2 w-[160px] max-w-[160px] border-b-2 border-blue-800 text-dark-blue">
        備<span class="sp:hidden inline-block mx-2"></span>考
      </th>
    </tr>
    </thead>
    <tbody>
    <AppTableTr v-for="(item, i) in members" :key="i" :item="item"/>
    </tbody>
  </table>
</template>
<script setup lang="ts">
import AppTableTr from "@/components/AppTableTr.vue";

import {PropType} from "vue";
import {Schedule} from "@/types/Schedule.ts";

defineProps({
  members: {
    type: Array as PropType<Schedule[]>,
    required: true
  }
})

</script>