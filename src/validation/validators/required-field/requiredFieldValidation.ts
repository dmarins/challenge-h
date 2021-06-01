import IFieldValidation from 'validation/protocols/fieldValidation';
import RequiredFieldError from 'validation/errors/requiredFieldError';

class RequiredFieldValidation implements IFieldValidation {
  readonly field: string;

  constructor(field: string) {
    this.field = field;
  }

  validate(input: object): Error {
    return input[this.field]?.length > 0 ? null : new RequiredFieldError();
  }
}

export default RequiredFieldValidation;
