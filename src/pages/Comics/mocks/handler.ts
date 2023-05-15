import { rest } from 'msw';

const baseURL = 'https://gateway.marvel.com/v1/public/';

export const handlers = [
  rest.get(`${baseURL}comics`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          count: 1560,
          results: [
            {
              id: 82967,
              title: 'Marvel Previews (2017)',
              thumbnail: {
                path: 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available',
              },
            },
            {
              id: 376,
              title: 'Ant-Man (2003) #3',
              thumbnail: {
                path: 'http://i.annihil.us/u/prod/marvel/i/mg/d/70/4bc69c7e9b9d7',
              },
            },
          ],
        },
      })
    );
  }),
];
