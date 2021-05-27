import AxiosHttpPostClient from 'infrastructure/http/axiosHttpPostClient';

const makeAxiosHttpPostClient = (): AxiosHttpPostClient =>
  new AxiosHttpPostClient();

export default makeAxiosHttpPostClient;
