import { rest } from 'msw';

const baseURL = 'https://gateway.marvel.com/v1/public/';

export const handlers = [
  rest.get(`${baseURL}comics/1886`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          results: [
            {
              id: 1886,
              title:
                'Official Handbook of the Marvel Universe (2004) #12 (SPIDER-MAN)',
              variantDescription: 'SPIDER-MAN',
              modified: '-0001-11-30T00:00:00-0500',
              thumbnail: {
                path: 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/4bc64020a4ccc',
              },
              characters: { items: [{ name: 'Apocalypse' }] },
              stories: { items: [{ name: 'Cover #4430' }] },
            },
          ],
        },
      })
    );
  }),
];
