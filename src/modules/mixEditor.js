import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as api from '../lib/api';
import createRequest from '../lib/createRequest';

const POST_CREATE_MUSIC = 'create/POST_CREATE_MUSIC';
const POST_CREATE_MUSIC_SUCCESS = 'create/POST_CREATE_MUSIC_SUCCESS';

const GET_MUSIC_DATA = 'mixEditor/GET_MUSIC_DATA';
const GET_MUSIC_DATA_SUCCESS = 'mixEditor/GET_MUSIC_DATA_SUCCESS';

const SET_TRACK = 'mixEditor/SET_TRACK';
const SET_CURRENT_TRACK = 'mixEditor/SET_CURRENT_TRACK';

const UPDATE_STEP = 'mixEditor/UPDATE_STEP';
const UPDATE_BPM = 'mixEditor/UPDATE_BPM';
const UPDATE_PLAY = 'mixEditor/UPDATE_PLAY';

export const postMusic = createAction(POST_CREATE_MUSIC, (title) => title);
export const getMusicData = createAction(GET_MUSIC_DATA);

export const setTrack = createAction(SET_TRACK, (sound) => sound);
export const setCurrentTrack = createAction(
  SET_CURRENT_TRACK,
  (index) => index,
);

export const updateStep = createAction(UPDATE_STEP, (track) => track);
export const updateBpm = createAction(UPDATE_BPM, (bpm) => bpm);
export const updatePlay = createAction(UPDATE_PLAY);

const postMusicReq = createRequest(POST_CREATE_MUSIC, api.createMusic);
const getMusicReq = createRequest(GET_MUSIC_DATA, api.getMusicData);

export function* watchMixEditor() {
  yield takeLatest(POST_CREATE_MUSIC, postMusicReq);
  yield takeLatest(GET_MUSIC_DATA, getMusicReq);
}

const initialState = {
  id: '',
  title: '',
  bpm: 120,
  isPlaying: false,
  tracks: [],
  currentTrack: null,
};

const mixEditor = handleActions(
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
    [SET_TRACK]: (state, action) => ({
      ...state,
      tracks: state.tracks.concat(action.payload),
    }),
    [SET_CURRENT_TRACK]: (state, action) => ({
      ...state,
      currentTrack: (state.currentTrack = action.payload),
    }),
    [UPDATE_STEP]: (state, { payload: newStep, currentIndex }) => ({
      ...state,
      tracks: state.tracks.map((track, index) =>
        index === currentIndex ? (track.steps.stepsMap = newStep) : track,
      ),
    }),
    [UPDATE_BPM]: (state, action) => ({
      ...state,
      bpm: (state.bpm = action.payload),
    }),
    [UPDATE_PLAY]: (state, action) => ({
      ...state,
      isPlaying: (state.isPlaying = !state.isPlaying),
    }),
  },
  initialState,
);

export default mixEditor;
