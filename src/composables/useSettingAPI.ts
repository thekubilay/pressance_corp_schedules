import SettingAPIClient from "@/server/SettingAPI.ts";
import useStore from "@/composables/useStore.ts";
import {API} from "@/config.ts";

import {AxiosResponse} from "axios";

export default function () {
  const {setting} = useStore();
  const APIClient: SettingAPIClient = new SettingAPIClient(API);

  async function SEARCH(date: string): Promise<void> {
    const response: AxiosResponse = await APIClient.search();

    if (response.status === 200) {
      setting.value = response.data;
    }
  }

  async function INSERT(data: object): Promise<void> {
    const response: AxiosResponse = await APIClient.insert(data);
  }

  return {
    SEARCH,
    INSERT,
  }
}