import IFieldValidation from 'validation/protocols/fieldValidation';
import GreaterThanFieldValidation from 'validation/validators/greaterThanFieldValidation';
import NumberFieldValidation from 'validation/validators/numberFieldValidation';
import RangeFieldValidation from 'validation/validators/rangeFieldValidation';
import RequiredFieldValidation from 'validation/validators/requiredFieldValidation';

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

  greaterThan(limit: number): ValidationBuilder {
    this.validations.push(
      new GreaterThanFieldValidation(this.fieldName, limit),
    );
    return this;
  }

  number(): ValidationBuilder {
    this.validations.push(new NumberFieldValidation(this.fieldName));
    return this;
  }

  range(start: number, end: number): ValidationBuilder {
    this.validations.push(new RangeFieldValidation(this.fieldName, start, end));
    return this;
  }

  build(): IFieldValidation[] {
    return this.validations;
  }
}
