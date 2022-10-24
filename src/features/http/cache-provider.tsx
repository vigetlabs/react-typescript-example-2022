import { cache } from './cache';
import { WithChildren } from 'helpers/types';
import { QueryClientProvider } from '@tanstack/react-query';

export function CacheProvider({ children }: WithChildren<unknown>) {
  return <QueryClientProvider client={cache}>{children}</QueryClientProvider>;
}
