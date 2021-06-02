class NumberFieldError extends Error {
  constructor() {
    super('Apenas números são aceitos');
    this.name = 'NumberFieldError';
  }
}

export default NumberFieldError;
