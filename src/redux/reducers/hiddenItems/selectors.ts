import { HiddenItemState } from './reducer';

export const getIfExist = (id: number, state: HiddenItemState) => {
  return state.list.some((item) => item.id === id);
};

export const getCharacters = (state: HiddenItemState) => {
  return state.list.filter((item) => item.type === 'characters');
};
export const getComics= (state: HiddenItemState) => {
  return state.list.filter((item) => item.type === 'comics');
};