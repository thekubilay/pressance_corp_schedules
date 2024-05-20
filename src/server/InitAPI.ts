import ScheduleAPIClient from "@/server/ScheduleAPI";

import {Base} from "@/server/Base";
import {API} from "@/config";

import cookies from "js-cookie";


class InitAPIClient extends Base {
  private response: any;
  public auth_token: string | undefined;
  public scheduleAPIClient: string | undefined;

  constructor() {
    super();
    this.response = null;
    // this.scheduleAPIClient = new ScheduleAPIClient(API);
    this.auth_token = cookies.get("auth_token");
  }

  async init(): Promise<void> {
  }


}

export default InitAPIClient;
