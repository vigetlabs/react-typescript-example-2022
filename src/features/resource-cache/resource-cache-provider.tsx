import { loadResource } from './cache';
import { ResourceCacheCtx } from './context';
import { WithChildren } from 'helpers/types';

export function ResourceCacheProvider({ children }: WithChildren<unknown>) {
  return (
    <ResourceCacheCtx.Provider value={{ load: loadResource }}>
      {children}
    </ResourceCacheCtx.Provider>
  );
}
