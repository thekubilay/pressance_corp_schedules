import {Base} from "@/server/Base";
import axios, {AxiosResponse} from "axios";

class MemoAPIClient extends Base {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    super();
    this.baseUrl = baseUrl;
  }


  async search(date: string): Promise<AxiosResponse> {
    try {
      const payload = {
        "date": date,
        "table": "schedule_memo",
      }
      return await axios.post(`${this.baseUrl}/memo/read.php`, payload, this.getConfigWithAuthToken());
    } catch (error: any) {
      return (error as any).response;
    }
  }

  async insert(date: string, memo:string): Promise<AxiosResponse> {
    const payload = {
      "memo": memo,
      "created_at": date,
      "table": "schedule_memo"
    }

    try {
      return await axios.post(`${this.baseUrl}/memo/insert.php`, payload, this.getConfigWithAuthToken());
    } catch (error: any) {
      return (error as any).response;
    }
  }

}

export default MemoAPIClient;
