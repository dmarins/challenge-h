import { HttpResponse } from 'data/protocols/http/httpResponse';

import { CommandResultDto } from './commandResultDto';

interface IResult {
  return: (contract: HttpResponse) => CommandResultDto;
}

export default IResult;
