import { hiddenItemReducer, HiddenItemsActions } from './reducer';

const list = [
  { id: 1010699, type: 'characters' },
  { id: 82970, type: 'comics' },
  { id: 1332, type: 'comics' },
  { id: 1308, type: 'comics' },
];

describe('hidden items reducer', () => {
  test('HiddenItem reducer should add a hidden item', () => {
    const action = {
      type: HiddenItemsActions.ADD,
      payload: {
        id: 1009144,
        type: 'characters',
      },
    };

    const addHiddenItem = hiddenItemReducer(undefined, action);

    expect(addHiddenItem.list).toHaveLength(1);
    expect(addHiddenItem.list[0]).toEqual(action.payload);
  });

  

  test('HiddenItem reducer should  delete all hidden items in the list', () => {
    const action = {
      type: HiddenItemsActions.DELETE_ALL,
    };

    const deleteBookmark = hiddenItemReducer({ list: list }, action);

    expect(deleteBookmark.list).toHaveLength(0);
    expect(deleteBookmark.list).toEqual([]);
  });
});
