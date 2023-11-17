import { configEnv } from "~/@config";
import { EMediaType } from "~/@core/constants";
import { IObjectPromise } from "~/@core/dto";
import { AxiosHttpClient, IAxiosRequestOptions } from "~/@core/network";


class ApiService {
  private httpClient: AxiosHttpClient;
  constructor(config: {
    baseurl: string;
    options: IAxiosRequestOptions;
    interceptors?: IObjectPromise;
  }) {
    this.httpClient = new AxiosHttpClient(config);
  }
  async get<T = any>(endpoint: string, params: any = {}): Promise<T> {
    try {
      const res = await this.httpClient.get<T>(endpoint, params);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
  async delete<T = any>(endpoint: string, params: any = {}): Promise<T> {
    try {
      const res = await this.httpClient.delete<T>(endpoint, params);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
  async getByBody<T = any>(endpoint: string, body: any = {}): Promise<T> {
    try {
      const res = await this.httpClient.getByBody<T>(endpoint, body);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
  async post<T = any>(endpoint: string, body: any = {}): Promise<T> {
    try {
      const res = await this.httpClient.post<T>(endpoint, body);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async put<T = any>(endpoint: string, body: any = {}): Promise<T> {
    try {
      const res = await this.httpClient.put<T>(endpoint, body);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async uploadFile<T = any>(
    endpoint: string,
    formData: FormData,
    onUploadProgress?: (event: any) => void
  ): Promise<T> {
    try {
      const res = await this.httpClient.uploadFile<T>(
        endpoint,
        formData,
        onUploadProgress
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}
const { ROOT } = configEnv().CONNECTORS;

export const rootApiService = new ApiService({
  baseurl: ROOT.baseUrl,
  options: {
    timeout: 2 * 60 * 1000,
    headers: {
      "Content-Type": EMediaType.APPLICATION_JSON,
    },
  },
  interceptors: {

  },
});
