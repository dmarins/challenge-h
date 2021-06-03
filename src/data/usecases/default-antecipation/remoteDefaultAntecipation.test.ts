import {
  mockDefaultRangeModel,
  mockRemoteDefaultAntecipationParams,
} from 'domain/test/mockDefaultAntecipation';
import { DefaultRangeModel } from 'domain/models/default-antecipation/defaultRangeModel';
import CommandResult from 'domain/dto/commandResult';
import IResult from 'domain/dto/result';
import { CommandResultDto } from 'domain/dto/commandResultDto';

import RemoteDefaultAntecipation from 'data/usecases/default-antecipation/remoteDefaultAntecipation';
import { HttpPostClientSpy } from 'data/test/mockHttp';
import { HttpStatusCode } from 'data/protocols/http/httpStatusCode';
import faker from 'faker';

type SutTypes = {
  sut: RemoteDefaultAntecipation;
  httpClient: HttpPostClientSpy<DefaultRangeModel>;
  // commandResult: IResult;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClient = new HttpPostClientSpy<DefaultRangeModel>();
  // const commandResult = new CommandResult();
  // const sut = new RemoteDefaultAntecipation(url, httpClient, commandResult);
  const sut = new RemoteDefaultAntecipation(
    url,
    httpClient,
    new CommandResult(),
  );

  return {
    sut,
    httpClient,
  };

  // return {
  //   sut,
  //   httpClient,
  //   commandResult,
  // };
};

describe('RemoteDefaultAntecipation', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url();
    const { sut, httpClient } = makeSut(url);
    const params = mockRemoteDefaultAntecipationParams();

    await sut.post(params.amount, params.installments, params.mdr);

    expect(httpClient.url).toBe(url);
    expect(httpClient.body).toEqual(params);
  });

  test('Should return a dto with the data model if HttpClient returns 200', async () => {
    const { sut, httpClient } = makeSut();
    const httpResult = mockDefaultRangeModel();
    const dto = new CommandResultDto().ok(httpResult);
    const params = mockRemoteDefaultAntecipationParams();

    httpClient.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };

    const resultDto = await sut.post(
      params.amount,
      params.installments,
      params.mdr,
    );

    expect(dto).toEqual(resultDto);
  });

  test('Should return a dto if HttpClient returns 400', async () => {
    const { sut, httpClient } = makeSut();
    const dto = new CommandResultDto().badRequest();
    const params = mockRemoteDefaultAntecipationParams();

    httpClient.response = {
      statusCode: HttpStatusCode.badRequest,
    };

    const resultDto = await sut.post(
      params.amount,
      params.installments,
      params.mdr,
    );

    expect(dto).toEqual(resultDto);
  });

  test('Should return a dto if HttpClient returns 408', async () => {
    const { sut, httpClient } = makeSut();
    const dto = new CommandResultDto().timeOut();
    const params = mockRemoteDefaultAntecipationParams();

    httpClient.response = {
      statusCode: HttpStatusCode.timeOut,
    };

    const resultDto = await sut.post(
      params.amount,
      params.installments,
      params.mdr,
    );

    expect(dto).toEqual(resultDto);
  });

  test('Should return a dto if HttpClient returns 500', async () => {
    const { sut, httpClient } = makeSut();
    const dto = new CommandResultDto().internalServerError();
    const params = mockRemoteDefaultAntecipationParams();

    httpClient.response = {
      statusCode: HttpStatusCode.internalServerError,
    };

    const resultDto = await sut.post(
      params.amount,
      params.installments,
      params.mdr,
    );

    expect(dto).toEqual(resultDto);
  });
});
