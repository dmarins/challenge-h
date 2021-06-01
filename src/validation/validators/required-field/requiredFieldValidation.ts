import IFieldValidation from 'validation/protocols/field-validation';
import RequiredFieldError from 'validation/errors/required-field-error';

class RequiredFieldValidation implements IFieldValidation {
  readonly field: string;

  constructor(field: string) {
    this.field = field;
  }

  validate(input: object): Error {
    return input[this.field] ? null : new RequiredFieldError();
  }
}

export default RequiredFieldValidation;
