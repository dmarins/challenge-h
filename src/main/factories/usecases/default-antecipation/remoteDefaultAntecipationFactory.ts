import IDefaultAntecipation from 'domain/usecases/default-antecipation/defaultAntecipation';

import makeAxiosHttpPostClient from 'main/factories/http/httpPostClientFactory';
import { makeBaseUrl } from 'main/factories/http/httpBaseUrlFactory';
import makeCommandResult from 'main/factories/dto/commandResultFactory';
import RemoteDefaultAntecipation from 'data/usecases/default-antecipation/remoteDefaultAntecipation';

const makeRemoteDefaultAntecipation = (): IDefaultAntecipation =>
  new RemoteDefaultAntecipation(
    makeBaseUrl(),
    makeAxiosHttpPostClient(),
    makeCommandResult(),
  );

export default makeRemoteDefaultAntecipation;
