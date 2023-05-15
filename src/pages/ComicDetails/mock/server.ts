import { setupServer } from 'msw/node';
import { handlers } from './handler';
import { handlers as comicsHandler } from '../../Comics/mocks/handler';

const server = setupServer(...handlers, ...comicsHandler);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
export default server;
