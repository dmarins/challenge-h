class GreaterThanFieldError extends Error {
  constructor(limit: number) {
    super(`O valor não pode ser menor que ${limit}`);
    this.name = 'GreaterThanFieldError';
  }
}

export default GreaterThanFieldError;
