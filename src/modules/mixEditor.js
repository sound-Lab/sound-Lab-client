import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as api from '../lib/api';
import createRequest from '../lib/createRequest';

const POST_CREATE_MUSIC = 'create/POST_CREATE_MUSIC';
const POST_CREATE_MUSIC_SUCCESS = 'create/POST_CREATE_MUSIC_SUCCESS';

const GET_MUSIC_DATA = 'mixEditor/GET_MUSIC_DATA';
const GET_MUSIC_DATA_SUCCESS = 'mixEditor/GET_MUSIC_DATA_SUCCESS';

const SET_INSTRUMENT = 'mixEditor/SET_INSTRUMENT';

export const postMusic = createAction(POST_CREATE_MUSIC, (title) => title);
export const getMusicData = createAction(GET_MUSIC_DATA);
export const setInstrument = createAction(SET_INSTRUMENT, (tool) => tool);

const postMusicReq = createRequest(POST_CREATE_MUSIC, api.createMusic);
const getMusicReq = createRequest(POST_CREATE_MUSIC, api.getMusicData);

export function* mixEditor() {
  yield takeLatest(POST_CREATE_MUSIC, postMusicReq);
  yield takeLatest(GET_MUSIC_DATA, getMusicReq);
}

const initialState = {
  id: '',
  title: '',
  bpm: 120,
  isPlaying: false,
  tracks: [],
  currentInstrument: null,
};

const step = [Array(32).fill(0)];

const mixEditorReducer = handleActions(
  {
    [POST_CREATE_MUSIC_SUCCESS]: (state, { payload: result }) => ({
      ...state,
      id: result.data._id,
      title: result.data.title,
    }),
    [GET_MUSIC_DATA_SUCCESS]: (state, { payload: result }) => ({
      ...state,
      id: result.data._id,
      title: result.data.title,
    }),
    [SET_INSTRUMENT]: (state, action) => ({
      ...state,
      tracks: state.tracks.concat({ title: action.payload, steps: step }),
      currentInstrument: action.payload,
    }),
  },
  initialState,
);

export default mixEditorReducer;
