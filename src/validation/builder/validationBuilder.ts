import IFieldValidation from 'validation/protocols/fieldValidation';
import GreaterThanFieldValidation from 'validation/validators/greater-than/greaterThanFieldValidation';
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

  greaterThan(limit: number): ValidationBuilder {
    this.validations.push(
      new GreaterThanFieldValidation(this.fieldName, limit),
    );
    return this;
  }

  required(): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName));
    return this;
  }

  build(): IFieldValidation[] {
    return this.validations;
  }
}
