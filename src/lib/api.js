import { API } from '../constants/api';
import axios from 'axios';

export function createMusic(title) {
  return axios.post(`${API.URL}/mixEditor`, { title });
}

export function getMusicData(id) {
  return axios.get(`${API.URL}/mixEditor/${id}`);
}

export function getInstrumentSoundData(tool) {
  return axios.get(`${API.URL}/mixEditor/tool/${tool}`);
}
