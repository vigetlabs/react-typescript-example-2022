export const resourceCache = new Map();

export type SettlablePromise<T> = Promise<T> & { settled?: boolean };

export function loadResource(url: string): SettlablePromise<boolean> {
  if (resourceCache.has(url)) {
    return resourceCache.get(url);
  }

  const promise: SettlablePromise<boolean> = new Promise((resolve) => {
    const image = new Image();

    image.onerror = () => resolve(false);
    image.onload = () => {
      promise.settled = true;
      resolve(true);
    };

    image.src = url;
  });

  resourceCache.set(url, promise);

  return promise;
}
