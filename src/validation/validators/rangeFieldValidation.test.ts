import rangeFieldValidation from 'validation/validators/rangeFieldValidation';
import rangeFieldError from 'validation/errors/rangeFieldError';
import faker from 'faker';

const makeSut = (field: string): rangeFieldValidation =>
  new rangeFieldValidation(field, 1, 10);

describe('rangeFieldValidation', () => {
  test('Should return error if field is out of range', () => {
    const field = faker.database.column();
    const sut = makeSut(field);

    const error = sut.validate({ [field]: 0 });

    expect(error).toEqual(new rangeFieldError(1, 10));
  });

  test('Should return false if field is within the defined range', () => {
    const field = faker.database.column();
    const sut = makeSut(field);

    const error = sut.validate({ [field]: 10 });

    expect(error).toBeFalsy();
  });

  test('Should return false if field is equal to the initial limit', () => {
    const field = faker.database.column();
    const sut = makeSut(field);

    const error = sut.validate({ [field]: 1 });

    expect(error).toBeFalsy();
  });

  test('Should return false if field is equal to the final limit', () => {
    const field = faker.database.column();
    const sut = makeSut(field);

    const error = sut.validate({ [field]: 10 });

    expect(error).toBeFalsy();
  });
});
