import {defineStore} from "pinia";
import {Schedule} from "@/types/Schedule";

interface Store {
  selected_date: Date;
  dialog: {
    visible: boolean;
    content: Schedule | null;
  };
  schedules: Schedule[];
}

const store = defineStore({
  id: 'main',
  state: (): Store => ({
    selected_date: new Date(),
    dialog: {visible: false, content: null},
    schedules: [],
    memo: [],
    setting: null
  })
})

export default store