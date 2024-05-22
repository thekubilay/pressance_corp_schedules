import ScheduleAPIClient from "@/server/ScheduleAPI.ts";
import useStore from "@/composables/useStore.ts";
import {API} from "@/config.ts";

import {AxiosResponse} from "axios";
import {MemberSchedule, Schedule} from "@/types/Schedule.ts";

export default function () {
  const {schedules} = useStore();
  const APIClient: ScheduleAPIClient = new ScheduleAPIClient(API);

  async function SEARCH(date: string): Promise<void> {
    const response: AxiosResponse = await APIClient.search(date);

    if (response.status === 200) {
      schedules.value = response.data;
    }
  }


  async function INSERT(date: string, payload: any): Promise<void> {
    const response: AxiosResponse = await APIClient.insert(payload);
    if (response.status === 200) {
      schedules.value.forEach((data: Schedule) => {
        data.schedules.forEach((schedule: MemberSchedule) => {
          if (schedule.member_id === payload.member_id) {
            Object.assign(schedule, payload);
          }
        })
      })
    }
  }

  return {
    SEARCH,
    INSERT,
  }
}