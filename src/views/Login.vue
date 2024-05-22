<template>
  <div class="h-screen w-full flex items-center justify-center">
    <div>
      <h1 class="font-medium text-2xl mb-8">Pressance Corp. Schedules</h1>
      <div>
        <div class="flex gap-6 items-center mb-4">
          <span class="block mr-1">ユーザー名</span>
          <input type="text" class="h-[36px] px-3 border border-zinc-900" v-model="username">
        </div>
        <div class="flex gap-6 items-center mb-6">
          <span class="block mr-1">パスワード</span>
          <input type="text" class="h-[36px] px-3 border border-zinc-900" v-model="password">
        </div>
        <button @click="login" class="block mx-auto w-[100px] bg-dark-blue text-white h-[40px] px-4 mb-4">ログイン
        </button>
        <p v-if="error.length" class="text-red-500">{{ error }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref, watch} from "vue";
import {useRouter} from "vue-router";

import useStore from "@/composables/useStore.ts";

const {users, user_type} = useStore();
const router = useRouter()
const username = ref("");
const password = ref("");
const error = ref("");

const login = (): void => {
  users.value.forEach((user) => {
    if (user.username === username.value.trim() && user.password === password.value.trim()) {
      localStorage.setItem("user_type", user.type);
      user_type.value = user.type;
      router.push("/");
    }
  })

  error.value = "ユーザー名またはパスワードが違います。";
}

watch(username, () => {
  error.value = "";
})
watch(password, () => {
  error.value = "";
})
</script>

