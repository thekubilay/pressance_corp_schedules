import Cookies from "js-cookie";

export class Base {
  public getAuthToken(): string | undefined {
    return Cookies.get('auth_token');
  }

  public getConfigWithAuthToken(): Record<string, any> {
    const authToken = this.getAuthToken();
    return authToken ? {headers: {Authorization: `Token ${authToken}`}} : {};
  }
}