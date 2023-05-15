const initialState:{list:HiddenState[]} = { list: [] };


export type HiddenItemState = typeof initialState;

export const enum HiddenItemsActions {
  ADD = 'hiddenItems/add',
  DELETE_ALL = 'hiddenItems/delete-all',
}
export interface HiddenState {
  id: number;
  type: String;
}
interface Action {
  type: HiddenItemsActions.ADD |  HiddenItemsActions.DELETE_ALL;
  payload?: HiddenState;
}
export const hiddenItemReducer = (
  state: HiddenItemState = initialState,
  action: Action
) => {
  switch (action.type) {
    case HiddenItemsActions.ADD: {
      const current: HiddenState[] = [...state.list];
      if (action.payload) {
          current.push(action.payload);
      }
       return {
         list: current,
       };
    }
    case HiddenItemsActions.DELETE_ALL: {
     return {
       list: [],
     }; 
    }
    default:
      return state;
  }
};
