import IFieldValidation from 'validation/protocols/field-validation';
import RequiredFieldValidation from 'validation/validators/required-field/requiredFieldValidation';

export class ValidationBuilder {
  private readonly fieldName: string;
  private readonly validations: IFieldValidation[];

  constructor(fieldName: string, validations: IFieldValidation[]) {
    this.fieldName = fieldName;
    this.validations = validations;
  }

  static field(fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, []);
  }

  required(): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName));
    return this;
  }

  build(): IFieldValidation[] {
    return this.validations;
  }
}