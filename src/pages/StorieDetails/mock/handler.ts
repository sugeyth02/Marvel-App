import { rest } from 'msw';

const baseURL = 'https://gateway.marvel.com/v1/public/';

export const handlers = [
  rest.get(`${baseURL}stories/28`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          results: [
            {
              id: 11,
              title: 'Interior #11',
              type: 'story',
              modified: '1969-12-31T19:00:00-0500',
              comics: {
                items: [{ name: 'Captain Britain Vol. I (Trade Paperback)' }],
              },
            },
          ],
        },
      })
    );
  }),
];
