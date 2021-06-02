class GreaterThanFieldError extends Error {
  constructor(limit: number) {
    super(`O valor mínimo é ${limit}`);
    this.name = 'GreaterThanFieldError';
  }
}

export default GreaterThanFieldError;
