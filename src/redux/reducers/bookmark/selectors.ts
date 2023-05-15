import { BookmarkState } from './reducer';

export const getIfExist = (id: number, state: BookmarkState) => {
    return state.list.some((item) => item.id === id); 
};