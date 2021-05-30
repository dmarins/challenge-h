import IDefaultAntecipation from 'domain/usecases/default-antecipation/defaultAntecipation';
import { DefaultRangeModel } from 'domain/models/default-antecipation/defaultRangeModel';

import IHttpPostClient from 'data/protocols/http/httpPostClient';
import { HttpRequest } from 'data/protocols/http/httpRequest';
import { HttpStatusCode } from 'data/protocols/http/httpStatusCode';

class RemoteDefaultAntecipation implements IDefaultAntecipation {
  readonly url: string;
  readonly httpClient: IHttpPostClient<DefaultRangeModel>;

  constructor(url: string, httpClient: IHttpPostClient<DefaultRangeModel>) {
    this.url = url;
    this.httpClient = httpClient;
  }

  async post(
    amount: number,
    installments: number,
    mdr: number,
  ): Promise<DefaultRangeModel> {
    const contract: HttpRequest = {
      url: this.url,
      body: {
        amount,
        installments,
        mdr,
      },
    };

    const response = await this.httpClient.request(contract);

    switch (response.statusCode) {
      case HttpStatusCode.forbidden:
        throw new Error('forbidden');
      case HttpStatusCode.ok:
        return response.body;
      case HttpStatusCode.serverError:
        throw new Error('serverError');
      case HttpStatusCode.unauthorized:
        throw new Error('unauthorized');
      default:
        return null;
    }
  }
}

export default RemoteDefaultAntecipation;
