import { API } from '../constants/api';

export async function addMusic(title) {
  try {
    const response = await fetch(`${API.URL}/mixEditor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(title),
    });

    const { result, data, message } = await response.json();

    if (result === 'err') {
      throw new Error(message);
    }

    const musicId = await data._id;

    return musicId;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getMusicData(id) {
  try {
    const response = await fetch(`${API.URL}/mixEditor/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { result, data, message } = await response.json();

    if (result === 'err') {
      throw new Error(message);
    }

    return data;
  } catch (err) {
    throw new Error(err);
  }
}
