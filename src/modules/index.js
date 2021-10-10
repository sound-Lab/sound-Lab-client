import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import mixEditor, { mixEditorSaga } from './mixEditor';
import loading from './loading';
import instrument, { instrumentSaga } from './instrument';

const rootReducer = combineReducers({
  mixEditor,
  loading,
  instrument,
});

export function* root() {
  yield all([mixEditorSaga(), instrumentSaga()]);
}

export default rootReducer;
