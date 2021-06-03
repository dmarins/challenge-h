import { DefaultRangeModel } from 'domain/models/default-antecipation/defaultRangeModel';

import faker from 'faker';

export const mockDefaultRangeModel = (): DefaultRangeModel => ({
  1: faker.random.number,
  15: faker.random.number,
  30: faker.random.number,
  90: faker.random.number,
});

export const mockRemoteDefaultAntecipationParams = (): any => ({
  amount: faker.random.number,
  installments: faker.random.number,
  mdr: faker.random.number,
});
