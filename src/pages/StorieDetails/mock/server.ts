import { setupServer } from 'msw/node';
import { handlers } from './handler';
import { handlers as storiesHandler } from '../../Stories/mocks/handler';

const server = setupServer(...handlers, ...storiesHandler);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
export default server;
