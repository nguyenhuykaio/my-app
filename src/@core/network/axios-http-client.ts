/* eslint-disable @typescript-eslint/no-unused-vars */
// import React from "react";
import Axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
import { ApiException, IObject, IObjectPromise } from '../dto';
import { EHttpHeaders, EHttpStatus, EMediaType } from '../constants';
import * as qs from "qs";

interface IHeader extends IObject {
  [EHttpHeaders.CONTENT_TYPE]?: EMediaType
}

export interface IAxiosRequestOptions extends AxiosRequestConfig {
}
export class AxiosHttpClient {
  private baseUrl: string
  private options: IAxiosRequestOptions
  private interceptors: IObjectPromise
  private instance: AxiosInstance
  constructor(config: { baseurl: string, options: IAxiosRequestOptions, interceptors?: IObjectPromise }) {
    const { baseurl = '', options = {}, interceptors = {} } = config;
    this.baseUrl = baseurl;
    this.options = options;
    if (interceptors) {
      this.interceptors = interceptors
    } else {
      this.interceptors = {};
    }
    this.instance = Axios.create({
      baseURL: baseurl,
      ...options
    })
  }
  private fixUrlPathName(pathName: string): string {
    const output = pathName.replace("//", "/");
    if (!pathName.includes("//")) {
      return output;
    } else {
      return this.fixUrlPathName(output)
    }
  }

  private qsMediaTypes = [EMediaType.APPLICATION_FORM_URLENCODED]

  private fixUrl(url: string) {
    const fixUrl = new URL(url);
    const { origin, pathname } = fixUrl
    const newUrl = origin + this.fixUrlPathName(pathname);
    return newUrl;
  }
  private handerError(error?: any): ApiException {
    if (!error) {
      return new ApiException("Unknown", EHttpStatus.INTERNAL_SERVER_ERROR);
    }
    if (!error.isAxiosError) {
      if (error instanceof ApiException) {
        return error;
      }
      if (error.message) {
        return new ApiException(error.message, EHttpStatus.INTERNAL_SERVER_ERROR);
      }
      return new ApiException("Unknown", EHttpStatus.INTERNAL_SERVER_ERROR);
    }
    let { response, message = "Unknown" } = error as AxiosError<any, any>
    let type = "DEFAULT";
    let businessCode = -1;
    if (response) {
      const { data = {}, status = EHttpStatus.INTERNAL_SERVER_ERROR } = response
      if (data.message) {
        message = data.message
      }
      if (data.type) {
        type = data.type;
      }
      if (data.businessCode) {
        businessCode = data.businessCode;
      }
      return new ApiException(message, status, data, type, businessCode)
    }
    return new ApiException(message, EHttpStatus.INTERNAL_SERVER_ERROR,)
  }

  private async intercept() {
    const headerAppend = await Promise.allObject(this.interceptors);
    const { headers = {} } = this.options;
    return {
      ...headers,
      ...headerAppend
    };
  }

  async get<T>(endpoint: string, params: any = {}, headerEnpoint = {}): Promise<AxiosResponse<T>> {
    try {
      const staticHeaders = await this.intercept();
      const headers = Object.assign({}, staticHeaders, headerEnpoint)
      const paramUrls = new URLSearchParams(params).toString();
      const url = (endpoint + "?" + paramUrls).trim();
      return await this.instance.get(url, { headers })
    } catch (error) {
      throw this.handerError(error)
    }

  }

  async getByBody<T>(endpoint: string, body: any = {}): Promise<AxiosResponse<T>> {
    try {
      const headers = await this.intercept();

      const contentType = headers[EHttpHeaders.CONTENT_TYPE]
      if (!contentType) {
        throw new ApiException("Empty media type", EHttpStatus.UNSUPPORTED_MEDIA_TYPE);
      }
      if (this.qsMediaTypes.includes(contentType)) {
        const url = (endpoint).trim();
        return await this.instance.get(url, {
          headers,
          data: qs.stringify(body)
        })
      }

      return await this.instance.get(endpoint, { headers, data: body })
    } catch (error) {
      throw this.handerError(error)
    }

  }
  async post<T>(endpoint: string, body: any = {}, headerEnpoint = {}): Promise<AxiosResponse<T>> {
    try {
      const staticHeaders = await this.intercept();
      const headers = Object.assign({}, staticHeaders, headerEnpoint);
      const contentType = headers[EHttpHeaders.CONTENT_TYPE]
      if (!contentType) {
        throw new ApiException("Empty media type", EHttpStatus.UNSUPPORTED_MEDIA_TYPE);
      }
      if (this.qsMediaTypes.includes(contentType)) {
        const url = (endpoint).trim();
        return await this.instance.post(url, qs.stringify(body), {
          headers
        })
      }
      const url = (endpoint).trim();
      return await this.instance.post(url, body, {
        headers
      })
    } catch (error) {
      throw this.handerError(error)
    }
  }

  async postParams<T>(endpoint: string, params: any = {}, headerEnpoint = {}): Promise<AxiosResponse<T>> {
    try {
      const staticHeaders = await this.intercept();
      const headers = Object.assign({}, staticHeaders, headerEnpoint)
      const paramUrls = new URLSearchParams(params).toString();
      const url = (endpoint + "?" + paramUrls).trim();
      return await this.instance.post(url, { headers })
    } catch (error) {
      throw this.handerError(error)
    }

  }

  async put<T>(endpoint: string, body: any = {}): Promise<AxiosResponse<T>> {
    try {
      const headers = await this.intercept();
      const contentType = headers[EHttpHeaders.CONTENT_TYPE]
      if (!contentType) {
        throw new ApiException("Empty media type", EHttpStatus.UNSUPPORTED_MEDIA_TYPE);
      }
      if (this.qsMediaTypes.includes(contentType)) {
        const url = (endpoint).trim();
        return await this.instance.put(url, qs.stringify(body), {
          headers
        })
      }
      const url = (endpoint).trim();
      return await this.instance.put(url, body, {
        headers
      })
    } catch (error) {
      throw this.handerError(error)
    }
  }

  async patch<T>(endpoint: string, body: any = {}): Promise<AxiosResponse<T>> {
    try {
      const headers = await this.intercept();

      const contentType = headers[EHttpHeaders.CONTENT_TYPE]
      if (!contentType) {
        throw new ApiException("Empty media type", EHttpStatus.UNSUPPORTED_MEDIA_TYPE);
      }
      if (this.qsMediaTypes.includes(contentType)) {
        const url = (endpoint).trim();
        return await this.instance.patch(url, qs.stringify(body), {
          headers
        })
      }

      const url = (endpoint).trim();
      return await this.instance.patch(url, body, {
        headers
      })
    } catch (error) {
      throw this.handerError(error)
    }
  }
  async delete<T>(endpoint: string, body: any = {}): Promise<AxiosResponse<T>> {
    try {
      const headers = await this.intercept();
      const url = (endpoint).trim();
      const contentType = headers[EHttpHeaders.CONTENT_TYPE]
      if (!contentType) {
        throw new ApiException("Empty media type", EHttpStatus.UNSUPPORTED_MEDIA_TYPE);
      }
      if (this.qsMediaTypes.includes(contentType)) {
        const url = (endpoint).trim();
        return await this.instance.delete(url, {
          headers,
          data: qs.stringify(body)
        })
      }

      return await this.instance.delete(url, {
        headers,
        data: body
      })
    } catch (error) {
      throw this.handerError(error)
    }
  }

  async uploadFile<T = any>(endpoint: string, formData: FormData, onUploadProgress?: (event: any) => void): Promise<AxiosResponse<T>> {
    try {
      const headers = await this.intercept();
      Object.assign(headers, {
        [EHttpHeaders.CONTENT_TYPE]: EMediaType.MULTIPART_FORM_DATA
      })
      const url = (endpoint).trim();
      return await this.instance.post(url, formData, {
        headers,
        onUploadProgress
      })
    } catch (error) {
      throw this.handerError(error)
    }
  }
}

