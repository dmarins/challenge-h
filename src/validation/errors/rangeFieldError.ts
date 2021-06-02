class RangeFieldError extends Error {
  constructor(start: number, end: number) {
    super(`O valor deve estar entre ${start} e ${end}`);
    this.name = 'RangeFieldError';
  }
}

export default RangeFieldError;
