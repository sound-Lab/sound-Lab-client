import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import mixEditor, { watchMixEditor } from './mixEditor';
import loading from './loading';
import instrument, { watchInstrument } from './instrument';

const rootReducer = combineReducers({
  mixEditor,
  loading,
  instrument,
});

export function* root() {
  yield all([watchMixEditor(), watchInstrument()]);
}

export default rootReducer;
