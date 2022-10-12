import apiFetcher from '@akrbot/swaggen';

apiFetcher.configure({
  baseUrl: 'http://localhost:3334',
});

export { apiFetcher };
