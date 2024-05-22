import {Base} from "@/server/Base";
import axios, {AxiosResponse} from "axios";

class MemberAPIClient extends Base {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    super();
    this.baseUrl = baseUrl;
  }


  async search(): Promise<AxiosResponse> {
    try {
      return await axios.post(`${this.baseUrl}/member/read.php`, this.getConfigWithAuthToken());
    } catch (error: any) {
      return (error as any).response;
    }
  }

  async insert(payload: object): Promise<AxiosResponse> {
    try {
      return await axios.post(`${this.baseUrl}/member/insert.php`, payload, this.getConfigWithAuthToken());
    } catch (error: any) {
      return (error as any).response;
    }
  }

  async update(payload: object): Promise<AxiosResponse> {
    try {
      return await axios.post(`${this.baseUrl}/member/update-name.php`, payload, this.getConfigWithAuthToken());
    } catch (error: any) {
      return (error as any).response;
    }
  }

  async order(payload: object): Promise<AxiosResponse> {
    try {
      return await axios.post(`${this.baseUrl}/member/update-order.php`, payload, this.getConfigWithAuthToken());
    } catch (error: any) {
      return (error as any).response;
    }
  }

  async delete(payload: object): Promise<AxiosResponse> {
    try {
      return await axios.post(`${this.baseUrl}/member/delete.php`, payload, this.getConfigWithAuthToken());
    } catch (error: any) {
      return (error as any).response;
    }
  }

}

export default MemberAPIClient;
