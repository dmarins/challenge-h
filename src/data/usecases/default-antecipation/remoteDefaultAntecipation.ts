import IDefaultAntecipation from 'domain/usecases/default-antecipation/defaultAntecipation';
import { DefaultRangeModel } from 'domain/models/default-antecipation/defaultRangeModel';
import { CommandResultDto } from 'domain/models/commons/commandResultDto';
import IResult from 'domain/models/commons/result';

import IHttpPostClient from 'data/protocols/http/httpPostClient';
import { HttpRequest } from 'data/protocols/http/httpRequest';
import { HttpStatusCode } from 'data/protocols/http/httpStatusCode';

class RemoteDefaultAntecipation implements IDefaultAntecipation {
  readonly url: string;
  readonly httpClient: IHttpPostClient<DefaultRangeModel>;
  readonly commandResult: IResult<DefaultRangeModel>;

  constructor(
    url: string,
    httpClient: IHttpPostClient<DefaultRangeModel>,
    commandResult: IResult<DefaultRangeModel>,
  ) {
    this.url = url;
    this.httpClient = httpClient;
    this.commandResult = commandResult;
  }

  async post(
    amount: number,
    installments: number,
    mdr: number,
  ): Promise<CommandResultDto> {
    const contract: HttpRequest = {
      url: this.url,
      body: {
        amount,
        installments,
        mdr,
      },
    };

    const response = await this.httpClient.request(contract);
    return this.commandResult.return(response);
  }
}

export default RemoteDefaultAntecipation;
