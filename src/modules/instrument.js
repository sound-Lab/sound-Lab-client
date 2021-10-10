import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as api from '../lib/api';
import createRequest from '../lib/createRequest';

const GET_INSTRUMENT_DATA = 'mixEditor/GET_INSTRUMENT_DATA';
const GET_INSTRUMENT_DATA_SUCCESS = 'mixEditor/GET_INSTRUMENT_DATA_SUCCESS';

const LOAD_SOUND_DATA = 'mixEditor/LOAD_SOUND_DATA';

export const getInstrumentData = createAction(
  GET_INSTRUMENT_DATA,
  (tool) => tool,
);

export const loadSoundData = createAction(LOAD_SOUND_DATA, (sound) => sound);

const getInstrumentReq = createRequest(
  GET_INSTRUMENT_DATA,
  api.getInstrumentSoundData,
);

export function* instrumentSaga() {
  yield takeLatest(GET_INSTRUMENT_DATA, getInstrumentReq);
}

const initialState = {
  instrument: {},
};

const instrument = handleActions(
  {
    [GET_INSTRUMENT_DATA_SUCCESS]: (state, action) => ({
      ...state,
      instrument: Object.assign(state.instrument, action.payload),
    }),
    [LOAD_SOUND_DATA]: (state, action) => ({
      ...state,
      instrument: Object.assign(state.instrument, action.payload),
    }),
  },
  initialState,
);

export default instrument;
