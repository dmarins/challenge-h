import AxiosHttpPostClient from 'infrastructure/http/axiosHttpPostClient';
import { mockAxios, mockHttpResponse } from 'infrastructure/test/mockAxios';
import { mockHttpRequest } from 'data/test/mockHttp';
import axios from 'axios';

jest.mock('axios');

type SutTypes = {
  sut: AxiosHttpPostClient;
  mockedAxios: jest.Mocked<typeof axios>;
};

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpPostClient();
  const mockedAxios = mockAxios();
  return {
    sut,
    mockedAxios,
  };
};

describe('AxiosHttpPostClient', () => {
  test('Should call axios with correct values', async () => {
    const request = mockHttpRequest();
    const { sut, mockedAxios } = makeSut();

    await sut.request(request);

    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: request.url,
      method: 'POST',
      data: request.body,
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        ...request.headers,
      },
    });
  });

  test('Should return correct response', async () => {
    const { sut, mockedAxios } = makeSut();

    const httpResponse = await sut.request(mockHttpRequest());
    const axiosResponse = await mockedAxios.request.mock.results[0].value;

    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    });
  });

  test('Should return correct error', () => {
    const { sut, mockedAxios } = makeSut();
    mockedAxios.request.mockRejectedValueOnce({
      response: mockHttpResponse(),
    });

    const promise = sut.request(mockHttpRequest());

    expect(promise).toEqual(mockedAxios.request.mock.results[0].value);
  });
});
