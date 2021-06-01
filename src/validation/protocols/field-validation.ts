interface IFieldValidation {
  field: string;
  validate: (input: object) => Error;
}

export default IFieldValidation;
