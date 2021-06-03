import { HttpRequest } from 'data/protocols/http/httpRequest';
import { HttpResponse } from 'data/protocols/http/httpResponse';
import { HttpStatusCode } from 'data/protocols/http/httpStatusCode';
import IHttpPostClient from 'data/protocols/http/httpPostClient';
import faker from 'faker';

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
  headers: {
    authorization: 'Bearer ' + faker.random.objectElement(),
  },
});

export class HttpPostClientSpy<R = any> implements IHttpPostClient<R> {
  url?: string;
  body?: any;
  headers?: any;

  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
  };

  async request(data: HttpRequest): Promise<HttpResponse<R>> {
    this.url = data.url;
    this.body = data.body;
    this.headers = {
      'content-type': 'application/json',
      accept: 'application/json',
      ...data.headers,
    };

    return this.response;
  }
}
