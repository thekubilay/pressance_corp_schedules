import MemoAPIClient from "@/server/MemoAPI.ts";
import useStore from "@/composables/useStore.ts";
import {API} from "@/config.ts";

import {AxiosResponse} from "axios";
import NEXT from "@/utilities/next.ts";

export default function () {
  const {memo} = useStore();
  const APIClient: MemoAPIClient = new MemoAPIClient(API);

  async function SEARCH(date: string): Promise<void> {
    const response: AxiosResponse = await APIClient.search(date);

    if (response.status === 200) {
      memo.value = NEXT(response.data);
    }
  }

  async function INSERT(date: string, data: string): Promise<void> {
    const response: AxiosResponse = await APIClient.insert(date, data);

    if (response.status === 200) {
      memo.value = NEXT(response.data);
    }
  }

  return {
    SEARCH,
    INSERT,
  }
}