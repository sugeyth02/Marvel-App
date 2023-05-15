import { rest } from 'msw';

const baseURL = 'https://gateway.marvel.com/v1/public/';

export const handlers = [
  rest.get(`${baseURL}characters`, (req, res, ctx) => {
    const name = req.url.searchParams.get('nameStartsWith');
    if (name === 'MARVEL') {
      return res(
        ctx.status(200),
        ctx.json({
          data: {
            count: 1560,
            results: [
              {
                id: 1011350,
                name: 'Marvel Apes',
                thumbnail: {
                  path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784',
                },
              },
              {
                id: 1009427,
                name: 'Marvel Boy',
                thumbnail: {
                  path: 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available',
                },
              },
              {
                id: 1011002,
                name: 'Marvel Zombies',
                thumbnail: {
                  path: 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available',
                },
              },
            ],
          },
        })
      );
    }
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          count: 1560,
          results: [
            {
              id: 1011334,
              name: '3-D Man',
              thumbnail: {
                path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784',
              },
            },
            {
              id: 1011170,
              name: 'Alain',
              thumbnail: {
                path: 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available',
              },
            },
          ],
        },
      })
    );
  }),

  rest.get(`${baseURL}stories`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          results: [
            {
              id: 602,
              title: 'Cover #602',
            },
            {
              id: 631,
              title: '1 of 5 - Golgotha',
            },
          ],
        },
      })
    );
  }),

  rest.get(`${baseURL}comics`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          results: [
            {
              id: 36594,
              title:
                'DEADPOOL VOL. 7: SPACE ODDITY PREMIERE HC (Trade Paperback)',
            },
            {
              id: 41161,
              title: 'Shame Itself (2011) #1',
            },
          ],
        },
      })
    );
  }),
];
