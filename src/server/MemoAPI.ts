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
        "table_schedule": "schedule_schedule",
        "table_member": "schedule_member"
      }
      return await axios.post(`${this.baseUrl}/memo/read.php`, payload, this.getConfigWithAuthToken());
    } catch (error: any) {
      return (error as any).response;
    }
  }

  async retrieve(organizationId: number, eventId: number): Promise<AxiosResponse> {
    try {
      return await axios.get(`${this.baseUrl}/organizations/${organizationId}/events/${eventId}/`, this.getConfigWithAuthToken());

    } catch (error: any) {
      return (error as any).response;
    }
  }

  async create(organizationId: number, payload: FormData): Promise<AxiosResponse> {
    try {
      return await axios.post(`${this.baseUrl}/organizations/${organizationId}/events/`, payload, this.getConfigWithAuthToken());

    } catch (error: any) {
      return (error as any).response;
    }
  }


  async update(organizationId: number, eventId: number, payload: FormData): Promise<AxiosResponse> {
    try {
      return await axios.patch(`${this.baseUrl}/organizations/${organizationId}/events/${eventId}/`, payload, this.getConfigWithAuthToken());


    } catch (error: any) {
      return (error as any).response;
    }
  }


  async delete(organizationId: number, eventId: number): Promise<AxiosResponse> {
    try {
      return await axios.delete(`${this.baseUrl}/organizations/${organizationId}/events/${eventId}/`, this.getConfigWithAuthToken());

    } catch (error: any) {
      return (error as any).response;
    }
  }

}

export default MemoAPIClient;
