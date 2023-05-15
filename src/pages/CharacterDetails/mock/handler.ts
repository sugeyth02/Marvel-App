import { rest } from 'msw';

const baseURL = 'https://gateway.marvel.com/v1/public/';

export const handlers = [
  rest.get(`${baseURL}characters/1009149`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          results: [
            {
              id: 1009149,
              name: 'Abyss',
              modified: '2014-04-29T14:10:43-0400',
              thumbnail: {
                path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784',
              },
              comics: { items: [{ name: 'Uncanny X-Men (1963) #402' }] },
              stories: { items: [{ name: 'A Beginning' }] },
            },
          ],
        },
      })
    );
  }),
];