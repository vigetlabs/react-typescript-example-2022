import { ResourceCacheCtx } from './context';
import { useContext } from 'react';

export function useResourceCache() {
  const resourceCache = useContext(ResourceCacheCtx);

  if (!resourceCache) {
    throw new Error('useResourceCache must be used within a ResourceCacheCtx');
  }

  return resourceCache;
}
