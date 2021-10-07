import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import mixEditorReducer, { mixEditor } from './mixEditor';
import loading from './loading';

const rootReducer = combineReducers({ mixEditorReducer, loading });

export function* root() {
  yield all([mixEditor()]);
}

export default rootReducer;
