import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as api from '../lib/api';
import createRequest from '../lib/createRequest';

const GET_INSTRUMENT_DATA = 'mixEditor/GET_INSTRUMENT_DATA';
const GET_INSTRUMENT_DATA_SUCCESS = 'mixEditor/GET_INSTRUMENT_DATA_SUCCESS';

export const getInstrumentData = createAction(GET_INSTRUMENT_DATA);

const getInstrumentReq = createRequest(
  GET_INSTRUMENT_DATA,
  api.getInstrumentSoundData,
);

export function* watchInstrument() {
  yield takeLatest(GET_INSTRUMENT_DATA, getInstrumentReq);
}

const initialState = {
  instrument: [],
};

const instrument = handleActions(
  {
    [GET_INSTRUMENT_DATA_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      instrument: Object.assign(state.instrument, data.data),
    }),
  },
  initialState,
);

export default instrument;
