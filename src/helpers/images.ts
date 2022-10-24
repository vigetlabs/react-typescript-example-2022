import { loadResource } from 'features/resource-cache';

export async function preloadImages(urls: string[]) {
  return Promise.all(urls.map(loadResource));
}
