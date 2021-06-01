import IDefaultAntecipation from 'domain/usecases/default-antecipation/defaultAntecipation';
import { DefaultRangeModel } from 'domain/models/default-antecipation/defaultRangeModel';
import { CommandResultDto } from 'domain/dto/commandResultDto';
import IResult from 'domain/dto/result';

import IHttpPostClient from 'data/protocols/http/httpPostClient';
import { HttpRequest } from 'data/protocols/http/httpRequest';

class RemoteDefaultAntecipation implements IDefaultAntecipation {
  readonly url: string;
  readonly httpClient: IHttpPostClient<DefaultRangeModel>;
  readonly commandResult: IResult;

  constructor(
    url: string,
    httpClient: IHttpPostClient<DefaultRangeModel>,
    commandResult: IResult,
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
