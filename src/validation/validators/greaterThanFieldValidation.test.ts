import greaterThanFieldValidation from 'validation/validators/greaterThanFieldValidation';
import greaterThanFieldError from 'validation/errors/greaterThanFieldError';
import faker from 'faker';

const makeSut = (field: string): greaterThanFieldValidation =>
  new greaterThanFieldValidation(field, 10);

describe('greaterThanFieldValidation', () => {
  test('Should return error if field is less than the limit', () => {
    const field = faker.database.column();
    const sut = makeSut(field);

    const error = sut.validate({ [field]: 9 });

    expect(error).toEqual(new greaterThanFieldError(10));
  });

  test('Should return false if field is equal the limit', () => {
    const field = faker.database.column();
    const sut = makeSut(field);

    const error = sut.validate({ [field]: 10 });

    expect(error).toBeFalsy();
  });

  test('Should return false if field is not less than the limit', () => {
    const field = faker.database.column();
    const sut = makeSut(field);

    const error = sut.validate({ [field]: 11 });

    expect(error).toBeFalsy();
  });
});
