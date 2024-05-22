import {Base} from "@/server/Base";
import axios, {AxiosResponse} from "axios";

class ScheduleAPIClient extends Base {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    super();
    this.baseUrl = baseUrl;
  }


  async search(date: string): Promise<AxiosResponse> {
    try {
      const payload = {
        "date": date,
        "table_schedule": "schedule_schedule",
        "table_member": "schedule_member"
      }
      return await axios.post(`${this.baseUrl}/schedule/read.php`, payload, this.getConfigWithAuthToken());
    } catch (error: any) {
      return (error as any).response;
    }
  }
  async insert(payload: object): Promise<AxiosResponse> {
    try {
      return await axios.post(`${this.baseUrl}/schedule/insert.php`, payload, this.getConfigWithAuthToken());
    } catch (error: any) {
      return (error as any).response;
    }
  }

}

export default ScheduleAPIClient;
