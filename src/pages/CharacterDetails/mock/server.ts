import { setupServer } from 'msw/node';
import { handlers } from './handler';
import { handlers as characterHandler } from '../../Characters/mock/handler';

const server = setupServer(...handlers,...characterHandler);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
export default server;
