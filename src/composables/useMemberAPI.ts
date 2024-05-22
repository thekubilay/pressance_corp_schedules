import MemberAPIClient from "@/server/MemberAPI.ts";
import useStore from "@/composables/useStore.ts";
import {API} from "@/config.ts";

import {AxiosResponse} from "axios";
import {Schedule} from "@/types/Schedule.ts";

export default function () {
  const {schedules} = useStore();
  const APIClient: MemberAPIClient = new MemberAPIClient(API);

  async function SEARCH(): Promise<void> {
    const response: AxiosResponse = await APIClient.search();

  }

  async function INSERT(payload: object): Promise<void> {
    const response: AxiosResponse = await APIClient.insert(payload);

  }


  async function UPDATE(payload: Schedule): Promise<void> {
    const response: AxiosResponse = await APIClient.update(payload);
    schedules.value = schedules.value.map((item: Schedule) => {
      if (item.id === payload.id) {
        item.member = payload.member;
        return item;
      }
      return item;
    }) as Schedule[];
  }

  async function ORDER(payload: Schedule): Promise<void> {
    const response: AxiosResponse = await APIClient.order(payload);
  }

  async function DELETE(payload: Schedule): Promise<void> {
    const response: AxiosResponse = await APIClient.delete(payload);

    if (response.status === 200) {
      schedules.value = schedules.value.filter((item: { id: string }) => item.id !== payload.id);
    }

  }

  return {
    SEARCH,
    INSERT,
    UPDATE,
    ORDER,
    DELETE,
  }
}