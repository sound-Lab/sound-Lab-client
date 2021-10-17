import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequest from '../lib/createRequest';
import * as api from '../lib/api';

const POST_CREATE_MUSIC = 'create/POST_CREATE_MUSIC';
const POST_CREATE_MUSIC_SUCCESS = 'create/POST_CREATE_MUSIC_SUCCESS';

const GET_MUSIC_DATA = 'mixEditor/GET_MUSIC_DATA';
const GET_MUSIC_DATA_SUCCESS = 'mixEditor/GET_MUSIC_DATA_SUCCESS';

const PUT_MUSIC_DATA = 'mixEditor/PUT_MUSIC_DATA';

const SET_TRACK = 'mixEditor/SET_TRACK';
const SET_TRACK_SAMPLER = 'mixEditor/SET_TRACK_SAMPLER';
const SET_CURRENT_TRACK = 'mixEditor/SET_CURRENT_TRACK';
const DELETE_CURRENT_TRACK = 'mixEditor/DELETE_CURRENT_TRACK';

const UPDATE_STEP = 'mixEditor/UPDATE_STEP';
const UPDATE_BPM = 'mixEditor/UPDATE_BPM';
const UPDATE_PLAY = 'mixEditor/UPDATE_PLAY';
const UPDATE_REPEAT = 'mixEditor/UPDATE_REPEAT';
const UPDATE_MIDI = 'mixEditor/UPDATE_MIDI';
const UPDATE_TRACK_MUTE = 'mixEditor/UPDATE_TRACK_MUTE';
const UPDATE_TRACK_SOLO = 'mixEditor/UPDATE_TRACK_SOLO';
const UPDATE_TITLE = 'mixEditor/UPDATE_TITLE';

export const postMusic = createAction(POST_CREATE_MUSIC, (title) => title);
export const getMusicData = createAction(GET_MUSIC_DATA);
export const putMusicData = createAction(PUT_MUSIC_DATA, (data) => data);

export const setTrack = createAction(SET_TRACK, (sound) => sound);
export const setTrackSampler = createAction(
  SET_TRACK_SAMPLER,
  (sampler) => sampler,
);
export const setCurrentTrack = createAction(
  SET_CURRENT_TRACK,
  (index) => index,
);
export const deleteCurrentTrack = createAction(
  DELETE_CURRENT_TRACK,
  (index) => index,
);

export const updateStep = createAction(UPDATE_STEP, (track) => track);
export const updateBpm = createAction(UPDATE_BPM, (bpm) => bpm);
export const updatePlay = createAction(UPDATE_PLAY);
export const updateRepeat = createAction(UPDATE_REPEAT, (repeat) => repeat);
export const updateMidi = createAction(UPDATE_MIDI, (track) => track);
export const updateTrackMute = createAction(
  UPDATE_TRACK_MUTE,
  (trackIndex) => trackIndex,
);
export const updateTrackSolo = createAction(
  UPDATE_TRACK_SOLO,
  (trackIndex) => trackIndex,
);
export const updateTitle = createAction(UPDATE_TITLE, (newTitle) => newTitle);

const postMusicReq = createRequest(POST_CREATE_MUSIC, api.createMusic);
const getMusicReq = createRequest(GET_MUSIC_DATA, api.getMusicData);
const putMusicReq = createRequest(PUT_MUSIC_DATA, api.putMusicData);

export function* watchMixEditor() {
  yield takeLatest(POST_CREATE_MUSIC, postMusicReq);
  yield takeLatest(GET_MUSIC_DATA, getMusicReq);
  yield takeLatest(PUT_MUSIC_DATA, putMusicReq);
}

const initialState = {
  id: '',
  title: '',
  bpm: 120,
  isPlaying: false,
  tracks: [],
  currentTrack: null,
  initialStep: Array(16).fill(0),
  repeat: 32,
  sampler: {},
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
      tracks: result.data.tracks,
    }),
    [SET_TRACK]: (state, action) => ({
      ...state,
      tracks: state.tracks.concat(action.payload.track),
    }),
    [SET_TRACK_SAMPLER]: (state, action) => ({
      ...state,
      sampler: Object.assign(state.sampler, ...action.payload.samplerList),
    }),
    [SET_CURRENT_TRACK]: (state, action) => ({
      ...state,
      currentTrack: (state.currentTrack = action.payload),
    }),
    [DELETE_CURRENT_TRACK]: (state, action) => ({
      ...state,
      tracks: state.tracks
        .slice(0, action.payload)
        .concat(state.tracks.slice(action.payload + 1)),
    }),
    [UPDATE_STEP]: (state, { payload: newTrack }) => ({
      ...state,
      tracks: state.tracks.map((track, index) =>
        index === newTrack.currentTrack
          ? {
              ...track,
              stepsMap: (track.stepsMap = newTrack.newTrack.stepsMap),
            }
          : track,
      ),
    }),
    [UPDATE_BPM]: (state, action) => ({
      ...state,
      bpm: (state.bpm = action.payload),
    }),
    [UPDATE_PLAY]: (state) => ({
      ...state,
      isPlaying: (state.isPlaying = !state.isPlaying),
    }),
    [UPDATE_REPEAT]: (state, action) => ({
      ...state,
      repeat: (state.repeat = action.payload),
    }),
    [UPDATE_TRACK_MUTE]: (state, action) => ({
      ...state,
      tracks: state.tracks.map((track, index) =>
        index === action.payload
          ? {
              ...track,
              mute: track.mute ? (track.mute = false) : (track.mute = true),
            }
          : track,
      ),
    }),
    [UPDATE_TRACK_SOLO]: (state, action) => ({
      ...state,
      tracks: state.tracks.map((track, index) =>
        index === action.payload
          ? { ...track, mute: (track.mute = false) }
          : { ...track, mute: (track.mute = true) },
      ),
    }),
    [UPDATE_TITLE]: (state, action) => ({
      ...state,
      title: (state.title = action.payload),
    }),
  },
  initialState,
);

export default mixEditor;
