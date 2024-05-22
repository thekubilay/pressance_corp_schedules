<template>
  <RouterView class="bg-[#f2f2f2]"/>
  <footer v-if="user_type" class="bg-[#f1f2f6] gap-6 flex w-full py-10 border-t-2 justify-center">
    <RouterLink v-if="user_type === 'admin'" :to="{name:'Setting'}" class="text-center">個別表示設定</RouterLink>
    <RouterLink v-if="user_type === 'admin'" :to="{name:'AdminPanel'}" class="text-center">Admin Panel</RouterLink>
    <button class="text-center" @click="logout">ログアウト</button>
  </footer>
</template>
<script lang="ts" setup>
import {useRouter} from "vue-router";
import useStore from "@/composables/useStore.ts";

const {user_type} = useStore()
const router = useRouter();
const logout = (): void => {
  user_type.value = null;
  localStorage.removeItem("user_type");
  router.push("/login");
}
</script>