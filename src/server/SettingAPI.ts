import {Base} from "@/server/Base";
import axios, {AxiosResponse} from "axios";

class SettingAPIClient extends Base {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    super();
    this.baseUrl = baseUrl;
  }


  async search(): Promise<AxiosResponse> {
    try {
      const payload = {
        "table": "schedule_setting",
      }
      return await axios.post(`${this.baseUrl}/setting/read.php`, payload, this.getConfigWithAuthToken());
    } catch (error: any) {
      return (error as any).response;
    }
  }

  async insert(payload: object): Promise<AxiosResponse> {
    try {
      return await axios.post(`${this.baseUrl}/setting/insert.php`, payload, this.getConfigWithAuthToken());
    } catch (error: any) {
      return (error as any).response;
    }
  }

}

export default SettingAPIClient;
