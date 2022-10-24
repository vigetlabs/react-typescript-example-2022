import '@testing-library/jest-dom/extend-expect';
import 'test/mocks/matchMedia';
import 'test/mocks/scrollTo';
import 'test/mocks/zustand';
import 'test/mocks/config';

import { server } from './mocks/server';

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(async () => {
  server.close();
});
