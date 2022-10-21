import { handlers } from './api';
import { setupWorker } from 'msw';

export const worker = setupWorker(...handlers);
