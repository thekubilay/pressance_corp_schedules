import ScheduleAPIClient from "@/server/ScheduleAPI.ts";
import useStore from "@/composables/useStore.ts";
import {API} from "@/config.ts";

import {AxiosResponse} from "axios";

export default function () {
  const {schedules} = useStore();
  const APIClient: ScheduleAPIClient = new ScheduleAPIClient(API);

  async function SEARCH(date:string): Promise<void> {
    const response: AxiosResponse = await APIClient.search(date);

    if (response.status === 200) {
      schedules.value = response.data;
    }
  }

  return {
    SEARCH,
  }
}