import { SettlablePromise } from './cache';
import { createContext } from 'react';

type ResourceCache = {
  load: (key: string) => SettlablePromise<boolean>;
};

export const ResourceCacheCtx = createContext<ResourceCache | null>(null);
