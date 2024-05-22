import ScheduleAPIClient from "@/server/ScheduleAPI";

import {Base} from "@/server/Base";
import {API} from "@/config";

import cookies from "js-cookie";
import MemoAPIClient from "@/server/MemoAPI.ts";
import SettingAPIClient from "@/server/SettingAPI.ts";
import useStore from "@/composables/useStore.ts";
import NEXT from "@/utilities/next.ts";


class InitAPIClient extends Base {
  private response: any;
  public auth_token: string | undefined;
  public scheduleAPIClient: ScheduleAPIClient;
  public memoAPIAction: MemoAPIClient;
  public settingAPIClient: SettingAPIClient;

  constructor() {
    super();
    this.response = null;
    this.scheduleAPIClient = new ScheduleAPIClient(API);
    this.memoAPIAction = new MemoAPIClient(API);
    this.settingAPIClient = new SettingAPIClient(API);
    this.auth_token = cookies.get("auth_token");
  }

  async init(): Promise<void> {

  }

  async retrieve(): Promise<any> {
    const {schedules, setting, memo}: any = useStore();

    const r1 = await this.scheduleAPIClient.search(new Date().toISOString().substring(0, 10));

    if (r1.status === 200) {
      schedules.value = r1.data;
    }
    const r2 = await this.memoAPIAction.search(new Date().toISOString().substring(0, 10));
    if (r2.status === 200) {
      memo.value = NEXT(r2.data);
    }

    const r3 = await this.settingAPIClient.search();
    if (r3.status === 200) {
      setting.value = NEXT(r3.data);
    }
  }


}

export default InitAPIClient;
