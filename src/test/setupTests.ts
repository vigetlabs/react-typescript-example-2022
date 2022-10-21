import '@testing-library/jest-dom/extend-expect';
import 'test/mocks/matchMedia';
import 'test/mocks/zustand';
import 'test/mocks/client';

import { server } from './mocks/server';

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
