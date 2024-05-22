<template>
  <transition name="fade">
    <div v-if="loading" :class="position"
         class="z-50 left-0 top-0 h-full bg-opacity-10 bg-white inset-0 w-full flex items-center justify-center rounded-lg">
      <div class="spinner"/>
    </div>
  </transition>
</template>
<script setup lang="ts">

import {PropType} from "vue";

defineProps({
  loading: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  position: {
    type: String as PropType<string>,
    default: "absolute"
  }
})

// watch(() => props.loading, val => {
//   document.body.style.pointerEvents = val ? "none" : "auto";
// })

</script>
<style>
.spinner {
  border: 3px solid #dcdcdc;
  border-radius: 50%;
  border-top: 4px solid #0f172a;
  width: 40px;
  height: 40px;
  animation: spin .4s linear infinite;
  -webkit-animation: spin .4s linear infinite; /* Safari */
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
