import { combineReducers } from 'redux';
import { bookmarkReducer, BookmarkState} from './bookmark/reducer';
import { hiddenItemReducer, HiddenItemState } from './hiddenItems/reducer';

interface IRoot{
    bookMarks: BookmarkState;
    hiddenItems: HiddenItemState;
}

const rootReducer = combineReducers<IRoot>({
    bookMarks: bookmarkReducer,
    hiddenItems: hiddenItemReducer
});

export default rootReducer;