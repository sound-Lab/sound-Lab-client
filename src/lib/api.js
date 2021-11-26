import axios from 'axios';
import { API } from '../constants/api';

import { initialTracks } from './midipath';

export function createMusic(title) {
  return axios.post(`${API.URL}/mixEditor`, { title, initialTracks });
}

export function getMusicData(id) {
  return axios.get(`${API.URL}/mixEditor/music/${id}`);
}

export async function getInstrumentSoundData() {
  return axios.get(`${API.URL}/mixEditor/instrument`);
}

export async function putMusicData(data) {
  const { musicId, tracks, title } = data;
  return axios.put(`${API.URL}/mixEditor/music/${musicId}`, {
    tracks,
    title,
  });
}

export async function deleteMusicData(id) {
  return axios.delete(`${API.URL}/mixEditor/music/${id}`);
}
