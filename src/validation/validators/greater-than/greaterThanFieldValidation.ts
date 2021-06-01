import IFieldValidation from 'validation/protocols/fieldValidation';
import GreaterThanFieldError from 'validation/errors/greaterThanFieldError';

class GreaterThanFieldValidation implements IFieldValidation {
  readonly field: string;
  readonly limit: number;

  constructor(field: string, limit: number) {
    this.field = field;
    this.limit = limit;
  }

  validate(input: object): Error {
    return input[this.field] > this.limit
      ? null
      : new GreaterThanFieldError(this.limit);
  }
}

export default GreaterThanFieldValidation;
