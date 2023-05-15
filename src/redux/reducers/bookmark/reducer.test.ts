import { bookmarkReducer, BookmarksActions } from './reducer';

const list = [
  {
    img: 'http://i.annihil.us/u/prod/marvel/i/mg/6/20/52602f21f29ec',
    title: 'A.I.M.',
    id: 1009144,
    page: 'characters',
  },
  {
    img: 'http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16',
    title: 'A-Bomb (HAS)',
    id: 1017100,
    page: 'characters',
  },
  {
    img: 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available',
    title: 'Adam Destine',
    id: 1011266,
    page: 'characters',
  },
  {
    img: 'http://i.annihil.us/u/prod/marvel/i/mg/c/80/5e3d7536c8ada',
    title: 'Marvel Previews (2017)',
    id: 82970,
    page: 'comics',
  },
];

describe('bookmark reducer', () => {
  test('bookmarkReducer should add a bookmark', () => {
    const action = {
      type: BookmarksActions.ADD,
      payload: {
        img: 'http://i.annihil.us/u/prod/marvel/i/mg/6/20/52602f21f29ec',
        title: 'A.I.M.',
        id: 1009144,
        page: 'characters',
      },
    };

    const addBookmark = bookmarkReducer(undefined, action);

    expect(addBookmark.list).toHaveLength(1);
    expect(addBookmark.list[0]).toEqual(action.payload);
  });

  test('bookmarkReducer should delete a bookmark', () => {
    const action = {
      type: BookmarksActions.DELETE,
      payload: {
        img: 'http://i.annihil.us/u/prod/marvel/i/mg/6/20/52602f21f29ec',
        title: 'A.I.M.',
        id: 1009144,
        page: 'characters',
      },
    };

    const deleteBookmark = bookmarkReducer({ list: list }, action);

    expect(deleteBookmark.list).toHaveLength(list.length - 1);
    expect(deleteBookmark.list).toEqual(list.slice(1));
  });

  test('bookmarkReducer should not delete a bookmark that is not in the list', () => {
    const action = {
      type: BookmarksActions.DELETE,
      payload: {
        img: 'http://i.annihil.us/u/prod/marvel/i/mg/9/50/4ce18691cbf04',
        title: 'Abomination (Emil Blonsky)',
        id: 1009146,
        page: 'characters',
      },
    };

    const deleteBookmark = bookmarkReducer({ list: list }, action);

    expect(deleteBookmark.list).toHaveLength(list.length);
    expect(deleteBookmark.list).toEqual(list);
  });

  test('bookmarkReducer should  delete all bookmarks in the list', () => {
    const action = {
      type: BookmarksActions.DELETE_ALL,
    };

    const deleteBookmark = bookmarkReducer({ list: list }, action);

    expect(deleteBookmark.list).toHaveLength(0);
    expect(deleteBookmark.list).toEqual([]);
  });
});
