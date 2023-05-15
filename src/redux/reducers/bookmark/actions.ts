import { bookmark, BookmarksActions } from './reducer';

export const addBookmark = (payload: bookmark) => {
  return {
    type: BookmarksActions.ADD,
    payload
  };
};
export const deleteBookmark = (payload: bookmark) => {
  return {
    type: BookmarksActions.DELETE,
    payload,
  };
};
export const deleteAllBookmarks = () => {
  return {
    type: BookmarksActions.DELETE_ALL,
  };
};