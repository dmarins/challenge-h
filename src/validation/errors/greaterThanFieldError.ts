class GreaterThanFieldError extends Error {
  constructor(limit: number) {
    super(`Informe um valor maior que ${limit}`);
    this.name = 'GreaterThanFieldError';
  }
}

export default GreaterThanFieldError;
