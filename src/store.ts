import {defineStore} from "pinia";
import {Schedule} from "@/types/Schedule";
import {Memo} from "@/types/Memo.ts";
import {Setting} from "@/types/Setting.ts";

interface Store {
  user_type: string | null,
  users: {
    type: string;
    username: string;
    password: string;
  }[]
  selected_date: Date;
  dialog: {
    visible: boolean;
    content: Schedule | null;
    component: "schedule" | "memo" | "setting" | "none" | "member",
  };
  schedules: Schedule[];
  memo: null | Memo;
  setting: null | Setting;
}

const store = defineStore({
  id: 'main',
  state: (): Store => ({
    user_type: localStorage.getItem('user_type') || null,
    users: [
      {type: "user", username: "ps", password: "ps"},
      {type: "admin", username: "psadmin", password: "psadmin"}
    ],
    selected_date: new Date(),
    dialog: {visible: false, content: null, component: "schedule"},
    schedules: [],
    memo: null,
    setting: null
  })
})

export default store