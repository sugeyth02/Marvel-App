import { rest } from 'msw';

const baseURL = 'https://gateway.marvel.com/v1/public/';

export const handlers = [
  rest.get(`${baseURL}stories`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          count: 1560,
          results: [
            {
              id: 7,
              title: 'Investigating the murder of a teenage girl, Cage suddenly learns that a three-way gang war is under way for control of the turf',
            },
            {
              id: 40,
              title: 'Ever-expanding their ranks, the Children of the Atom combat the evils threatening both mutants and humans Ñ like the Brotherhood',
            },
          ],
        },
      })
    );
  }),

  rest.get(`${baseURL}characters`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          results: [
            {
              id: 1011334,
              name: '3-D Man',
            },
            {
              id: 1009174,
              name: 'Beak',
            },
          ],
        },
      })
    );
  }),
];
