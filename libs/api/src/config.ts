import { apiFetcher } from './fetcher';

export const initConfig = apiFetcher
  .path('/api/config/init')
  .method('post')
  .create();

export const getConfig = apiFetcher.path('/api/config').method('get').create();

export const updateBot = apiFetcher
  .path('/api/config/update-bot')
  .method('post')
  .create();

export const addBot = apiFetcher
  .path('/api/config/add-bot')
  .method('post')
  .create();
