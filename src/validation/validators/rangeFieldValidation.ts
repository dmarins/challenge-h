import IFieldValidation from 'validation/protocols/fieldValidation';
import RangeFieldError from 'validation/errors/rangeFieldError';

class RangeFieldValidation implements IFieldValidation {
  readonly field: string;
  readonly start: number;
  readonly end: number;

  constructor(field: string, start: number, end: number) {
    this.field = field;
    this.start = start;
    this.end = end;
  }

  validate(input: object): Error {
    return input[this.field] >= this.start && input[this.field] <= this.end
      ? null
      : new RangeFieldError(this.start, this.end);
  }
}

export default RangeFieldValidation;
