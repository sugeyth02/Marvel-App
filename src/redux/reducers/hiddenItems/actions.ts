import { HiddenItemsActions } from './reducer';

export const addHiddenItem = (payload: {id:number, type:string}) => {
  return {
    type: HiddenItemsActions.ADD,
    payload,
  };
};
export const deleteAllHidden = () => {
  return {
    type: HiddenItemsActions.DELETE_ALL,
  };
};
