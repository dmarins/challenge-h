import { HttpResponse } from 'data/protocols/http/httpResponse';

import { CommandResultDto } from './commandResultDto';

interface IResult<T = any> {
  return: (contract: HttpResponse<T>) => CommandResultDto;
}

export default IResult;
