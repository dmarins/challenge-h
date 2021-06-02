import IFieldValidation from 'validation/protocols/fieldValidation';
import NumberFieldError from 'validation/errors/numberFieldError';

class NumberFieldValidation implements IFieldValidation {
  readonly field: string;

  constructor(field: string) {
    this.field = field;
  }

  validate(input: object): Error {
    const result =
      /\D/.test(input[this.field]) === false ? null : new NumberFieldError();
    return result;
  }
}

export default NumberFieldValidation;
