import IHttpPostClient from 'data/protocols/http/httpPostClient';
import { HttpRequest } from 'data/protocols/http/httpRequest';
import { HttpResponse } from 'data/protocols/http/httpResponse';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

class AxiosHttpPostClient implements IHttpPostClient {
  async request(data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    let axiosConfig: AxiosRequestConfig = {
      url: data.url,
      method: 'POST',
      data: data.body,
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        ...data.headers,
      },
    };

    try {
      axiosResponse = await axios.request(axiosConfig);
    } catch (error) {
      axiosResponse = error.response;
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }
}

export default AxiosHttpPostClient;
