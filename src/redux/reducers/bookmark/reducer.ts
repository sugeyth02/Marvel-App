export const enum BookmarksActions {
  ADD = 'bookmark/add',
  DELETE = 'bookmark/delete',
  DELETE_ALL = 'bookmark/delete-all',
}

export interface bookmark {
  img: string;
  title: string;
  id: number;
  page: string;
}
interface Action {
  type:
    | BookmarksActions.ADD
    | BookmarksActions.DELETE
    | BookmarksActions.DELETE_ALL;
  payload?: bookmark;
}
const initialState: { list: bookmark[] } = { list: [] };

export type BookmarkState = typeof initialState;

export const bookmarkReducer = (
  state: BookmarkState = initialState,
  action: Action
): BookmarkState => {
  switch (action.type) {
    case BookmarksActions.ADD: {
      const exist: bookmark[] = state.list.filter(
        (e: bookmark) => e.id !== action.payload?.id
      );
      if (action.payload) {
        exist.push(action.payload);
      }
      return {
        list: exist,
      };
    }
    case BookmarksActions.DELETE: {
      const exist: bookmark[] = state.list.filter(
        (e: bookmark) => e.id !== action.payload?.id
      );
      return {
        list: exist,
      };
    }
    case BookmarksActions.DELETE_ALL: {
      return {
        list: [],
      };
    }
    default:
      return state;
  }
};
