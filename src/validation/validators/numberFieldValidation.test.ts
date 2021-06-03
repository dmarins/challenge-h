import NumberFieldValidation from 'validation/validators/numberFieldValidation';
import NumberFieldError from 'validation/errors/numberFieldError';
import faker from 'faker';

const makeSut = (field: string): NumberFieldValidation =>
  new NumberFieldValidation(field);

describe('NumberFieldValidation', () => {
  test('Should return error if field is text', () => {
    const field = faker.database.column();
    const sut = makeSut(field);

    const error = sut.validate({ [field]: faker.random.word() });

    expect(error).toEqual(new NumberFieldError());
  });

  test('Should return false if field is not text', () => {
    const field = faker.database.column();
    const sut = makeSut(field);

    const error = sut.validate({ [field]: faker.datatype.number() });

    expect(error).toBeFalsy();
  });
});
