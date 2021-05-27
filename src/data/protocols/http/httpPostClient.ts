import { HttpResponse } from './httpResponse';
import { HttpRequest } from './httpRequest';

interface IHttpPostClient<T = any> {
  request: (data: HttpRequest) => Promise<HttpResponse<T>>;
}

export default IHttpPostClient;
