import { setupServer } from 'msw/node';
import { handlers } from './handler';


const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
export default server;
