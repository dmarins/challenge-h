export const makeBaseUrl = (type: string): string => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  switch (type) {
    case 'delay':
      return baseUrl + '?delay=5000';
    case 'timeout':
      return baseUrl + '?timeout';
    case 'error':
      return baseUrl + '?internalError';
    default:
      return baseUrl;
  }
};
