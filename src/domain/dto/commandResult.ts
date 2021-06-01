import { HttpResponse } from 'data/protocols/http/httpResponse';
import { HttpStatusCode } from 'data/protocols/http/httpStatusCode';

import { CommandResultDto } from './commandResultDto';
import IResult from './result';

class CommandResult implements IResult {
  return(contract: HttpResponse): CommandResultDto {
    switch (contract.statusCode) {
      case HttpStatusCode.ok:
        return new CommandResultDto().ok(contract.body);
      case HttpStatusCode.badRequest:
        return new CommandResultDto().badRequest();
      case HttpStatusCode.serverError:
        return new CommandResultDto().serverError();
      case HttpStatusCode.timeOut:
        return new CommandResultDto().timeOut();
    }
  }
}

export default CommandResult;
