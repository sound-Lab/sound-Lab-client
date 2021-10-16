import axios from 'axios';
import { API } from '../constants/api';

export function createMusic(title) {
  return axios.post(`${API.URL}/mixEditor`, { title });
}

export function getMusicData(id) {
  return axios.get(`${API.URL}/mixEditor/music/${id}`);
}

export async function getInstrumentSoundData(tool) {
  return axios.get(`${API.URL}/mixEditor/instrument/${tool}`);
}

export async function putMusicData(data) {
  const { musicId, tracks } = data;
  return axios.put(`${API.URL}/mixEditor/music/${musicId}`, { tracks });
}
